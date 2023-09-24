<script lang="ts">
	import { Meaning } from "../db";
	import { showTranslations, uiWordIds } from "../store";
	import { nn } from "../utils";
	import { resizeTokens } from "../utils/tokens";
	import Token, { AmbiguousTokenSelection } from "./Token.svelte";

  export let meaning: Meaning;
  export let selection: AmbiguousTokenSelection | undefined;

  const emptyList: readonly never[] = [];
  let expanded = false;

  $: resizedTokens = meaning.definition?.tokens == null
    ? null
    : resizeTokens(resizeTokens(meaning.definition.tokens.map((token) => ({ text: token.text ?? "", wordId: token.wordId }))));

  $: relatedWords = [
    ...(meaning.synonyms?.map((ref) => [ref, "유의어"] as const) ?? emptyList),
    ...(meaning.antonyms?.map((ref) => [ref, "반의어"] as const) ?? emptyList),
    ...(meaning.originalForms?.map((ref) => [ref, "파생어"] as const) ?? emptyList),
    ...(meaning.related?.map((ref) => [ref, "참고"] as const) ?? emptyList),
  ];
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
      <tr class="translation">
        <td class="header">
          <Token text="번역" wordIds={[$uiWordIds.번역.wordId]} bind:selection />
        </td>
        <td>
          {#each meaning.translation?.split(";") ?? "" as translation, i}
            {#if i > 0},{/if}
            <span>{translation.trim()}</span>
          {:else}
            <em>No translation available</em>
          {/each}
        </td>
      </tr>
    {/if}

    <tr class="definition">
      <td class="header">
        <Token text="정의" wordIds={[$uiWordIds.정의.wordId]} bind:selection />
      </td>
      <td>
        {#each resizedTokens ?? [] as { text, wordIds }}
          <Token {text} {wordIds} bind:selection />
        {/each}
      </td>
    </tr>

    {#if $showTranslations && meaning.definitionTranslation != null}
      <tr class="definition-translation">
        <td class="header">
          <Token text="번역" wordIds={[$uiWordIds.번역.wordId]} bind:selection />
        </td>
        <td>
          {meaning.definitionTranslation}
        </td>
      </tr>
    {/if}
  </table>

  {#if relatedWords.length > 0}
    <div class="related-words">
      {#each relatedWords as [{ text, wordIds }, type]}
        <div class="pair">
          <Token text={nn(text)} wordIds={wordIds ?? emptyList} bind:selection />
          <Token text={type} wordIds={[$uiWordIds[type].wordId]} bind:selection />
        </div>
      {/each}
    </div>
  {/if}
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

  tr.translation, tr.definition-translation {
    color: var(--fg-secondary);

    & td:last-child {
      font-size: .8em;
    }
  }

  tr.translation td:last-child {
    text-transform: uppercase;
  }

  td.header {
    padding: 0 1em 1em 0;
    font-size: .7em;
    text-wrap: nowrap;
  }

  td {
    vertical-align: top;
  }

  .related-words {
    margin-top: .5em;
  }

  .related-words .pair {
    border: 1px solid var(--fg-secondary);
    display: inline-block;
    padding: 0.2em;
    font-weight: 200;
    margin-left: 0.5em;

    &:first-child {
      margin-left: 0;
    }

    & > span:first-child {
      margin-right: .6em;
      font-weight: 500;
    }
  }
</style>
