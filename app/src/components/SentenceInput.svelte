<script lang="ts">
	import { onMount, tick } from "svelte";

	import type { Db } from "../db";
	import { resizeTokens } from "../utils/tokens";
	import Token, { AmbiguousTokenSelection } from "./Token.svelte";
	import { definitionsOf, throttle } from "../utils";

  export let okt: typeof import("oktjs") | undefined;
  export let db: Db | undefined;

  export let sentence: string;
  export let selection: AmbiguousTokenSelection | undefined;

  export let suggestions: readonly string[];

  const enum Type {
    Hangul,
    Foreign,
  }

  $: sentenceOrPlaceholder = sentence.length === 0 ? "안녕하세요" : sentence;
  $: type = /\p{Script=Hangul}/u.test(sentenceOrPlaceholder) ? Type.Hangul : Type.Foreign;

  let selectionAtEnd = false;
  let sentenceElement: HTMLElement;
  let sentenceInputTokens: { text: string; wordIds: readonly number[]; }[] = [];

  function saveSelections() {
    const docSelection = document.getSelection();
    const selections: { start: number; end: number; }[] = [];

    if (docSelection === null) {
      return selections;
    }

    for (let i = 0; i < docSelection.rangeCount; i++) {
      const range = docSelection.getRangeAt(i);

      if (range.commonAncestorContainer.parentElement === sentenceElement) {
        selections.push({ start: range.startOffset, end: range.endOffset });
        continue;
      }

      let start = range.startOffset;
      let node = sentenceElement.firstChild!;

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

  function restoreSelections(selections: readonly { start: number; end: number; }[]) {
    const docSelection = document.getSelection();

    if (docSelection === null) {
      return;
    }

    docSelection.removeAllRanges();

    for (let { start, end } of selections) {
      const range = document.createRange();
      let index = 0;
      let node = sentenceElement.firstChild;

      while (node !== null) {
        const nodeText = node.firstChild as Text;
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

      docSelection.addRange(range);
    }
  }

  function refreshSentenceInputTokens() {
    if (okt === undefined || db === undefined) {
      return;
    }

    const savedSelections = saveSelections();

    switch (type) {
    case Type.Hangul:
      sentenceInputTokens = resizeTokens(
        okt.tokenize(okt.normalize(sentenceOrPlaceholder))
          .map((token) => ({
            text: token.text,
            wordIds: definitionsOf(db!.wordByText(token.stem ?? token.text)).map((word) => word.wordId),
          })),
      );
      break;
    case Type.Foreign:
      sentenceInputTokens = [{ text: sentenceOrPlaceholder, wordIds: [] }];
      break;
    }

    tick().then(() => {
      // If the sentence was empty, the browser might have added a line break.
      // Or in some cases it might have inserted things while we added a span.
      for (const child of sentenceElement.childNodes) {
        if (child.nodeType !== Node.ELEMENT_NODE || (child as Element).tagName !== "SPAN") {
          child.remove();
        }
      }
      restoreSelections(savedSelections);
    });
  }

  function handleSentenceInput(e: Event) {
    sentence = sentenceElement.textContent?.replace(/\n/g, " ") ?? "";

    if (okt !== undefined && db !== undefined && !(e as InputEvent).isComposing) {
      tick().then(refreshSentenceInputTokens);
    }
  }

  $: suggestions = db === undefined || !selectionAtEnd ? [] : ((): readonly string[] => {
    const lastWord = /\p{Script=Hangul}+$/u.exec(sentence.trimEnd());

    if (lastWord === null) {
      return [];
    }

    return db.wordsStartingWith(lastWord[0], { limit: 100 });
  })();

  $: if (db !== undefined && okt !== undefined) {
    sentenceElement.replaceChildren();
    refreshSentenceInputTokens();
  }

  $: if (type === Type.Foreign && sentence.length > 0) {
    // TODO: selection = { source: sentenceElement, tokens: [sentence] };
  }

  onMount(() => {
    const rawSelectionChangeEventListener = () => {
      const selection = document.getSelection()!;

      if (!sentenceElement.contains(selection.focusNode)) {
        return;
      }

      const tokenElement = selection.focusNode!.parentElement;

      tokenElement?.click();

      selectionAtEnd = selection.focusNode?.textContent?.length === selection.focusOffset;
    };

    const selectionChangeEventListener = throttle(400, rawSelectionChangeEventListener);

    document.addEventListener("selectionchange", selectionChangeEventListener);

    return () => document.removeEventListener("selectionchange", selectionChangeEventListener);
  });
</script>

<div class="sentence-input">
  <span
    contenteditable="plaintext-only"
    class:placeholder={sentenceOrPlaceholder !== sentence}
    bind:this={sentenceElement}
    on:input={handleSentenceInput}
  >
    <!-- Key contents with `sentenceInputTokens` to force a redraw, otherwise Svelte gets confused
         when editing text and modifying the tokens at the same time.
    -->
    {#key sentenceInputTokens}
      {#each sentenceInputTokens as token}
        <Token text={token.text} wordIds={token.wordIds} bind:selection />
      {:else}
        <!-- Display sentence at first while waiting for the DB and tokenizer to load. -->
        <span class="pending">{sentenceOrPlaceholder}</span>
      {/each}
    {/key}
  </span>
</div>

<style>
  .sentence-input {
    font-family: var(--title-font-family);
    font-size: 2.4em;
    white-space: pre-wrap; /* Prevents nbsp insertion in contenteditable. */
    margin: 0.8em 0;
  }

  span[contenteditable] {
    margin: .5em 0;
    outline: none;

    &.placeholder {
      color: var(--fg-secondary);
    }
  }
</style>
