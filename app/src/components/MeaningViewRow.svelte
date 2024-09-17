<script lang="ts">
  import Token, { AmbiguousTokenSelection } from "./Token.svelte";

  export let headerText: string;
  export let wordId: number;
  export let selection: AmbiguousTokenSelection | undefined;
  let class_: string;
  export { class_ as class };
</script>

<tr class={class_}>
  <td class="header">
    <div class="bg">
      <div class="arrow" />

      <Token text={headerText} wordIds={[wordId]} bind:selection />
    </div>
  </td>
  <td>
    <slot />
  </td>
</tr>

<style>
  td {
    vertical-align: top;
  }

  td.header {
    font-size: 0.7em;
    text-wrap: nowrap;
    color: var(--fg-secondary);

    & > .bg {
      padding: 6px;
      position: relative;
      background-color: var(--bg-accent-1);
      margin-right: 0.8em;
    }

    & .arrow {
      width: 10px;
      height: 10px;
      position: absolute;
      border-bottom: 1px solid var(--accent-1);
      border-right: 1px solid var(--accent-1);
      right: 0;
      bottom: 0;
      opacity: 0.6;
    }
  }

  td:last-child {
    padding-top: 5px;
  }
</style>
