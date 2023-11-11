<script lang="ts" context="module">
  import { writable } from "svelte/store";
  import { TransitionConfig } from "svelte/transition";
  import { showTranslations } from "../store";
  import { tick } from "svelte";

  type Line = readonly [
    target: HTMLElement,
    pathData: string,
    fromMask: string,
    toMask: string,
    source: HTMLElement,
  ];

  const lines = writable<readonly Line[]>([]);

  const squareToBottomPath = (topX: number, topY: number, side: number) =>
    [
      `M ${topX} ${topY}`,
      `L ${topX - side} ${topY + side}`,
      `L ${topX} ${topY + side * 2}`,
      `M ${topX} ${topY}`,
      `L ${topX + side} ${topY + side}`,
      `L ${topX} ${topY + side * 2}`,
    ].join(" ");

  const squareToBottomPoints = (topX: number, topY: number, side: number) =>
    [
      // Add/subtract 1 to account for borders.
      `${topX} ${topY + 1}`,
      `${topX - side + 1} ${topY + side}`,
      `${topX} ${topY + side * 2 - 1}`,
      `${topX + side - 1} ${topY + side}`,
    ].join(" ");

  const computeLine = (from: HTMLElement, to: HTMLElement): Line => {
    const fromRect = from.getBoundingClientRect();
    const toRect = to.getBoundingClientRect();

    // For `y` positions, add/subtract 1 to account for borders.
    const xFrom = fromRect.left + fromRect.width / 2;
    const yFrom = fromRect.top + scrollY + fromRect.height + 1;
    const xTo = toRect.left + toRect.width / 2;
    const yTo = toRect.top + scrollY + 10 - 1;

    const sqSide = 4;
    const startSqSide = sqSide - 1;

    // Do not draw corners if the X positions are very close.
    const drawStraightLine = Math.abs(xFrom - xTo) < sqSide * 3;

    const fromSquarePath = squareToBottomPath(xFrom, yFrom - sqSide, startSqSide);
    const fromSquareMask = squareToBottomPoints(xFrom, yFrom - sqSide, startSqSide);

    const toSquarePath = squareToBottomPath(
      drawStraightLine ? xFrom : xTo,
      yTo - sqSide * 3,
      sqSide,
    );
    const toSquareMask = squareToBottomPoints(
      drawStraightLine ? xFrom : xTo,
      yTo - sqSide * 3,
      sqSide,
    );

    let path: string;

    if (drawStraightLine) {
      // Use `xFrom` instead of `xTo` since the width of `from` is likely
      // smaller than `to`'s (because `to` has a bigger font).
      path = [fromSquarePath, `L ${xFrom} ${yTo - sqSide * 3}`, toSquarePath].join(" ");
    } else {
      const cornerSqSide = sqSide;

      const xBelowFrom = xFrom;
      const yBelowFrom = yTo - sqSide * 5;

      const xAboveTo = xTo;
      const yAboveTo = yBelowFrom;

      // Use `hSqOffset` to handle corners that either go left or right.
      const hSqOffset = xFrom < xTo ? cornerSqSide : -cornerSqSide;

      path = [
        // Start
        fromSquarePath,

        // Line down to square
        `L ${xBelowFrom} ${yBelowFrom - cornerSqSide}`,
        `L ${xBelowFrom - hSqOffset} ${yBelowFrom}`,
        `L ${xBelowFrom} ${yBelowFrom + cornerSqSide}`,
        `L ${xBelowFrom + hSqOffset} ${yBelowFrom}`,
        `M ${xBelowFrom} ${yBelowFrom - cornerSqSide}`,
        `L ${xBelowFrom + hSqOffset} ${yBelowFrom}`,

        // Horizontal line to square
        `L ${xAboveTo - hSqOffset} ${yAboveTo}`,
        `L ${xAboveTo} ${yAboveTo - cornerSqSide}`,
        `L ${xAboveTo + hSqOffset} ${yAboveTo}`,
        `L ${xAboveTo} ${yAboveTo + cornerSqSide}`,
        `M ${xAboveTo - hSqOffset} ${yAboveTo}`,
        `L ${xAboveTo} ${yAboveTo + cornerSqSide}`,

        // End
        `L ${xTo} ${yTo - sqSide * 3}`,
        toSquarePath,
      ].join(" ");
    }

    return [to, path, fromSquareMask, toSquareMask, from];
  };

  export function drawLine({ from, to }: { from: HTMLElement; to: HTMLElement }) {
    const redrawLine = () => {
      const newLine = computeLine(from, to);

      lines.update((lines) => {
        const newLines: Line[] = [];

        for (const line of lines) {
          if (line[0] === to) {
            newLines.push(newLine);
          } else {
            newLines.push(line);
          }
        }

        return newLines;
      });
    };

    lines.update((lines) => [...lines, computeLine(from, to)]);

    addEventListener("resize", redrawLine, { passive: true });

    return () => {
      removeEventListener("resize", redrawLine);

      lines.update((lines) => lines.filter(([target]) => target !== to));
    };
  }

  export function triggerRedraw() {
    lines.update((lines) => lines.map(([target, , , , source]) => computeLine(source, target)));
  }

  showTranslations.subscribe(() => tick().then(() => triggerRedraw()));

  function pathLength(
    node: SVGPathElement,
    _: unknown,
    { direction }: { readonly direction: "in" | "out" | "both" },
  ): TransitionConfig {
    const length = node.getTotalLength();
    const multiplier = direction === "in" ? 1 : -1;

    return {
      duration: (direction === "in" ? 200 : 0) + node.getTotalLength() / 3,
      css: (t) => `
        stroke-dasharray: ${length};
        stroke-dashoffset: ${length * (1 - t) * multiplier};
        ${direction === "in" ? "" : `opacity: ${t};`}
      `,
    };
  }
</script>

<div class="token-lines" role="presentation">
  <svg class="masks">
    {#each $lines as [_, pathData, fromMask, toMask] (pathData)}
      <polygon points={fromMask} />
      <polygon points={toMask} />
    {/each}
  </svg>

  <svg class="lines">
    {#each $lines as [_, pathData] (pathData)}
      <path d={pathData} in:pathLength out:pathLength />
    {/each}
  </svg>
</div>

<style>
  .token-lines {
    width: 100%;
    pointer-events: none;

    & > svg {
      position: absolute;
      overflow: visible;
    }
  }

  .masks {
    z-index: 2;
  }
  .lines {
    z-index: -1;
  }

  path {
    stroke: var(--accent-1);
    fill: none;
    filter: drop-shadow(0px 0px 1px var(--accent-1));
  }

  polygon {
    fill: var(--background);
    z-index: 1;
  }
</style>
