<!--
@component
A wrapper around an anchor `<a>` element which updates the current route
instead of navigating on a simple click.
-->

<script lang="ts">
	import { navigate } from "../store";

  export let href: string;

  function handleClick(event: Event) {
    event.preventDefault();

    navigate((event.target as HTMLAnchorElement).href, { inplace: false });
  }
</script>

<a {...$$restProps} {href} on:click={handleClick}><slot /></a>
