<script lang="ts">
	import { page } from "$app/stores";
	import { getRouteName, routes } from "$lib/utils/routes";
</script>


<span>
    {#each routes as route}
        <a class:active={$page.url.pathname.startsWith(`/${route}`)}  href="/{route}">{getRouteName(route)}</a>
    {/each}
</span>

<style lang="scss">
    span {
        display: flex;
        width: 100%;
        flex-direction: row;
        border-radius: 1em;
        padding: 1em;
        gap: 2em;
        align-items: center;
        background-color: white;
        background-size: 100% 100%;
        overflow: scroll;
        height: 10dvh;
        
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