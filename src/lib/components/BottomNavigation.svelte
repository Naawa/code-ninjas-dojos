<script lang="ts">
	import { page } from "$app/stores";
	import { getRouteName, routes } from "$lib/utils/routes";
</script>


<span>
    {#each routes as route}
        <a class:active={$page.url.pathname == "/" + route} href="/{route}">{getRouteName(route)}</a>
    {/each}
</span>

<style lang="scss">
    span {
        display: flex;
        outline-width: 100%;
        flex-direction: row;
        border-radius: 1em;
        padding: 1em;
        gap: 2em;
        align-items: center;
        background: url('../../../background/DashboardBg.png');
        background-size: 100% 100%;
        min-height: fit-content;
        height: 20dvh;
        max-height: 10dvh;
        overflow: scroll;

        a {
            text-decoration: none;
            font-size: 1.2em;
            padding: 1em 2em;
            border-radius: 0.5em;
            width: 100%;
            text-align: center;
        }
    } 

    @media (width > 800px) {
        span {
            display: none;
        }
    }

    .active {
        background-color: whitesmoke;
    }
</style>