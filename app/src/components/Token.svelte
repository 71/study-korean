<script lang="ts" context="module">
  /**
   * A string representing a token that is selected by the user but which has
   * not been resolved either because it is not in the database or because its
   * Part-of-Speech in its sentence is unknown.
   */
  export type TextualToken = string;

  /**
   * A number representing the unique identifier of the word in the database,
   * and which also carries its Part-of-Speech.
   */
  export type KnownToken = number;

  /**
   * A selection of a token in the UI.
   */
  export interface TokenSelection {
    /**
     * The element which displays the selected token.
     */
    readonly source: HTMLElement;

    /**
     * The selected token.
     */
    readonly token: TextualToken | KnownToken;
  }

  /**
   * A selection of a token in the UI where multiple tokens may overlap in a
   * sentence.
   *
   * For instance, "난" is a single syllable which actually represents two
   * tokens: "나" and "는".
   */
  export interface AmbiguousTokenSelection {
    /**
     * The element which displays the selected token.
     */
    readonly source: HTMLElement;

    /**
     * The multiple representations of a single token.
     */
    readonly tokens: readonly (TextualToken | KnownToken)[];
  }
</script>

<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import { withKey } from "../utils/ui";

  export let text: string;
  export let wordIds: readonly number[];
  export let selection: AmbiguousTokenSelection | undefined;

  const dispatch = createEventDispatcher<{ activeTokenClick: AmbiguousTokenSelection }>();

  let element: HTMLElement;
  let thisSelection: AmbiguousTokenSelection;

  $: selectable =
    wordIds.length > 0 || /^[\p{Script=Han}\p{Script=Hangul}]+$|^[a-zA-Z]+$/u.test(text);
  $: thisSelection = { source: element, tokens: wordIds.length === 0 ? [text] : wordIds };
  $: selected = selection === thisSelection;
  $: selectionHandler = selectable
    ? () => {
        if (selection !== thisSelection) {
          selection = thisSelection;
        } else {
          dispatch("activeTokenClick", thisSelection);
          selection = undefined;
        }
      }
    : undefined;

  onDestroy(() => {
    if (selected) {
      selection = undefined;
    }
  });
</script>

<span
  bind:this={element}
  class="token"
  class:selected
  on:click={selectionHandler}
  on:keypress={selectionHandler !== undefined ? withKey("Space", selectionHandler) : undefined}
  role="button"
  tabindex="0"
>
  {text}
</span>

<style>
  .selected {
    border-bottom: solid 1px var(--accent-1);
  }
</style>
