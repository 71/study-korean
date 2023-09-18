import Data from "../../data/kodata.rawproto";
import { AllData } from "./data-proto";
import { syllablesToJamo } from "./utils/korean";

export type WordData = import("./data-proto.d.ts").WordData;
export type MeaningData = import("./data-proto.d.ts").WordData.Meaning;
export type SentenceData = import("./data-proto.d.ts").SentenceData;

interface SeenCounter {
  [word: string]: number | undefined;
}

const seenCountKey = (word: string) => `word-${word[0]}`;

const emptyList = Object.freeze([]);

export class Db {
  private readonly dictionary = new Map<string, WordData[]>();
  private readonly idToWord = new Map<number, WordData>();
  private readonly jamoPrefixes = new Map<string, string[]>();
  private readonly hanMap = new Map<string, [WordData[], string[]]>();

  private constructor(allData: ReturnType<(typeof AllData)["decode"]>) {
    for (const word of allData.words as Iterable<WordData>) {
      // Add to dictionary.
      const list = this.dictionary.get(word.text);

      if (list === undefined) {
        this.dictionary.set(word.text, [word]);
      } else {
        list.push(word);
      }

      // Add to ID map.
      this.idToWord.set(word.wordId, word);

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

    (window as Record<string, any>)["DB"] = this;
  }

  public wordByText(word: string): readonly WordData[] {
    return this.dictionary.get(word) ?? emptyList;
  }

  public wordByPos(word: string, pos: string): WordData | undefined {
    return pos.charCodeAt(0) > 200
      ? this.wordByText(word).find((word) => word.posKo === pos)
      : this.wordByText(word).find((word) => word.pos === pos);
  }

  public wordById(id: number): WordData {
    return this.idToWord.get(id)!;
  }

  public synonymsOf(word: WordData): readonly WordData[] {
    const synonyms: WordData[] = [];

    for (const synonym of this.dictionary.get(word.text)!) {
      if (synonym !== word) {
        synonyms.push(synonym);
      }
    }

    return synonyms;
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

  public wordsWithHan(han: string): [readonly WordData[], readonly string[]] {
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
        sortWordsByRelevance(words);

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

  public wordsWithEnglishTranslationIncluding(text: string): readonly WordData[] {
    const results: WordData[] = [];

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

    return sortWordsByRelevance(results);
  }

  public static async load(): Promise<Db> {
    const resp = await fetch(Data);
    const data = await resp.arrayBuffer();

    return new Db(AllData.decode(new Uint8Array(data)));
  }
}

function sortWordsByRelevance(words: WordData[]): WordData[] {
  return words.sort((a, b) => {
    if (a.mostCommon != null && b.mostCommon != null) {
      return a.mostCommon - b.mostCommon;
    }
    if (a.mostCommon != null) {
      return -1;
    }
    if (b.mostCommon != null) {
      return 1;
    }
    return a.text.localeCompare(b.text);
  });
}
