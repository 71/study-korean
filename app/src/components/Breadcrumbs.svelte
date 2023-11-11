<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let crumbs: readonly string[];

  const dispatch = createEventDispatcher<{ crumbclick: number }>();
</script>

<div class="breadcrumbs">
  {#each crumbs as crumb, i}
    {#if i > 0}
      <span>/</span>
    {/if}
    <span
      class="crumb"
      role="button"
      tabindex="0"
      on:click={() => dispatch("crumbclick", i)}
      on:keypress={() => dispatch("crumbclick", i)}>{crumb}</span
    >
  {/each}
</div>

<style>
  .breadcrumbs {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }
</style>
