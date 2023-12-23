<script lang="ts">
    import { letters, selected } from "../lib/store"
    import type { BankObject } from "../lib/types"

    const handleSelect = (tile: BankObject) => {
        if (!$selected) {
            selected.set(tile)
        } else if ($selected.id === tile.id) {
            selected.set(null)
        } else {
            selected.set(tile)
        }
    }
</script>

<div class="area">
    <div class="cont">
        {#each $letters as letter}
            <button
                class="tile"
                on:click={() => handleSelect(letter)}
                class:selected={$selected ? $selected.id === letter.id : false}
                >{letter.value}</button
            >
        {/each}
    </div>
</div>

<style>
    .area {
        width: 100%;
        aspect-ratio: 5/3;
        background-color: #f8f5ef;
        border-top: 1px solid rgba(0, 0, 0, 0.05);
    }
    .cont {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 0.5rem;
        width: calc(100% - 1rem);

        padding: 0.5rem;
        max-height: 17rem;
        max-width: 40rem;
    }
    .tile {
        all: unset;
        width: 100%;
        aspect-ratio: 1/1;
        border-radius: 0.75rem;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 25px;
        font-weight: bold;
        font-family: monospace;
        box-sizing: border-box;
        border: 0px solid #e38156;
        transition: border 0.1s;
    }
    .selected {
        border: 4px solid #e38156;
    }
</style>
