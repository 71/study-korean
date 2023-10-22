/**
 * Returns an event handler function that invokes `callback` if it receives a
 * keyboard event whose {@link KeyboardEvent.key key} equals `key`.
 */
export function withKey(key: string, callback: (e: KeyboardEvent) => void) {
  return (e: KeyboardEvent) => {
    if (e.key === key) {
      callback(e);
    }
  };
}

/**
 * Serializes the selections in {@link document.getSelection()} to be restored
 * by {@link resolveSelectionRanges()}.
 */
export function flattenSelectionRanges(
  element: Element,
): readonly { start: number; end: number; }[] {
  const docSelection = document.getSelection();
  const selections: { start: number; end: number; }[] = [];

  if (docSelection === null) {
    return selections;
  }

  for (let i = 0; i < docSelection.rangeCount; i++) {
    const range = docSelection.getRangeAt(i);

    if (range.commonAncestorContainer.parentElement === element) {
      selections.push({ start: range.startOffset, end: range.endOffset });
      continue;
    }

    let start = range.startOffset;
    let node = element.firstChild;

    if (node === null) {
      // When editing very fast, we may access `node` before it has been given a value.
      break;
    }

    while (node.firstChild !== range.startContainer) {
      start += node.textContent!.length;
      if (node.nextSibling === null) {
        return [];
      }
      node = node.nextSibling;
    }

    let end = start - range.startOffset + range.endOffset;

    while (node.firstChild !== range.endContainer) {
      end += node.textContent!.length;
      if (node.nextSibling === null) {
        return [];
      }
      node = node.nextSibling;
    }

    selections.push({ start, end });
  }

  return selections;
}

/**
 * Resolves the ranges with the given offsets from the start of the given
 * container `element`.
 */
export function resolveSelectionRanges(
  element: Element,
  selections: readonly { start: number; end: number; }[],
): readonly Range[] | undefined {
  const docSelection = document.getSelection();

  if (docSelection === null) {
    return;
  }

  const ranges: Range[] = [];

  for (let { start, end } of selections) {
    const range = document.createRange();
    let index = 0;
    let node = element.firstChild;

    while (node !== null) {
      const nodeText = node.nodeType === Node.TEXT_NODE ? node as Text : node.firstChild as Text;
      const nodeTextLength = nodeText.data.length;

      if (index <= start && start <= index + nodeTextLength) {
        range.setStart(nodeText, start - index);
      }

      if (index <= end && end <= index + nodeTextLength) {
        range.setEnd(nodeText, end - index);
        break;
      }

      index += nodeTextLength;
      node = node.nextSibling;
    }

    ranges.push(range);
  }

  return ranges;
}

/**
 * Updates the current {@link document.getSelection()} to match the given ranges
 * returned by {@link flattenSelectionRanges()}.
 */
export function restoreSelectionRanges(
  element: Element,
  selections: readonly { start: number; end: number; }[],
): void {
  const selection = document.getSelection();

  if (selection === null) {
    return;
  }

  selection.removeAllRanges();

  for (const range of resolveSelectionRanges(element, selections) ?? []) {
    selection.addRange(range);
  }
}
