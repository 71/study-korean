<script lang="ts">
	import { onMount } from "svelte";
	import { AmbiguousTokenSelection, TokenSelection } from "./Token.svelte";
	import { db } from "../store";
	import Line from "./Line.svelte";
	import { triggerRedraw } from "./TokenLines.svelte";

  export let inputSelection: AmbiguousTokenSelection;
  export let selectedSelection: TokenSelection;

  let selectedTokenIndex = (void inputSelection, 0);  // Reset when `inputSelection` changes.
  let selectorElement: HTMLElement;
  let selectedElement: HTMLElement;

  function updateSelectedToken(selectedTokenIndex: number) {
    if (selectorElement !== undefined) {
      selectedElement = selectorElement.firstElementChild!.childNodes[selectedTokenIndex]! as HTMLElement;
    }

    const selectedToken = inputSelection.tokens[selectedTokenIndex];
    const selectedData = typeof selectedToken === "string" ? $db.wordByText(selectedToken) : [];

    selectedSelection = {
      source: selectedElement,
      token: selectedData.length > 0 ? selectedData[0].wordId : selectedToken,
    };
  }

  onMount(() => updateSelectedToken(selectedTokenIndex));
  $: updateSelectedToken(selectedTokenIndex);
</script>

<div bind:this={selectorElement} class="token-selector" on:scroll={() => triggerRedraw()}>
  <span class="tokens">
    {#each inputSelection.tokens as token, i}
      <span
        class="token" class:selected={selectedTokenIndex === i}
        on:click={() => selectedTokenIndex = i}
        on:keypress={() => selectedTokenIndex = i}
        role="button"
        tabindex=0
      >
        {typeof token === "string" ? token : $db.wordById(token).text}
      </span>
    {/each}
  </span>
</div>

<Line from={inputSelection.source} to={selectedElement} />

<style>
  .token-selector {
    margin-bottom: 1.6em;
    border: 1px solid white;
    border-left: none;
    border-right: none;
    text-wrap: nowrap;
    overflow-x: auto;

    /* Hide scrollbars: https://stackoverflow.com/a/38994837 */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar {
      display: none;  /* Safari and Chromium */
    }
  }

  .tokens {
    font-size: 1.7em;
    font-family: var(--title-font-family);

    & > .token {
      margin-left: 1em;
      opacity: .7;
      display: inline-block;
      padding: .05em 0 .15em 0;

      &:first-child {
        margin-left: 0;
      }

      &.selected {
        opacity: 1;
      }
    }
  }
</style>
