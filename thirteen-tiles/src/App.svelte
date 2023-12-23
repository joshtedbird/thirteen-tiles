<script lang="ts">
    import Grid from "./components/Grid.svelte"
    import TileBank from "./components/TileBank.svelte"
</script>

<main>
    <div class="wrapper">
        <Grid />
        <TileBank />
    </div>
</main>

<style>
    .wrapper {
        width: 100vw;
        height: 100vh;
        background-color: #f4f0e6;
        display: flex;
        flex-direction: column;
    }
</style>
