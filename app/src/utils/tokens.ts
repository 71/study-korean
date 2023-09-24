const emptyArray = Object.freeze([]);

export type SimpleToken = { readonly text: string; } & (
  | { }
  | { readonly wordId: number; }
  | { readonly wordIds: readonly number[]; }
);

/**
 * Resizes the given tokens to be displayed in the UI.
 *
 * More specifically:
 * - Whitespace is trimmed from tokens that have definitions.
 * - Zero-sized tokens are merged with their preceeding token.
 */
export function resizeTokens(tokens: readonly SimpleToken[]) {
  const result: { text: string; wordIds: readonly number[]; }[] = [];

  for (const token of tokens) {
    const text = token.text;
    const wordIds = "wordId" in token && token.wordId != null
      ? [token.wordId]
      : "wordIds" in token && token.wordIds != null
        ? token.wordIds
        : [];

    if (text.trim().length === 0 && result.length > 0) {
      result[result.length - 1].wordIds = [...result[result.length - 1].wordIds, ...wordIds];
      if (text.length > 0) {
        result.push({ text: text, wordIds: emptyArray });
      }
    } else {
      result.push({ text, wordIds });
    }
  }

  return result;
}
