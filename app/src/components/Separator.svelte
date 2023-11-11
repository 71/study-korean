<script lang="ts" context="module">
  const pageWidth = readable(0, (set) => {
    const updatePageWidth = () => {
      set(document.querySelector("main > .sections")!.clientWidth);
    };

    updatePageWidth();
    addEventListener("resize", updatePageWidth, { passive: true });

    return () => removeEventListener("resize", updatePageWidth);
  });
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { readable } from "svelte/store";

  const path: [number, number][] = [
    [-30, 0],
    [-10, 20],
    [10, 0],
    [30, 20],
    [50, 0],
    [60, 10],
    [70, 0],
  ];

  $: scale = $pageWidth < 500 ? 0.6 : 1;
  $: pathToPoints = (xm: number, ym: number) =>
    path.map(([x, y]) => [x * xm * scale, y * ym * scale].join(",")).join(" ");

  $: offsetX = path[path.length - 1][0] * scale;
  $: patternWidth = offsetX * 2;
  $: lineWidth = ($pageWidth - patternWidth) / 2;

  let svgElement: SVGElement;

  function updateStroke() {
    const polyline = svgElement.querySelectorAll("polyline")!;
    const line = svgElement.querySelectorAll("line")!;

    for (const element of [...polyline, ...line]) {
      const length = `${element.getTotalLength()}`;

      element.style.setProperty("stroke-dasharray", length);
      element.style.setProperty("stroke-dashoffset", length);
    }
  }

  onMount(() => updateStroke());
  $: svgElement !== undefined && ($pageWidth, updateStroke());
</script>

<!-- This is a small convenience, and should not be triggered using a keyboard. -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="separator" role="separator" on:click>
  <svg bind:this={svgElement}>
    {#each [true, false] as border}
      {#each [[1, 1], [1, -1], [-1, 1], [-1, -1]] as [xm, ym]}
        <polyline points={pathToPoints(xm, ym)} fill="none" class:border />
      {/each}

      {#each [1, -1] as xm}
        <line x1={xm * offsetX} x2={xm * (offsetX + lineWidth)} y1="0" y2="0" class:border />
      {/each}
    {/each}
  </svg>
</div>

<style>
  .separator {
    width: 100%;
    height: 100px;
    position: relative;
    z-index: 2;

    & > svg {
      overflow: visible;
      margin-left: 50%;
      width: 50%;
      margin-top: 50px;
      height: 50px;
    }
  }

  polyline,
  line {
    stroke: var(--accent-1);
    stroke-width: 1px;

    &.border {
      stroke: var(--background);
      stroke-width: 7px;
    }
  }

  polyline {
    animation: remove-dashoffset 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  line {
    animation: remove-dashoffset 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 700ms forwards;
  }

  @keyframes remove-dashoffset {
    to {
      stroke-dashoffset: 0;
    }
  }
</style>
