<script lang="ts">
	import { onDestroy } from "svelte";
	import { drawLine } from "./TokenLines.svelte";

  export let from: HTMLElement | undefined;
  export let to: HTMLElement | undefined;

  let subscription: { (): void; } | undefined;

  $: if (from !== undefined && to !== undefined) {
    subscription?.();
    subscription = drawLine({ from, to });
  } else {
    subscription?.();
  }

  onDestroy(() => subscription?.());
</script>
