<script lang="ts" context="module">
  interface WordElement extends HTMLElement {
    notifyTopWord?(isTopWord: boolean): void;
  }

  const visibleWordElements = new Set<WordElement>();
  let lastIntersecting: WordElement | undefined;

  const intersectionObserver = new IntersectionObserver((entries) => {
    // Update list of visible elements.
    for (const entry of entries) {
      const wordElement = entry.target as WordElement;

      if (entry.isIntersecting) {
        visibleWordElements.add(wordElement);
      } else {
        visibleWordElements.delete(wordElement);
      }
    }

    // Find highest element that starts before the top of the screen.
    const maxOffsetTop = scrollY;

    let bestElement: WordElement | undefined;

    for (const visibleElement of visibleWordElements) {
      if (visibleElement.offsetTop <= maxOffsetTop) {
        bestElement = visibleElement;
        break;
      }
    }

    // Update top-most element.
    if (bestElement !== lastIntersecting) {
      lastIntersecting?.notifyTopWord!(false);
      lastIntersecting = bestElement;
      lastIntersecting?.notifyTopWord!(true);
    }
  }, {
    rootMargin: "0px",
    threshold: 0,  // Elements can be very large, so a very small threshold is needed.
  });

  const enum Type {
    Hangul,
    Foreign,
    Han,
  }

  const typeToPos = ["불명", "로마자", "한자"];
</script>

<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import { db, showTranslations, uiWordIds } from "../store";
	import { withKey } from "../utils/ui";

	import MeaningViewer from "./MeaningViewer.svelte";
  import Token, { AmbiguousTokenSelection, TokenSelection } from "./Token.svelte";
	import Line from "./Line.svelte";
	import { nn, summarizeTranslations } from "../utils";

  const dispatch = createEventDispatcher<{
    tokenSelected: AmbiguousTokenSelection | undefined,
    isProminent: boolean,
  }>();

  export let inputSelection: TokenSelection;

  $: token = inputSelection.token;
  $: tokenData = typeof token === "string" ? undefined : $db.wordById(token);
  $: tokenText = typeof token === "string" ? token : tokenData!.text;
  $: synonyms = tokenData !== undefined ? $db.synonymsOf(tokenData) : [];

  $: type = typeof token === "number" || /\p{Script=Hangul}/u.test(token)
    ? Type.Hangul
    : /^\p{Script=Han}$/u.test(token)
      ? Type.Han
      : Type.Foreign;

  let wordElement: WordElement;

  $: tokenElement = wordElement?.querySelector(".text-box") as HTMLElement;
  $: koPos = (tokenData?.posKo ?? typeToPos[type]) as keyof typeof $uiWordIds;

  $: [wordsWithHan, hanReadings] = type === Type.Han ? $db.wordsWithHan(tokenText) : [undefined, undefined];

  onMount(() => {
    Object.defineProperty(wordElement, "notifyTopWord", {
      get: () => (isTopWord: boolean) => {
        dispatch("isProminent", isTopWord);
      },
    });
    intersectionObserver.observe(wordElement);

    return () => {
      intersectionObserver.unobserve(wordElement);
      visibleWordElements.delete(wordElement);
    };
  });

  let outputSelection: AmbiguousTokenSelection | undefined;

  $: dispatch("tokenSelected", outputSelection);

  function playWordAudio() {
    const utterance = new SpeechSynthesisUtterance(tokenText);

    switch (type) {
    case Type.Hangul:
      utterance.lang = "ko-KR";
      break;
    case Type.Foreign:
      utterance.lang = "en-US";
      break;
    case Type.Han:
      // When tested, Chrome did not read the token aloud when clicked.
      //
      // We _could_ use `lang = "zh-CN"`, but this pronunciation is likely very different
      // from the Korean one so instead we don't do anything.
      if (hanReadings!.length === 0) {
        return;
      }

      utterance.lang = "ko-KR";
      utterance.text = hanReadings![0];
      break;
    }
    utterance.rate = .85;

    speechSynthesis.speak(utterance);
  }
</script>

<div bind:this={wordElement}>
  {#if type !== Type.Foreign}
    <div class="main-info">
      <Line from={inputSelection.source} to={tokenElement} />

      <div
        class="text-box"
        on:click={playWordAudio}
        on:keypress={withKey("Space", playWordAudio)}
        role="button"
        tabindex="0"
      >
        <div class="pronunciation" class:hidden={tokenData === undefined || tokenData.pronunciation == null || tokenData.pronunciation === tokenText}>
          {tokenData?.pronunciation}
        </div>

        <span class="text">{tokenText}</span>
      </div>

      <div class="info">
        {#if tokenData !== undefined && tokenData.origin != null}
          <div>
            <em class="hanja">
              {#each tokenData.origin as character}
                <Token text={character} wordIds={[]} bind:selection={outputSelection} />
              {/each}
            </em>
          </div>
        {/if}

        {#if hanReadings !== undefined && hanReadings.length > 0}
          <div>
            <em class="readings">
              {#each hanReadings as hanReading, i}
                {#if i > 0},{/if}
                <span>{hanReading}</span>
              {/each}
            </em>
          </div>
        {/if}

        <div class="pos-picker">
          <em>
            <Token text={koPos} wordIds={[$uiWordIds[koPos].wordId]} bind:selection={outputSelection} />
          </em>

          {#each synonyms as synonym, i}
            {#if i > 0}
              |
            {/if}
            <span>{synonym.posKo}</span>
          {/each}
        </div>

        {#if tokenData !== undefined && tokenData.mostCommon != null}
          <div>
            <Token text="사용" wordIds={[$uiWordIds.사용.wordId]} bind:selection={outputSelection} />
            <Token text="빈도" wordIds={[$uiWordIds.빈도.wordId]} bind:selection={outputSelection} />수
            <em>{tokenData.mostCommon}</em>
            <!--nobr-->
            <Token text="위" wordIds={[$uiWordIds.위.wordId]} bind:selection={outputSelection} />
          </div>
        {/if}
      </div>
    </div>
  {/if}

  {#if type === Type.Hangul}
    {#each tokenData?.meanings ?? [] as meaning, i}
      {#if i > 0}
        <div class="separator-wrapper" role="separator">
          <hr />
        </div>
      {/if}
      <MeaningViewer {meaning} bind:selection={outputSelection} />
    {/each}
  {:else if type === Type.Han}
    <table class="hanja" cellspacing=0>
      {#each nn(wordsWithHan) as word}
        <tr>
          <td>
            {#each nn(word.origin) as character}
              <!--nobr-->
              {#if character === tokenText}
                <!--nobr-->
                <b>{character}</b>
                <!--nobr-->
              {:else if /^\p{Script=Han}$/u.test(character)}
                <!--nobr-->
                <Token text={character} wordIds={[]} bind:selection={outputSelection} />
                <!--nobr-->
              {:else}
                <!--nobr-->
                <span>{character}</span>
                <!--nobr-->
              {/if}
              <!--nobr-->
            {/each}
          </td>

          <td>
            <Token text={word.text} wordIds={[word.wordId]} bind:selection={outputSelection} />
          </td>

          <td>
            {#if $showTranslations}
              {summarizeTranslations(word)}
            {/if}
          </td>
        </tr>
      {/each}
    </table>
  {:else}
    <table class="english" cellspacing=0>
      {#each $db.wordsWithEnglishTranslationIncluding(tokenText) as word}
        <tr>
          <td>
            <Token text={word.text} wordIds={[word.wordId]} bind:selection={outputSelection} />
          </td>
          <td>
            {nn(word.meanings).find((m) => nn(m.translation).includes(tokenText))?.translation}
          </td>
        </tr>
      {/each}
    </table>
  {/if}
</div>

<style>
  :root {
    width: 100%;
  }

  .main-info {
    display: flex;
    width: 100%;
    margin-bottom: 1.4em;

    & > .info {
      margin-left: .4em;
      flex: 1;
      font-size: 1.7em;
      font-weight: 200;

      display: flex;
      flex-direction: column;
      justify-content: space-around;

      color: var(--fg-secondary);
    }

    & em {
      color: var(--fg-primary);
      font-style: normal;
    }
  }

  .text-box {
    z-index: -2;
    max-width: 80%;
    border: 1px solid color-mix(in srgb, var(--fg-primary) 30%, transparent);
    position: relative;
    background-color: var(--bg-accent-1);
    display: flex;
    align-items: center;

    & > .text {
      font-family: var(--title-font-family);
      font-size: 4em;
      display: block;
      margin: .1em .3em;
      margin-top: 0;

      @media (max-width: 500px) {
        & {
          font-size: 2.4em;
        }
      }
    }

    & > .pronunciation {
      position: absolute;
      bottom: 0;
      right: 0;
      border: 1px solid color-mix(in srgb, var(--fg-primary) 30%, transparent);
      background-color: var(--bg-accent-1);
      font-size: 1.3em;
      padding: .1em .4em;
      transform: translate(0.3em, 0.9em);

      &.hidden {
        opacity: 0;
      }

      @media (max-width: 500px) {
        & {
          font-size: .9em;
        }
      }
    }
  }

  .info {
    @media (max-width: 500px) {
      & {
        font-size: 1.1em!important;
      }
    }

    & span {
      background-color: color-mix(in srgb, var(--background) 70%, transparent);
    }
  }

  .english {
    font-size: 1.3em;
    background-color: color-mix(in srgb, var(--background) 70%, transparent);
  }

  table {
    font-size: 1.2em;

    & td {
      text-wrap: nowrap;
      padding: 0.5em 0;
      border-bottom: 1px solid color-mix(in srgb, var(--fg-secondary) 20%, transparent);
      padding-right: 1em;
      vertical-align: top;
    }

    &.hanja td:nth-child(3) {
      padding-right: 0;
      text-wrap: inherit;
      width: 100%;
      font-weight: 300;
    }

    & span {
      background-color: color-mix(in srgb, var(--background) 70%, transparent);
    }

    @media (max-width: 500px) {
      font-size: .9em;
    }
  }

  em.hanja {
    font-size: 1.4em;
  }

  .separator-wrapper {
    background-color: var(--background);
    padding: .1em 0;
    margin: .4em 0;
  }

  hr {
    border-style: solid;
    border-bottom: none;
    border-color: color-mix(in srgb, var(--fg-primary) 30%, transparent);
    margin: 0;
  }
</style>
