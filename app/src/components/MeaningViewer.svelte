<script lang="ts">
  import { Meaning } from "../db";
  import { uiWordIds } from "../generated";
  import { showTranslations } from "../store";
  import { nn } from "../utils";
  import { resizeTokens } from "../utils/tokens";
  import MeaningViewRow from "./MeaningViewRow.svelte";
  import Token, { AmbiguousTokenSelection } from "./Token.svelte";

  export let meaning: Meaning;
  export let selection: AmbiguousTokenSelection | undefined;

  const emptyList: readonly never[] = [];
  let expanded = false;

  $: resizedTokens =
    meaning.definition?.tokens == null
      ? null
      : resizeTokens(
          resizeTokens(
            meaning.definition.tokens.map((token) => ({
              text: token.text ?? "",
              wordId: token.wordId,
            })),
          ),
        );

  $: relatedWords = [
    ...(meaning.synonyms?.map((ref) => [ref, "유의어"] as const) ?? emptyList),
    ...(meaning.antonyms?.map((ref) => [ref, "반의어"] as const) ?? emptyList),
    ...(meaning.originalForms?.map((ref) => [ref, "파생어"] as const) ?? emptyList),
    ...(meaning.related?.map((ref) => [ref, "참고"] as const) ?? emptyList),
  ];
</script>

<div
  class="meaning"
  on:click={() => (expanded = !expanded)}
  on:keypress={() => (expanded = !expanded)}
  role="button"
  tabindex="0"
>
  <table>
    {#if $showTranslations}
      <MeaningViewRow class="translation" headerText="번역" wordId={uiWordIds.번역} bind:selection>
        {#each meaning.translation?.split(";") ?? "" as translation, i}
          {#if i > 0},{/if}
          <span>{translation.trim()}</span>
        {:else}
          <em>No translation available</em>
        {/each}
      </MeaningViewRow>
    {/if}

    <MeaningViewRow class="definition" headerText="정의" wordId={uiWordIds.정의} bind:selection>
      {#each resizedTokens ?? [] as { text, wordIds }}
        <Token {text} {wordIds} bind:selection />
      {/each}
    </MeaningViewRow>

    {#if $showTranslations && meaning.definitionTranslation != null}
      <MeaningViewRow
        class="definition-translation"
        headerText="번역"
        wordId={uiWordIds.번역}
        bind:selection
      >
        <span>{meaning.definitionTranslation}</span>
      </MeaningViewRow>
    {/if}
  </table>

  {#if relatedWords.length > 0}
    <div class="related-words">
      {#each relatedWords as [{ text, wordIds }, type]}
        <div class="pair">
          <Token text={nn(text)} wordIds={wordIds ?? emptyList} bind:selection />
          <Token text={type} wordIds={[uiWordIds[type]]} bind:selection />
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
    position: relative;
    z-index: 2;
  }

  :global(.translation td:last-child),
  :global(.definition-translation td:last-child) {
    font-size: 0.85em;
  }

  :global(.translation td:last-child) {
    text-transform: uppercase;
  }

  table {
    border-spacing: 0 0.4em;
  }

  .related-words {
    margin-top: 0.5em;
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
      margin-right: 0.6em;
      font-weight: 500;
    }
  }
</style>
