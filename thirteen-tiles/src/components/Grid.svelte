<script lang="ts">
    import { tweened } from "svelte/motion"
    import { tiles } from "../lib/store"
    import { cubicInOut } from "svelte/easing"
    import { getArea, scale } from "../lib/helpers"

    const MAX_WIDTH = 21
    const OFFSET = Math.floor(MAX_WIDTH / 2)

    const area = tweened(
        [...getArea({ topLeft: { x: 0, y: 0 }, bottomRight: { x: 1, y: 1 } })],
        {
            easing: cubicInOut,
            duration: 800,
        }
    )

    function addTile(x: number, y: number) {
        tiles.set([
            ...$tiles,
            {
                x: x,
                y: y,
                value: "p",
            },
        ])
    }

    $: boundingBox = {
        topLeft: {
            x: Math.min(...$tiles.map((t) => t.x)),
            y: Math.min(...$tiles.map((t) => t.y)),
        },
        bottomRight: {
            x: Math.max(...$tiles.map((t) => t.x)) + 1,
            y: Math.max(...$tiles.map((t) => t.y)) + 1,
        },
    }

    $: area.set(getArea(boundingBox))
</script>

<div class="container">
    <svg class="grid-canvas" viewBox={$area}>
        {#each Array(MAX_WIDTH) as _, x}
            {#each Array(MAX_WIDTH) as _, y}
                <rect
                    x={scale(x - OFFSET + 0.05)}
                    y={scale(y - OFFSET + 0.05)}
                    height={scale(0.9)}
                    width={scale(0.9)}
                    fill={$tiles.filter(
                        (t) => t.x === x - OFFSET && t.y === y - OFFSET
                    ).length > 0
                        ? "rgba(0, 0, 0, 0.1)"
                        : "rgba(0, 0, 0, 0)"}
                    on:click={() => addTile(x - OFFSET, y - OFFSET)}
                />
                {#if $tiles.filter((t) => t.x === x - OFFSET && t.y === y - OFFSET).length > 0}
                    <text
                        x={scale(x - OFFSET + 0.5)}
                        y={scale(y - OFFSET + 0.62)}
                        font-size="4"
                        text-anchor="middle">{"E"}</text
                    >
                {/if}
            {/each}
        {/each}
        <!-- <rect
            fill="none"
            stroke="red"
            stroke-width="1"
            x={scale(boundingBox.topLeft.x)}
            y={scale(boundingBox.topLeft.y)}
            width={scale(boundingBox.bottomRight.x - boundingBox.topLeft.x)}
            height={scale(boundingBox.bottomRight.y - boundingBox.topLeft.y)}
        /> -->
    </svg>
</div>

<style>
    .container {
        position: relative;
        overflow: hidden;
        flex: auto;
    }
    .grid-canvas {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
