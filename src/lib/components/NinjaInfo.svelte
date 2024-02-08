<script lang="ts">
	import { theme } from "$lib/stores/theme";
	import { fly } from "svelte/transition";
    
    let bgCol = $theme.bgCol;
    let textCol = $theme.textCol;

    export let ninjas: any;
</script>

<style lang="scss">
    section {
        padding: 1em;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 1.5dvw;
        min-height: fit-content;
        max-height: 80dvh;
        width: fit-content;
        position: relative;
        overflow: scroll;
    
        div {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding-left: 2em;
            gap: 2em;
            width: 20em;
            height: 6em;
            backdrop-filter: blur(3px);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-color: rgba(255, 255, 255, 255);
            border-radius: 1em;
        }


        img {
            height: 2.25em;
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: larger;
            scale: 1.8;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100%;
            transform: translateY(4%);
            filter: hue-rotate(100deg);
        }

        h3 {
            text-align: center;
            color: currentColor;
            font-size: 1.54em;
        }
    }
</style>

<section>
    {#each ninjas as ninja, index}
        <div style="background-color: {bgCol};" in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }}>
            <img src="../../../belts/{ninja.at(0).belt}.png" alt="Icon.">
            <h3 style="color: {textCol};">{ninja.at(0).name}</h3>
        </div>
    {/each}
</section>