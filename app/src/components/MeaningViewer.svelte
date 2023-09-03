<script lang="ts">
	import { showTranslations, uiWordIds } from "../store";
	import { resizeTokens } from "../utils/tokens";
	import Token, { AmbiguousTokenSelection } from "./Token.svelte";

  export let meaning: import("../data-proto.d.ts").WordData.IMeaning;
  export let selection: AmbiguousTokenSelection | undefined;

  let expanded = false;

  $: resizedTokens = meaning.definition?.tokens == null
    ? null
    : resizeTokens(resizeTokens(meaning.definition.tokens.map((token) => ({ text: token.text ?? "", wordId: token.wordId }))));
</script>

<div
  class="meaning"
  on:click={() => expanded = !expanded}
  on:keypress={() => expanded = !expanded}
  role=button
  tabindex=0
>
  <table>
    {#if $showTranslations}
      <tr>
        <td class="header">
          <Token text="번역" wordIds={[$uiWordIds.번역.wordId]} bind:selection />
        </td>
        <td>
          {#each meaning.translation?.split(";") ?? "" as translation, i}
            {#if i > 0},{/if}
            <span>{translation.trim()}</span>
          {/each}
        </td>
      </tr>
    {/if}

    <tr>
      <td class="header">
        <Token text="정의" wordIds={[$uiWordIds.정의.wordId]} bind:selection />
      </td>
      <td>
        {#each resizedTokens ?? [] as { text, wordIds }}
          <Token {text} {wordIds} bind:selection />
        {/each}
      </td>
    </tr>
  </table>
</div>

<style>
  .meaning :global(span) {
    background-color: color-mix(in srgb, var(--background) 70%, transparent);

    &.selected {
      /* Do not hide selection indicator. */
      background-color: transparent;
    }
  }

  .meaning {
    font-size: 1.3em;
  }

  td.header {
    padding: 0 1em 1em 0;
    font-size: .7em;
  }

  td {
    vertical-align: top;
  }
</style>
