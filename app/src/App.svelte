<script lang="ts">
  import { RouteKind, dbPromise, navigate, route, showTranslations } from "./store";
  import { onMount } from "svelte";
  import { Db } from "./db";
  import SentenceInput from "./components/SentenceInput.svelte";
  import VocabularySelectorExplorer from "./components/VocabularySelectorExplorer.svelte";
  import TokenLines from "./components/TokenLines.svelte";
  import { AmbiguousTokenSelection } from "./components/Token.svelte";
  import Separator from "./components/Separator.svelte";

  // Loading data.
  const oktPromise = import("oktjs");

  let okt: typeof import("oktjs") | undefined;
  let db: Db | undefined;

  dbPromise.then((_) => (db = _));
  oktPromise.then((_) => (okt = _));

  // Sentence input.
  let sentence =
    $route.kind === RouteKind.SentenceExplorer
      ? $route.sentence
      : localStorage.getItem("searchSentence") ?? "안녕하세요";

  $: localStorage.setItem("searchSentence", sentence.trim());

  let sentenceSelection: AmbiguousTokenSelection | undefined = undefined;
  let suggestions: readonly string[] = [];

  // Breadcrumbs.
  let breadcrumbs: readonly string[] = [];
  let displayBreadcrumbs = false;

  $: navigate(
    sentence.trim().length === 0
      ? { kind: RouteKind.Index }
      : { kind: RouteKind.SentenceExplorer, sentence: sentence.trim(), words: breadcrumbs },
    { inplace: true },
  );

  onMount(() => {
    const scrollEventListener = () => (displayBreadcrumbs = scrollY > 50);

    document.addEventListener("scroll", scrollEventListener, { passive: true });

    return () => document.removeEventListener("scroll", scrollEventListener);
  });

  // Vocabulary.
  let extendedSentenceSelection: AmbiguousTokenSelection | undefined;

  $: if (db !== undefined && sentenceSelection !== undefined) {
    const tokensText = sentenceSelection.tokens.map((token) =>
      typeof token === "string" ? token : db!.wordTextById(token),
    );

    extendedSentenceSelection = {
      source: sentenceSelection.source,
      tokens: [...sentenceSelection.tokens, ...suggestions.filter((x) => !tokensText.includes(x))],
    };
  } else {
    extendedSentenceSelection = undefined;
    selections = [];
  }

  let selections: readonly AmbiguousTokenSelection[] = [];
  let prominentSelection: AmbiguousTokenSelection | undefined;

  $: sections =
    extendedSentenceSelection === undefined ? [] : [extendedSentenceSelection, ...selections];

  const enum UpdateType {
    Remove,
    Replace,
    Update,
  }

  function updateSelection(
    index: number,
    selection: AmbiguousTokenSelection | undefined,
    type: UpdateType,
  ) {
    // TODO: event is triggered twice when Replacing
    if (extendedSentenceSelection === undefined) {
      index--;
    }
    if (type === UpdateType.Remove) {
      selections = selections.slice(0, index - 1);
      return;
    }
    if (type === UpdateType.Replace) {
      if (index === 0) {
        selections = [];
      } else {
        selections = selections.slice(index - 1);
      }
      return;
    }
    // `+ 1` to include item at `index`, `- 1` to remove `sentenceSelection`.
    if ((selection?.tokens.length ?? 0) === 0) {
      selections = selections.slice(0, index + 1 - 1);
    } else {
      selections = [...selections.slice(0, index + 1 - 1), selection!];
    }
  }

  let sectionsElement: HTMLElement;
</script>

<TokenLines />

<div class="translations-toggle">
  <button on:click={() => showTranslations.update((v) => !v)}> Toggle translations </button>
</div>

<main>
  <SentenceInput {db} {okt} bind:selection={sentenceSelection} bind:suggestions bind:sentence />

  {#await Promise.all([oktPromise, dbPromise])}
    <p>로딩 중...</p>
  {:then _}
    <div class="sections" bind:this={sectionsElement}>
      {#each sections as selection, i (selection)}
        {#if i > 0}
          <Separator
            on:click={() => sectionsElement.children[i - 1].scrollIntoView({ behavior: "smooth" })}
          />
        {:else}
          <div role="separator" style="height: 1em;" />
        {/if}

        <VocabularySelectorExplorer
          inputSelection={selection}
          on:tokenReplaced={() => updateSelection(i, undefined, UpdateType.Remove)}
          on:tokenSelected={({ detail: selection }) =>
            updateSelection(i, selection, UpdateType.Update)}
          on:tokenUnselected={() => updateSelection(i, undefined, UpdateType.Remove)}
          on:isProminent={({ detail: isProminent }) => {
            if (isProminent) {
              breadcrumbs = sections.slice(0, i + 1).map((t) => `${t.tokens[0]}`);
              prominentSelection = selections[i - 1];
            } else {
              breadcrumbs = [];
              prominentSelection = undefined;
            }
          }}
        />
      {/each}
    </div>
  {:catch error}
    <p>Could not load database: {error}</p>
  {/await}
</main>

<style>
  :root {
    --background: #0d0b00;
    --fg-primary: white;
    --fg-secondary: #dddddd;

    --accent-1: gold;
    --bg-accent-1: #171407;

    --title-font-family: Hahmlet, sans-serif;

    background-color: var(--background);
    color: var(--fg-primary);
  }

  main {
    width: 100%;
    max-width: 800px;
    padding: 0 1em 8em 1em;

    & > input {
      padding: 1em 0;
      width: 100%;
      border: none;
      font-size: 2em;
    }
  }

  .translations-toggle {
    position: fixed;
    bottom: 0;
    left: auto;
    right: auto;
    border-radius: 1em 1em 0em 0em;
    background: var(--bg-accent-1);
    padding: 0.7em 1em 0.5em 1em;
    z-index: 10;

    & > button {
      background: none;
      border: none;
      color: var(--fg-primary);
      cursor: pointer;
    }
  }
</style>
