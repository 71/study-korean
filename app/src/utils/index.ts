/**
 * Same as `value!`, used when the null assertion operator is unavailable (e.g.
 * in Svelte templates).
 *
 * Stands for "non-null".
 */
export function nn<T>(value: T | undefined | null): T {
  return value!;
}
