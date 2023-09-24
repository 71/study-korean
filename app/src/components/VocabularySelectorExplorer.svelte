<script lang="ts">
	import TokenSelector from "./TokenSelector.svelte";
	import VocabularyExplorer from "./VocabularyExplorer.svelte";
	import { AmbiguousTokenSelection, TokenSelection } from "./Token.svelte";
	import { db } from "../store";

  export let inputSelection: AmbiguousTokenSelection;

  let selectedSelection: TokenSelection;
  let dedupInputSelection: AmbiguousTokenSelection;

  $: {
    const tokensText: string[] = [];
    const dedupTokens: (string | number)[] = [];

    for (const token of inputSelection.tokens) {
      const tokenText = typeof token === "string" ? token : $db.wordById(token).text;
      if (!tokensText.includes(tokenText)) {
        tokensText.push(tokenText);
        dedupTokens.push(token);
      }
    }

    dedupInputSelection = { ...inputSelection, tokens: dedupTokens };
  }
</script>

{#if dedupInputSelection.tokens.length > 1}
  <TokenSelector inputSelection={dedupInputSelection} bind:selectedSelection />
{/if}

<VocabularyExplorer
  inputSelection={selectedSelection ?? { source: inputSelection.source, token: inputSelection.tokens[0] }}
  on:isProminent
  on:tokenReplaced
  on:tokenSelected
/>
