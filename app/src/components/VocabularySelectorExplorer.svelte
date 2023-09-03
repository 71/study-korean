<script lang="ts">
	import TokenSelector from "./TokenSelector.svelte";
	import VocabularyExplorer from "./VocabularyExplorer.svelte";
	import { AmbiguousTokenSelection, TokenSelection } from "./Token.svelte";

  export let inputSelection: AmbiguousTokenSelection;

  let selectedSelection: TokenSelection;
</script>

{#if inputSelection.tokens.length > 1}
  <TokenSelector {inputSelection} bind:selectedSelection />
{/if}

<VocabularyExplorer
  inputSelection={selectedSelection ?? { source: inputSelection.source, token: inputSelection.tokens[0] }}
  on:tokenSelected
  on:isProminent
/>
