<script lang="ts">
    import Grid from "./components/Grid.svelte"
    import TileBank from "./components/TileBank.svelte"
    import UtilBar from "./components/UtilBar.svelte"

    $: innerHeight = 0
</script>

<svelte:window bind:innerHeight />

<main>
    <div class="wrapper" style="--innerHeight:{innerHeight}">
        <Grid />
        <TileBank />
    </div>
</main>

<style>
    .wrapper {
        width: 100vw;
        height: calc(var(--innerHeight) * 1px);
        background-color: #f4f0e6;
        display: flex;
        flex-direction: column;
    }
</style>
