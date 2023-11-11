import { mkdir, readdir, readFile, unlink, writeFile } from "fs/promises";
import { createHash } from "crypto";
import protobufjs from "protobufjs";

/** @type {import("./src/data-proto")} */
const pb = convertToStaticInterface(await protobufjs.load("../data/data.proto"));

const WORDS_MAX_CHUNK_SIZE = 1_000_000; // 1MB
const EXAMPLE_MAX_CHUNK_SIZE = 1_000_000; // 1MB

// Read all data.
const dataBuffer = await readFile("../data/kodata.binpb");
const data = pb.AllData.decode(dataBuffer);
const sortedWords = [...data.words].sort((a, b) => b.score - a.score);

// Create index, dumping chunks in the process.
try {
  await mkdir("dist/data");
} catch {
  // Remove previous files.
  await Promise.all((await readdir("dist/data")).map((name) => unlink(`dist/data/${name}`)));
}

/** @type {string[]} */
const outputNames = [];

const [words, examples] = await Promise.all([
  createChunks({
    Chunk: pb.WordChunk,
    maxChunkSize: WORDS_MAX_CHUNK_SIZE,
    inputs: sortedWords,
    toEntry(/** @type {pb.Word} */ word) {
      const definitions = definitionsOf(word);

      return new pb.Index.WordEntry({
        text: word.text,
        wordIds: definitions.map((def) => def.wordId),
        origins: definitions.map((def) => def.origin ?? ""),
      });
    },
    addToChunk(chunk, value) {
      chunk.words.push(value);
    },
    createChunkEntry(chunkId, entries) {
      return new pb.Index.WordChunkEntry({
        chunk: chunkId,
        entries,
      });
    },
  }),
  createChunks({
    Chunk: pb.ExampleChunk,
    maxChunkSize: EXAMPLE_MAX_CHUNK_SIZE,
    inputs: data.examples,
    toEntry(example) {
      return new pb.Index.ExampleEntry({});
    },
    addToChunk(chunk, value) {
      chunk.examples.push(value);
    },
    createChunkEntry(chunkId, entries) {
      return new pb.Index.ExampleChunkEntry({
        chunk: chunkId,
        entries,
      });
    },
  }),
]);

// Write indices to output file.
const indexFiles = await Promise.all(
  Object.entries({
    index: new pb.Index({
      pos: data.pos,
      words,
      examples,
    }),
    translations: new pb.TranslationIndex({
      entries: sortedWords
        .flatMap((word) => definitionsOf(word))
        .map(
          (def) =>
            new pb.TranslationIndex.Entry({
              translations: dedup(
                def.meanings.map((meaning) => meaning.translation).filter((tr) => tr.length > 0),
              ),
              wordId: def.wordId,
            }),
        )
        .filter((entry) => entry.translations.length > 0),
    }),
  }).map(async ([name, index]) => {
    const indexBuffer = index.constructor.encode(index).finish();
    const indexName = `${name}-${hashOf(indexBuffer)}`;

    await writeFile(`dist/data/${indexName}.binpb`, indexBuffer);

    outputNames.push(indexName);

    return { name, indexName };
  }),
);

// Write static data to output file.
const uiWords = {
  // UI:
  번역: "noun",
  정의: "noun",
  불명: "noun",
  사용: "noun",
  빈도: "noun",
  위: "noun",
  한자: "noun",
  로마자: "noun",
  유의어: "noun",
  반의어: "noun",
  파생어: "noun",
  참고: "noun",

  // POS:
  //   [...new Set([...DB.dictionary.values()].flat().map(x => x.posKo))].sort().join("\n")
  감탄사: "noun",
  관형사: "noun",
  대명사: "noun",
  동사: "noun",
  명사: "noun",
  "보조 동사": "phrase",
  "보조 형용사": "phrase",
  부사: "noun",
  수사: "noun",
  약어: "noun",
  어미: "noun",
  "의존 명사": "phrase",
  접사: "noun",
  조사: "noun",
  형용사: "noun",
};
const wordByText = Object.fromEntries(data.words.map((word) => [word.text, word]));

await writeFile(
  `src/generated.ts`,
  `
/**
 * Mapping from a word shown in the UI to its ID.
 */
export const uiWordIds = Object.freeze({
  ${Object.entries(uiWords)
    .map(([k, v]) => `"${k}": ${wordByText[k][v].wordId},`)
    .join("\n  ")}
});

/**
 * Mapping from an index file to its unique file name (without its extension).
 */
export const indexFiles = Object.freeze({
  ${indexFiles.map(({ name, indexName }) => `"${name}": "${indexName}",`).join("\n  ")}
});

/**
 * List of generated files required by the database.
 */
export const protobufFileNames = Object.freeze([
  ${outputNames.map((name) => `"${name}",`).join("\n  ")}
]);
`,
);

/**
 * @param {{ nested: Record<string, import("protobufjs").Message> }} namespace
 */
function convertToStaticInterface(namespace) {
  const { nested = {} } = namespace;

  return Object.fromEntries(
    Object.entries(nested).map(([k, v]) => [k, Object.assign(v.ctor, convertToStaticInterface(v))]),
  );
}

/**
 * @param {pb.Word} word
 *
 * @returns {pb.Word.Defined[]}
 */
function definitionsOf(word) {
  return Object.values(word).filter((value) => value instanceof pb.Word.Defined);
}

/**
 * @param {Uint8Array} buffer
 *
 * @returns {string}
 */
function hashOf(buffer) {
  return createHash("sha256").update(buffer).digest("hex").slice(0, 12);
}

/**
 * @template {pb.WordChunk | pb.ExampleChunk} C
 * @template {pb.Word | pb.Example} T
 * @template {pb.Index.WordEntry | pb.Index.ExampleEntry} E
 *
 * @param {Readonly<{
 *  Chunk: Constructor<C>,
 *  maxChunkSize: number,
 *  inputs: Iterable<T>,
 *  toEntry: (input: T) => E,
 *  addToChunk: (chunk: C, value: T) => void,
 *  createChunkEntry: (chunkId: string, entries: E[]) => C,
 * }>} args
 *
 * @returns {Promise<C[]>}
 */
async function createChunks(args) {
  const CHUNK_BASE_SIZE = 8; // Give some room for size.
  const { Chunk, maxChunkSize, inputs, toEntry, addToChunk, createChunkEntry } = args;

  /** @type {C[]} */
  const chunks = [];

  /** @type {E[]} */
  let currentChunkEntries = [];
  let currentChunkSize = CHUNK_BASE_SIZE;
  let currentChunk = new Chunk();

  const dumpCurrentChunk = async () => {
    const chunkBuffer = Chunk.encode(currentChunk).finish();
    const chunkId = hashOf(chunkBuffer);

    if (outputNames.includes(chunkId)) {
      throw new Error(`output name collision detected: ${chunkId}`);
    }

    outputNames.push(chunkId);

    await writeFile(`dist/data/${chunkId}.binpb`, chunkBuffer);

    chunks.push(createChunkEntry(chunkId, currentChunkEntries));

    currentChunkEntries = [];
    currentChunkSize = CHUNK_BASE_SIZE;
    currentChunk = new Chunk();
  };

  for (const input of inputs) {
    const inputSize = input.constructor.encode(input).finish().byteLength;

    if ((currentChunkSize += inputSize) > maxChunkSize) {
      await dumpCurrentChunk();
    }

    addToChunk(currentChunk, input);
    currentChunkEntries.push(toEntry(input));
  }

  await dumpCurrentChunk();

  return chunks;
}

/**
 * @template T
 *
 * @param {Iterable<T>} values
 */
function dedup(values) {
  /** @type {T[]} */
  const dedup = [];
  const set = new Set();

  for (const value of values) {
    const sizeBefore = set.size;
    const sizeAfter = set.add(value).size;

    if (sizeBefore !== sizeAfter) {
      dedup.push(value);
    }
  }

  return dedup;
}
