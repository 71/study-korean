<script lang="ts">
  import TokenSelector from "./TokenSelector.svelte";
  import VocabularyExplorer from "./VocabularyExplorer.svelte";
  import { AmbiguousTokenSelection, TokenSelection } from "./Token.svelte";
  import { db } from "../store";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{
    tokenReplaced: TokenSelection;
  }>();

  export let inputSelection: AmbiguousTokenSelection;

  let selectedSelection: TokenSelection;
  let dedupInputSelection: AmbiguousTokenSelection;

  $: {
    const tokensText: string[] = [];
    const dedupTokens: (string | number)[] = [];

    for (const token of inputSelection.tokens) {
      const tokenText = typeof token === "string" ? token : $db.wordTextById(token);
      if (!tokensText.includes(tokenText)) {
        tokensText.push(tokenText);
        dedupTokens.push(token);
      }
    }

    dedupInputSelection = { ...inputSelection, tokens: dedupTokens };
  }

  // Selected token index, when there is only one textual token with multiple IDs.
  let selectedTokenIndex = 0;

  $: innerSelection = {
    source: inputSelection.source,
    token: inputSelection.tokens[selectedTokenIndex],
  };

  function handleTokenReplaced(selection: TokenSelection | undefined) {
    selectedTokenIndex = inputSelection.tokens.findIndex((t) => t === selection?.token);
    dispatch("tokenReplaced", innerSelection);
  }

  $: if (selectedSelection !== undefined) {
    dispatch("tokenReplaced", selectedSelection);
  }
</script>

{#if dedupInputSelection.tokens.length > 1}
  <TokenSelector inputSelection={dedupInputSelection} bind:selectedSelection />
{/if}

<VocabularyExplorer
  inputSelection={selectedSelection ?? innerSelection}
  on:isProminent
  on:tokenReplaced={(e) => handleTokenReplaced(e.detail)}
  on:tokenSelected
  on:tokenUnselected
/>
