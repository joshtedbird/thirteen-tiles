<script lang="ts">
    import Grid from "./components/Grid.svelte"
    import { tiles } from "./lib/store"
</script>

<main>
    <div class="wrapper">
        <Grid />
        <div class="tile-bar"></div>
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
    .tile-bar {
        height: 15rem;
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 1rem 1rem 1rem 0rem;
        background-color: #f8f5ef;
        border-top: 1px solid rgba(0, 0, 0, 0.05);
    }
</style>
