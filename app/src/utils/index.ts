import { readable } from "svelte/store";
import { Db, DefinedWord, Word } from "../db";

/**
 * Same as `value!`, used when the null assertion operator is unavailable (e.g.
 * in Svelte templates).
 *
 * Stands for "non-null".
 */
export function nn<T>(value: T | undefined | null): T {
  return value!;
}

export function debounce<Args extends any[]>(
  ms: number,
  f: (...args: Args) => void,
): (...args: Args) => void {
  let timeoutToken: ReturnType<typeof setTimeout>;

  return (...args: Args) => {
    if (timeoutToken !== undefined) {
      clearTimeout(timeoutToken);
    }

    timeoutToken = setTimeout(() => f(...args), ms);
  };
}

export function throttle<Args extends any[]>(
  ms: number,
  f: (...args: Args) => void,
): (...args: Args) => void {
  let timeoutToken: undefined | ReturnType<typeof setTimeout>;
  let invokeAtEnd = false;

  return (...args: Args) => {
    if (timeoutToken === undefined) {
      f(...args);
      timeoutToken = setTimeout(() => {
        if (invokeAtEnd) {
          f(...args);
        }
        timeoutToken = undefined;
        invokeAtEnd = false;
      }, ms);
    } else {
      invokeAtEnd = true;
    }
  };
}

export function awaitOr<T>(promise: T, fallback: Awaited<T>) {
  return readable(fallback, (set) => {
    Promise.resolve(promise).then(
      (x) => set(x),
      (e) => console.error(e),
    );
  });
}

export function definitionsOf(word: Word | undefined): readonly DefinedWord[] {
  if (word === undefined) {
    return [];
  }
  return Object.values(word).filter((v) => typeof v === "object" && v !== null);
}

export async function summarizeTranslations(db: Db, wordId: number): Promise<string> {
  const wordData = await db.wordById(wordId);
  const translations: string[] = [];

  for (const meaning of wordData.meanings) {
    if (meaning.translation == null || meaning.translation.length === 0) {
      continue;
    }

    for (const translation of meaning.translation.split(/\s*;\s*/g)) {
      if (!translations.includes(translation)) {
        translations.push(translation);
      }
    }
  }

  return translations.join(", ");
}
