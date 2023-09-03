<script lang="ts">
	import { onMount } from "svelte";

	import type { Db } from "../db";
	import { resizeTokens } from "../utils/tokens";
	import Token, { AmbiguousTokenSelection } from "./Token.svelte";

  export let okt: typeof import("oktjs") | undefined;
  export let db: Db | undefined;

  export let sentence: string;
  export let selection: AmbiguousTokenSelection | undefined;

  export let suggestions: readonly string[];
  export let selectionAtEnd: boolean;

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
    sentenceInputTokens = resizeTokens(
      okt.tokenize(okt.normalize(sentence))
        .map((token) => ({
          text: token.text,
          wordIds: db!.wordByText(token.stem ?? token.text).map((word) => word.wordId),
        })),
    );
    restoreSelections(savedSelections);
  }

  function handleSentenceInput(e: Event) {
    sentence = sentenceElement.textContent ?? "";

    if (okt !== undefined && db !== undefined && !(e as InputEvent).isComposing) {
      refreshSentenceInputTokens();
    }
  }

  $: suggestions = db === undefined ? [] : ((): readonly string[] => {
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

  onMount(() => {
    const selectionChangeEventListener = () => {
      const selection = document.getSelection()!;

      if (!sentenceElement.contains(selection.focusNode)) {
        return;
      }

      const tokenElement = selection.focusNode!.parentElement;

      tokenElement?.click();

      selectionAtEnd = selection.focusNode?.textContent?.length === selection.focusOffset;
    };

    document.addEventListener("selectionchange", selectionChangeEventListener);

    return () => document.removeEventListener("selectionchange", selectionChangeEventListener);
  });
</script>

<div class="sentence-input">
  <p contenteditable bind:this={sentenceElement} on:input={handleSentenceInput}>
    <!-- Display sentence at first while waiting for the DB and tokenizer to load. -->
    <span class=placeholder>
      {sentence}
    </span>
    {#each sentenceInputTokens as token}
      <Token text={token.text} wordIds={token.wordIds} bind:selection />
    {/each}
  </p>
</div>

<style>
  .sentence-input {
    font-family: var(--title-font-family);
    font-size: 2.4em;
    white-space: pre-wrap; /* Prevents nbsp insertion in contenteditable. */
  }
</style>
