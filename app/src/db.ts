import Data from "../../data/kodata.rawproto";
import { AllData } from "./data-proto";
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

const seenCountKey = (word: string) => `word-${word[0]}`;

const emptyList = Object.freeze([]);

export class Db {
  private readonly dictionary = new Map<string, Word>();
  private readonly idToWord = new Map<number, DefinedWord>();
  private readonly jamoPrefixes = new Map<string, string[]>();
  private readonly hanMap = new Map<string, [DefinedWord[], string[]]>();
  private readonly idToPos = new Map<string, import("./data-proto.d.ts").AllData.PartOfSpeech>();

  private constructor(allData: ReturnType<(typeof AllData)["decode"]>) {
    (window as Record<string, any>)["DB"] = this;

    for (const pos of allData.pos as Iterable<import("./data-proto.d.ts").AllData.PartOfSpeech>) {
      this.idToPos.set(pos.id!, pos);
    }

    for (const word of allData.words as Iterable<Word>) {
      // Add to dictionary.
      this.dictionary.set(word.text, word);

      // Add to ID map.
      for (const def of definitionsOf(word)) {
        this.idToWord.set(def.wordId, def);
      }

      // Add to prefixes list.
      let jamo: string | undefined = undefined;

      try {
        jamo = syllablesToJamo(word.text);
      } catch {
        // Not fully jamo, don't add to index.
      }

      if (jamo !== undefined) {
        const key = jamo.slice(0, 2);
        const lookupString = `${jamo.slice(2)}/${word.text}`;
        const list = this.jamoPrefixes.get(key);

        if (list === undefined) {
          this.jamoPrefixes.set(key, [lookupString]);
        } else if (!list.includes(lookupString)) {
          list.push(lookupString);
        }
      }
    }

    for (const list of this.dictionary.values()) {
      Object.freeze(list);
    }
  }

  public wordByText(word: string): Word | undefined {
    return this.dictionary.get(word);
  }

  public wordByPos(word: string, pos: POS): DefinedWord | undefined {
    return this.wordByText(word)?.[pos] as DefinedWord | undefined;
  }

  public wordById(id: number): DefinedWord {
    return this.idToWord.get(id)!;
  }

  public homographsOf(word: DefinedWord): readonly DefinedWord[] {
    return definitionsOf(this.dictionary.get(word.text)!).filter((def) => def !== word);
  }

  public posKoreanText(id: string): string {
    return this.idToPos.get(id)!.ko;
  }

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

    const lookupStringStart = jamo.slice(2);
    const results: string[] = [];

    for (const lookupString of lookupStrings) {
      if (lookupString.startsWith(lookupStringStart)) {
        const word = lookupString.slice(lookupString.indexOf("/") + 1);

        if (results.push(word) === limit) {
          break;
        }
      }
    }

    return results;
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

  public wordsWithHan(han: string): [readonly DefinedWord[], readonly string[]] {
    const hanMap = this.hanMap;

    if (hanMap.size === 0) {
      // Lazily initialize map.

      // Create map from Han character to words that contain it.
      for (const word of this.idToWord.values()) {
        if (word.origin == null) {
          continue;
        }

        for (const char of word.origin) {
          const existing = hanMap.get(char);

          if (existing === undefined) {
            hanMap.set(char, [[word], []]);
          } else if (!existing[0].includes(word)) {
            existing[0].push(word);
          }
        }
      }

      // Sort words by usage and find Korean readings.
      for (const [han, [words, readings]] of hanMap) {
        this.sortWordsByRelevance(words);

        for (const word of words) {
          if (word.origin?.length !== word.text.length) {
            continue;
          }

          const hangulReading = word.text[word.origin.indexOf(han)];

          if (!readings.includes(hangulReading)) {
            // Keeps the readings sorted in the same order as words.
            readings.push(hangulReading);
          }
        }
      }
    }

    return hanMap.get(han) ?? [emptyList, emptyList];
  }

  public wordsWithEnglishTranslationIncluding(text: string): readonly DefinedWord[] {
    const results: DefinedWord[] = [];

    for (const word of this.idToWord.values()) {
      let found = false;

      for (const meaning of word.meanings) {
        if (meaning.translation?.includes(text)) {
          found = true;
          break;
        }
      }

      if (found) {
        if (results.push(word) === 100) {
          // Limit to 100 results.`
          break;
        }
      }
    }

    return this.sortWordsByRelevance(results);
  }

  private sortWordsByRelevance(words: DefinedWord[]): DefinedWord[] {
    return words.sort((a, b) => {
      const cmp = this.dictionary.get(b.text)!.score - this.dictionary.get(a.text)!.score;

      return cmp !== 0 ? cmp : a.text.localeCompare(b.text);
    });
  }

  public static async load(): Promise<Db> {
    const resp = await fetch(Data);
    const data = await resp.arrayBuffer();

    return new Db(AllData.decode(new Uint8Array(data)));
  }
}
