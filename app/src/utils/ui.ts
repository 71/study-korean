export function withKey(key: string, callback: (e: KeyboardEvent) => void) {
  return (e: KeyboardEvent) => {
    if (e.key === key) {
      callback(e);
    }
  };
}
