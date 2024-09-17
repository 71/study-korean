<script lang="ts" context="module">
  interface WordElement extends HTMLElement {
    notifyTopWord?(isTopWord: boolean): void;
  }

  const visibleWordElements = new Set<WordElement>();
  let lastIntersecting: WordElement | undefined;

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
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
    },
    {
      rootMargin: "0px",
      threshold: 0, // Elements can be very large, so a very small threshold is needed.
    },
  );

  const enum Type {
    Hangul,
    Foreign,
    Han,
  }

  const typeToPos = ["불명", "로마자", "한자"];
</script>

<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { db, showTranslations } from "../store";
  import { withKey } from "../utils/ui";

  import MeaningViewer from "./MeaningViewer.svelte";
  import Token, { AmbiguousTokenSelection, TokenSelection } from "./Token.svelte";
  import Line from "./Line.svelte";
  import { awaitOr, nn, summarizeTranslations } from "../utils";
  import { Meaning } from "../db";
  import { uiWordIds } from "../generated";

  export let inputSelection: TokenSelection;

  const dispatch = createEventDispatcher<{
    tokenSelected: AmbiguousTokenSelection | undefined;
    tokenReplaced: TokenSelection | undefined;
    tokenUnselected: AmbiguousTokenSelection;
    isProminent: boolean;
  }>();

  const dispatchTokenUnselected = (e: CustomEvent<AmbiguousTokenSelection>) =>
    dispatch("tokenUnselected", e.detail);

  $: token = inputSelection.token;
  $: tokenData = awaitOr(typeof token === "string" ? undefined : $db.wordById(token), undefined);
  $: tokenText = typeof token === "string" ? token : $tokenData?.text ?? $db.wordTextById(token);
  $: homographs = $tokenData !== undefined ? $db.homographsOf($tokenData) : [];

  $: type =
    typeof token === "number" || /\p{Script=Hangul}/u.test(token)
      ? Type.Hangul
      : /^\p{Script=Han}$/u.test(token)
      ? Type.Han
      : Type.Foreign;

  $: originCells = (function computeOriginCells() {
    if ($tokenData?.origin == null) {
      return undefined;
    }

    const [text, origin] = [$tokenData.text.replace(/^-|-$/, ""), $tokenData.origin];

    if (text === origin) {
      return undefined;
    }

    let prefix = 0;
    while (prefix < text.length && prefix < origin.length && text[prefix] === origin[prefix]) {
      prefix++;
    }

    let suffix = 0;
    while (
      suffix < text.length &&
      suffix < origin.length &&
      text[text.length - 1 - suffix] === origin[origin.length - 1 - suffix]
    ) {
      suffix++;
    }

    const shortOrigin = origin.slice(prefix, origin.length - suffix);

    if (shortOrigin === "") {
      return undefined;
    }

    if (prefix === 0 && suffix === 0 && text.length !== origin.length) {
      return origin;
    }

    return { prefix, origin: shortOrigin };
  })();

  let wordElement: WordElement;

  $: tokenElement = wordElement?.querySelector(".text-box") as HTMLElement;
  $: koPos = (
    $tokenData !== undefined ? $db.posKoreanText($tokenData.pos) : typeToPos[type]
  ) as keyof typeof uiWordIds;

  $: meanings = type === Type.Hangul ? ($tokenData?.meanings as Meaning[] | undefined) : undefined;
  $: mostCommon = awaitOr(
    type === Type.Hangul ? $db.wordByText(tokenText).then((x) => x?.mostCommon) : undefined,
    undefined,
  );
  $: [wordsWithHan, hanReadings] =
    type === Type.Han ? $db.wordsWithHan(tokenText) : [undefined, undefined];

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
        // When tested, Chrome did not read the Han token aloud when clicked.
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
    utterance.rate = 0.85;

    speechSynthesis.speak(utterance);
  }

  function replaceWith(wordId: number) {
    dispatch("tokenReplaced", { source: inputSelection.source, token: wordId });
  }
</script>

<div bind:this={wordElement}>
  {#if type !== Type.Foreign}
    <div class="main-info">
      <Line from={inputSelection.source} to={tokenElement} />

      <div
        class="text-box"
        on:keypress={withKey("Space", playWordAudio)}
        role="button"
        tabindex="0"
      >
        <div
          class="pronunciation"
          class:hidden={($tokenData?.pronunciation ?? "") === "" ||
            nn($tokenData).pronunciation === tokenText}
        >
          {$tokenData?.pronunciation}
        </div>

        <table class:has-origin={typeof originCells !== "undefined"}>
          <tr class="text" on:click={playWordAudio}>
            {#each tokenText as character}
              <td>{character}</td>
            {/each}
          </tr>

          {#if typeof originCells === "object"}
            <tr class="origin">
              {#if originCells.prefix > 0}
                <td colspan={originCells.prefix} />
              {/if}
              {#each originCells.origin as character}
                <td class="hanja">
                  <Token
                    text={character}
                    wordIds={[]}
                    bind:selection={outputSelection}
                    on:activeTokenClick={dispatchTokenUnselected}
                  />
                </td>
              {/each}
            </tr>
          {:else if typeof originCells === "string"}
            <tr class="origin">
              <td colspan={tokenText.length}>
                ({originCells})
              </td>
            </tr>
          {/if}
        </table>
      </div>

      <div class="info" class:dense={$tokenData?.origin != null && $mostCommon != null}>
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
            <Token
              text={koPos}
              wordIds={[uiWordIds[koPos]]}
              bind:selection={outputSelection}
              on:activeTokenClick={dispatchTokenUnselected}
            />
          </em>

          {#each homographs as homograph}
            <span
              on:click={() => replaceWith(homograph.wordId)}
              on:keypress={withKey("Space", () => replaceWith(homograph.wordId))}
              role="button"
              tabindex="0">{$db.posKoreanText(homograph.pos)}</span
            >
          {/each}
        </div>

        {#if $mostCommon != null}
          <div class="usage">
            <Token
              text="사용"
              wordIds={[uiWordIds.사용]}
              bind:selection={outputSelection}
              on:activeTokenClick={dispatchTokenUnselected}
            />
            <Token
              text="빈도"
              wordIds={[uiWordIds.빈도]}
              bind:selection={outputSelection}
              on:activeTokenClick={dispatchTokenUnselected}
            />수
            <em>{$mostCommon}</em>
            <!--nobr-->
            <Token
              text="위"
              wordIds={[uiWordIds.위]}
              bind:selection={outputSelection}
              on:activeTokenClick={dispatchTokenUnselected}
            />
          </div>
        {/if}
      </div>
    </div>
  {/if}

  {#if type === Type.Hangul}
    {#each meanings ?? [] as meaning, i}
      {#if i > 0}
        <div class="separator-wrapper" role="separator">
          <hr />
        </div>
      {/if}
      <MeaningViewer {meaning} bind:selection={outputSelection} />
    {/each}
  {:else if type === Type.Han}
    <table class="hanja" cellspacing="0">
      {#each nn(wordsWithHan) as word}
        <tr>
          <td>
            {#each word.han as character}
              <!--nobr-->
              {#if character === tokenText}
                <!--nobr-->
                <b>{character}</b>
                <!--nobr-->
              {:else if /^\p{Script=Han}$/u.test(character)}
                <!--nobr-->
                <Token
                  text={character}
                  wordIds={[]}
                  bind:selection={outputSelection}
                  on:activeTokenClick={dispatchTokenUnselected}
                />
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
            <Token
              text={word.hangul}
              wordIds={[word.id]}
              bind:selection={outputSelection}
              on:activeTokenClick={dispatchTokenUnselected}
            />
          </td>

          <td>
            {#if $showTranslations}
              {#await summarizeTranslations($db, word.id)}
                ...
              {:then translations}
                {translations}
              {/await}
            {/if}
          </td>
        </tr>
      {/each}
    </table>
  {:else}
    <table class="english" cellspacing="0">
      {#await $db.wordsWithEnglishTranslationStartingWith(tokenText) then words}
        {#each words as [en, ko, id]}
          <tr>
            <td>
              <Token
                text={ko}
                wordIds={[id]}
                bind:selection={outputSelection}
                on:activeTokenClick={dispatchTokenUnselected}
              />
            </td>
            <td>
              {en}
            </td>
          </tr>
        {/each}
      {/await}
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
      margin-left: 0.4em;
      flex: 1;
      font-size: 1.7em;
      font-weight: 200;

      display: flex;
      flex-direction: column;
      justify-content: space-around;

      color: var(--fg-secondary);

      &.dense {
        font-size: 1.4em;
      }
    }

    & em {
      color: var(--fg-primary);
      font-style: normal;
    }
  }

  .text-box {
    max-width: 80%;
    border: 1px solid color-mix(in srgb, var(--fg-primary) 30%, transparent);
    position: relative;
    background-color: var(--bg-accent-1);
    display: flex;
    align-items: center;

    & > table {
      margin-left: 0.3em;
      margin-right: 0.3em;
      margin-bottom: 0.2em;

      &.has-origin {
        margin-bottom: 0.4em;
      }
    }

    & .text {
      font-family: var(--title-font-family);
      font-size: 4em;
      border-spacing: 0;

      @media (max-width: 500px) {
        & {
          font-size: 2.4em;
        }
      }
    }

    & .origin > td {
      padding-left: 4px;

      &.hanja {
        font-size: 1.2em;
      }

      & span {
        display: block;
        margin-top: -0.3em;
        width: fit-content;
      }
    }

    & > .pronunciation {
      position: absolute;
      bottom: 0;
      right: 0;
      border: 1px solid color-mix(in srgb, var(--fg-primary) 30%, transparent);
      background-color: var(--bg-accent-1);
      font-size: 1.3em;
      padding: 0.1em 0.4em;
      transform: translate(0.3em, 0.9em);

      &.hidden {
        opacity: 0;
      }

      @media (max-width: 500px) {
        & {
          font-size: 0.9em;
        }
      }
    }
  }

  .info {
    @media (max-width: 500px) {
      & {
        font-size: 1.1em !important;
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

  table.hanja,
  table.english {
    font-size: 1.2em;
    position: relative;
    z-index: 2;

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
      font-size: 0.9em;
    }
  }

  .separator-wrapper {
    background-color: var(--background);
    padding: 0.1em 0;
    margin: 0.4em 0;
  }

  .pos-picker > span {
    margin-left: 0.5em;
  }

  .usage {
    font-size: 0.85em;
    margin-top: 0.2em;
  }

  hr {
    border-style: solid;
    border-bottom: none;
    border-color: color-mix(in srgb, var(--fg-primary) 30%, transparent);
    margin: 0;
  }
</style>
