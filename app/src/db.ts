import { ExampleChunk, Index, TranslationIndex, WordChunk } from "./data-proto";
import { indexFiles } from "./generated";
import { definitionsOf } from "./utils/index";
import { syllablesToJamo } from "./utils/korean";

export type Word = import("./data-proto.d.ts").Word;
export type DefinedWord = import("./data-proto.d.ts").Word.Defined;
export type Meaning = import("./data-proto.d.ts").Word.Meaning;
export type TokenizedText = import("./data-proto.d.ts").TokenizedText;
export type POS = keyof {
  [P in keyof Word as Word[P] extends import("./data-proto.d.ts").Word.IDefined | undefined | null ? P : never]: 0;
};

interface SeenCounter {
  [word: string]: number | undefined;
}

export interface HanWord {
  readonly han: string;
  readonly hangul: string;
  readonly id: number;
}

const seenCountKey = (word: string) => `word-${word[0]}`;

/**
 * The database of Korean vocabulary.
 */
export class Db {
  // Fields below are populated on initialization.

  /**
   * Map from POS ID to POS data.
   */
  private readonly posIdToPos: ReadonlyMap<string, import("./data-proto.d.ts").PartOfSpeech>;

  /**
   * Index from a Korean word to its chunk.
   *
   * A string key corresponds to the text of the word. A number key corresponds to its ID.
   */
  private readonly wordToChunk: ReadonlyMap<string | number, string>;

  /**
   * Map from the first two jamo of a Korean word to the list of words that start with those jamo.
   *
   * Keys are `jamo.slice(0, 2)`, values are `${jamo.slice(2)}/${word}`.
   */
  private readonly jamoPrefixes: ReadonlyMap<string, readonly string[]>;

  /**
   * Map from a single Han character to the list of words that contain that character.
   */
  private readonly hanMap: ReadonlyMap<string, readonly [words: readonly HanWord[], readings: readonly string[]]>;

  // Fields below are lazily populated.

  /**
   * Loaded chunks mapped by ID. If not yet loaded, no entry exists. If
   * loading, the value is a promise. If loaded, the value is `null`.
   */
  private readonly loadedChunks = new Map<string, Promise<void> | null>();

  /**
   * Map from word text to word IDs (if not yet loaded) or {@link Word} (if loaded).
   */
  private readonly dictionary = new Map<string, Word | readonly number[]>();

  /**
   * Map from word ID to word text (if not yet loaded) or {@link DefinedWord} (if loaded).
   */
  private readonly idToWord = new Map<number, DefinedWord | string>();

  /**
   * Map lazily populated by {@link englishPrefixes()}.
   */
  private lazyEnglishPrefixes: Promise<Map<string, readonly string[]>> | undefined;

  private constructor(index: ReturnType<(typeof Index)["decode"]>) {
    (window as Record<string, any>)["DB"] = this;

    // Populate POS map.
    const posIdToPos = this.posIdToPos = new Map<string, import("./data-proto.d.ts").PartOfSpeech>();

    for (const pos of index.pos) {
      posIdToPos.set(pos.id!, pos as import("./data-proto.d.ts").PartOfSpeech);
    }

    // Populate word indices.
    const wordToChunk = this.wordToChunk = new Map<string | number, string>();
    const jamoPrefixes = this.jamoPrefixes = new Map<string, string[]>();
    const hanMap = this.hanMap = new Map<string, [words: HanWord[], readings: string[]]>();

    for (const { chunk, entries } of index.words)
    for (const word of entries!) {
      const wordText = word.text!;

      // Add to index.
      for (const wordId of word.wordIds!) {
        wordToChunk.set(wordId, chunk!);
        this.idToWord.set(wordId, wordText);
      }
      wordToChunk.set(wordText, chunk!);
      this.dictionary.set(wordText, [...word.wordIds!]);

      // Add to prefixes list.
      let jamo: string | undefined = undefined;

      try {
        jamo = syllablesToJamo(wordText);
      } catch {
        // Not fully jamo, don't add to index.
      }

      if (jamo !== undefined) {
        const key = jamo.slice(0, 2);
        const lookupString = `${jamo.slice(2)}/${wordText}`;
        const list = jamoPrefixes.get(key);

        if (list === undefined) {
          jamoPrefixes.set(key, [lookupString]);
        } else if (!list.includes(lookupString)) {
          list.push(lookupString);
        }
      }

      // Add to Han map.
      for (let i = 0; i < word.wordIds!.length; i++) {
        const wordId = word.wordIds![i];
        const origin = word.origins![i];

        if (origin.length === 0) {
          continue;
        }

        let characterIndex = 0;
        const hanWord: HanWord = { han: origin, hangul: word.text!, id: wordId };

        for (const han of origin) {
          let wordsAndReadings = hanMap.get(han);

          if (wordsAndReadings === undefined) {
            hanMap.set(han, wordsAndReadings = [[hanWord], []]);
          } else {
            wordsAndReadings[0].push(hanWord);
          }

          // Add Hangul reading, if any.
          if (origin.length === wordText.length) {
            const hangulReading = wordText[characterIndex];

            if (!wordsAndReadings[1].includes(hangulReading)) {
              wordsAndReadings[1].push(hangulReading);
            }
          }

          characterIndex++;
        }
      }
    }
  }

  private async loadChunk(id: string, parseChunk: (data: Uint8Array) => void): Promise<void> {
    let loadingPromise = this.loadedChunks.get(id);

    if (loadingPromise === undefined) {
      loadingPromise = (async () => {
        const resp = await fetch(`/data/${id}.binpb`);
        const data = await resp.arrayBuffer();

        this.loadedChunks.set(id, null);  // Mark that promise completed.

        parseChunk(new Uint8Array(data));
      })();

      this.loadedChunks.set(id, loadingPromise);
    }

    await loadingPromise;
  }

  private async loadExampleChunk(id: string): Promise<void> {
    await this.loadChunk(id, (data) => {
      const chunk = ExampleChunk.decode(data);

      // TODO
    });
  }

  private async loadWordChunk(id: string): Promise<void> {
    await this.loadChunk(id, (data) => {
      const chunk = WordChunk.decode(data);

      for (const word of chunk.words) {
        const wordText = word.text!;

        this.dictionary.set(wordText, word as Word);

        for (const definition of definitionsOf(word as Word)) {
          this.idToWord.set(definition.wordId, definition as DefinedWord);
        }
      }
    });
  }

  /**
   * Returns the map from the first three English letters of a word to the list of words that start with those.
   *
   * Keys are `enWord.slice(0, 3)`, values are `${enWord.slice(3)}/${koWord}/${koWordId}`.
   */
  private async englishPrefixes(): Promise<Map<string, readonly string[]>> {
    if (this.lazyEnglishPrefixes === undefined) {
      this.lazyEnglishPrefixes = (async () => {
        const index = await fetchProtobuf(indexFiles.translations, TranslationIndex);
        const map = new Map<string, string[]>();

        for (const entry of index.entries) {
          const wordId = entry.wordId!;
          const translations = entry.translations ?? [];

          for (const translation of translations) {
            const key = translation.slice(0, 3);
            const value = `${translation.slice(3)}/${this.wordTextById(wordId)}/${wordId}`;
            const existing = map.get(key);

            if (existing === undefined) {
              map.set(key, [value]);
            } else {
              existing.push(value);
            }
          }
        }

        return map;
      })();
    }

    return await this.lazyEnglishPrefixes;
  }

  /**
   * Returns the {@link Word} for the given word text, loading it if necessary.
   */
  public async wordByText(word: string): Promise<Word | undefined> {
    const loadedWord = this.dictionary.get(word);

    if (loadedWord !== undefined && !Array.isArray(loadedWord)) {
      return loadedWord as Word;
    }

    const chunk = this.wordToChunk.get(word);

    if (chunk === undefined) {
      return undefined;
    }

    await this.loadWordChunk(chunk);

    return this.dictionary.get(word) as Word;
  }

  /**
   * Returns the {@link DefinedWord} for the given word text and part of speech, loading it if necessary.
   */
  public async wordByPos(word: string, pos: POS): Promise<DefinedWord | undefined> {
    return (await this.wordByText(word))?.[pos] as DefinedWord | undefined;
  }

  /**
   * Returns the {@link DefinedWord} for the given word ID, loading it if necessary.
   */
  public async wordById(id: number): Promise<DefinedWord> {
    let word = this.idToWord.get(id)!;

    if (typeof word !== "string") {
      return word;
    }

    await this.loadWordChunk(this.wordToChunk.get(id)!);

    return this.idToWord.get(id) as DefinedWord;
  }

  /**
   * Returns the IDs of the definitions of the word with the given text.
   */
  public wordIdsByText(text: string): readonly number[] {
    const word = this.dictionary.get(text);

    return word === undefined ? [] : Array.isArray(word) ? word : definitionsOf(word as Word).map((def) => def.wordId);
  }

  /**
   * Returns the text of a word given its ID.
   */
  public wordTextById(id: number): string {
    const word = this.idToWord.get(id)!;

    return typeof word === "string" ? word : word.text;
  }

  /**
   * Returns the homographs (words with the same spelling) of the given word, excluding
   * `word` itself.
   */
  public homographsOf(word: DefinedWord): readonly DefinedWord[] {
    // No need to load the chunk of `word`; since we are given a `DefinedWord`, it must be loaded already.
    return definitionsOf(this.dictionary.get(word.text) as Word).filter((def) => def !== word);
  }

  /**
   * Returns the Korean text for the given POS ID.
   */
  public posKoreanText(posId: string): string {
    return this.posIdToPos.get(posId)!.ko;
  }

  /**
   * Returns a list of words that start with the given string of Hangul syllables.
   */
  public wordsStartingWith(string: string, { limit = 0 }: { limit?: number } = {}): readonly string[] {
    let jamo: string;

    try {
      jamo = syllablesToJamo(string);
    } catch {
      return [];
    }

    const key = jamo.slice(0, 2);
    const lookupStrings = this.jamoPrefixes.get(key);

    if (lookupStrings === undefined) {
      return [];
    }

    const stringPrefix = /^[0xAC00-0xD7A3]*/.exec(string)![0];
    const syllablesInCommon = (other: string) => {
      let i = 0;
      while (i < stringPrefix.length && stringPrefix.charCodeAt(i) === other.charCodeAt(i)) {
        i++;
      }
      return i;
    };

    const lookupStringStart = jamo.slice(2);
    const results: [text: string, commonSyllables: number, index: number][] = [];

    for (const lookupString of lookupStrings) {
      if (lookupString.startsWith(lookupStringStart)) {
        const word = lookupString.slice(lookupString.indexOf("/") + 1);

        if (results.push([word, syllablesInCommon(word), results.length]) === limit) {
          break;
        }
      }
    }

    return results.sort(([a, aSyllablesInCommon, ai], [b, bSyllablesInCommon, bi]) => {
      // Prefer strings that start with full matching syllables.
      if (aSyllablesInCommon !== bSyllablesInCommon) {
        return bSyllablesInCommon - aSyllablesInCommon;
      }

      // Prefer shorter strings.
      if (a.length !== b.length) {
        return a.length - b.length;
      }

      // `sort()` is not stable, so fall back to indices.
      return ai - bi;
    }).map(([text]) => text);
  }

  /**
   * Returns a list of words that start with the given string of English characters.
   */
  public async wordsWithEnglishTranslationStartingWith(
    text: string,
    { limit = 0 }: { limit?: number } = {},
  ): Promise<readonly [en: string, ko: string, id: number][]> {
    const index = await this.englishPrefixes();
    const key = text.slice(0, 3);
    const lookupString = text.slice(3);
    const values = index.get(key);
    const results: [en: string, ko: string, id: number][] = [];

    for (const value of values ?? []) {
      if (value.startsWith(lookupString)) {
        const [en, ko, wordId] = value.split("/");
        if (results.push([key + en, ko, +wordId]) === limit) {
          break;
        }
      }
    }

    return results;
  }

  /**
   * Returns a list of words that contain the given Han character.
   */
  public wordsWithHan(han: string): readonly [words: readonly HanWord[], readings: readonly string[]] {
    return this.hanMap.get(han) ?? [[], []];
  }

  public seenCount(word: string): number {
    return JSON.parse(localStorage.getItem(seenCountKey(word)) ?? "{}")[word] ?? 0;
  }

  public bumpSeenCount(word: string): void {
    const seenCounts = JSON.parse(localStorage.getItem(seenCountKey(word)) ?? "{}") as SeenCounter;
    if (word in seenCounts) {
      seenCounts[word]!++;
    } else {
      seenCounts[word] = 1;
    }
    localStorage.setItem(`seen-${word.slice(0, 1)}`, JSON.stringify(seenCounts));
  }

  public static async load(): Promise<Db> {
    return new Db(await fetchProtobuf(indexFiles.index, Index));
  }
}

async function fetchProtobuf<M>(name: string, ctor: { decode(data: Uint8Array): M; }): Promise<M> {
  const resp = await fetch(`/data/${name}.binpb`);
  const data = await resp.arrayBuffer();

  return ctor.decode(new Uint8Array(data));
}
