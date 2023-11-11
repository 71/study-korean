<script lang="ts">
  import { onMount, tick } from "svelte";

  import Token, { AmbiguousTokenSelection } from "./Token.svelte";
  import type { Db } from "../db";
  import { throttle } from "../utils";
  import { resizeTokens } from "../utils/tokens";
  import { flattenSelectionRanges, resolveSelectionRanges, withKey } from "../utils/ui";

  export let okt: typeof import("oktjs") | undefined;
  export let db: Db | undefined;

  export let sentence: string;
  export let selection: AmbiguousTokenSelection | undefined;

  export let suggestions: readonly string[];

  const enum Type {
    Hangul,
    Foreign,
  }

  // When the input sentence is empty and the text box is not focused, we display a placeholder
  // and automatically focus one of the words.

  const placeholder = "그렉의 한국어 사전";
  const placeholderFocusedWord = "한국어";

  let displayPlaceholder = sentence.trim().length === 0;
  let selectionAtEnd = false;

  $: sentenceOrPlaceholder = displayPlaceholder ? placeholder : sentence;
  $: type = /\p{Script=Hangul}|^\s*$/u.test(sentence) ? Type.Hangul : Type.Foreign;

  let inputElement: HTMLElement;
  let tokensElement: HTMLElement;

  $: sentenceInputTokens =
    okt === undefined || db === undefined
      ? []
      : ((sentenceOrPlaceholder: string) => {
          switch (type) {
            case Type.Hangul:
              return resizeTokens(
                okt.tokenize(okt.normalize(sentenceOrPlaceholder)).map((token) => ({
                  text: token.text,
                  wordIds: db!.wordIdsByText(token.stem ?? token.text),
                })),
              );
            case Type.Foreign:
              return [{ text: sentenceOrPlaceholder, wordIds: [] }];
          }
        })(sentenceOrPlaceholder);

  function handleSentenceInput(e: Event) {
    sentence = inputElement.textContent?.replace(/\n/g, " ") ?? "";

    if (okt !== undefined && db !== undefined && !(e as InputEvent).isComposing) {
      // Wait until next tick for `sentence` to be updated.
      tick().then(() => {
        if (sentence === "") {
          tick().then(() => {
            document.getSelection()!.setPosition(inputElement, 0);
          });
        }
      });
    }
  }

  async function handleSentenceFocus() {
    displayPlaceholder = false;
  }

  async function handleSentenceBlur() {
    if (sentence.trim().length === 0) {
      displayPlaceholder = true;
      sentence = "";

      await tick();

      const tokenElement = [...tokensElement.querySelectorAll("span.token")].find(
        (span) => span.textContent === placeholderFocusedWord,
      );

      (tokenElement as HTMLElement | undefined)?.click();
    }
  }

  async function clearSentence() {
    displayPlaceholder = false;
    sentence = "";
    await tick();
    inputElement.focus();
  }

  $: if (db === undefined || !selectionAtEnd || displayPlaceholder) {
    suggestions = [];
  } else {
    const lastWord = /\p{Script=Hangul}+$/u.exec(sentence.trimEnd());

    if (lastWord === null) {
      suggestions = [];
    } else {
      suggestions = db.wordsStartingWith(lastWord[0], { limit: 100 });
    }
  }

  onMount(() => {
    const rawSelectionChangeEventListener = async () => {
      const selection = document.getSelection()!;

      if (displayPlaceholder) {
        return;
      }

      if (!inputElement.contains(selection.focusNode)) {
        return;
      }

      const selectionRanges = flattenSelectionRanges(inputElement);

      if (selectionRanges.length === 0) {
        return;
      }

      const ranges = resolveSelectionRanges(tokensElement, selectionRanges);

      if (ranges === undefined || ranges.length === 0) {
        return;
      }

      const tokenElement = ranges[0].startContainer!.parentElement;

      tokenElement?.click();

      selectionAtEnd = selection.focusNode?.textContent?.length === selection.focusOffset;
    };

    const selectionChangeEventListener = throttle(400, rawSelectionChangeEventListener);

    document.addEventListener("selectionchange", selectionChangeEventListener);

    return () => document.removeEventListener("selectionchange", selectionChangeEventListener);
  });

  $: if (inputElement !== undefined) {
    if (inputElement.textContent !== sentenceOrPlaceholder) {
      inputElement.textContent = sentenceOrPlaceholder;
    }
  }

  $: if (okt !== undefined && db !== undefined && tokensElement !== undefined) {
    // Delay check until next tick, since the tokens may not have been rendered yet.
    tick().then(() => {
      const anyTokenSelected = tokensElement.querySelector("span.token.selected") !== null;

      if (!anyTokenSelected) {
        (tokensElement.lastElementChild as HTMLElement | undefined)?.click();
      }
    });
  }
</script>

<div class="sentence-input" class:placeholder={displayPlaceholder}>
  <div class="sentence">
    <div
      class="editor"
      contenteditable="plaintext-only"
      bind:this={inputElement}
      on:input={handleSentenceInput}
      on:focusin={handleSentenceFocus}
      on:focusout={handleSentenceBlur}
      role="textbox"
      tabindex="0"
    />

    <div class="tokens" bind:this={tokensElement}>
      {#each sentenceInputTokens as token}
        <Token text={token.text} wordIds={token.wordIds} bind:selection />
      {/each}
    </div>
  </div>

  <div class="clear-wrapper">
    <span
      class="clear"
      class:hidden={sentenceInputTokens.length === 0}
      role="button"
      tabindex="0"
      title="Clear input sentence"
      on:keypress={withKey("Space", clearSentence)}
      on:click={clearSentence}>×</span
    >
  </div>
</div>

<style>
  .sentence-input {
    font-family: var(--title-font-family);
    font-size: 2.4em;
    /* white-space: pre-wrap; Prevents nbsp insertion in contenteditable. */
    margin: 0.8em 0;
    display: flex;

    &.placeholder {
      color: var(--fg-secondary);
    }

    & > .sentence {
      position: relative;
      flex-grow: 1;
    }
  }

  .editor,
  .tokens {
    width: 100%;
  }

  .editor {
    white-space: pre-wrap;
    outline: none;
    position: absolute;
  }

  .tokens {
    color: transparent;
  }

  .clear-wrapper {
    margin-top: -0.05em;
  }

  .clear {
    cursor: pointer;

    &.hidden {
      cursor: initial;
      color: transparent;
    }
  }
</style>
