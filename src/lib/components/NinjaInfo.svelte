<script lang="ts">
	import { fly } from "svelte/transition";
    
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
        gap: 2em;
        min-height: 40dvh;
        max-height: 80dvh;
        width: fit-content;
        position: absolute;
        top: 25dvh;
        overflow: scroll;

        div {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 2em;
            width: 14dvw;
            min-width: 20em;
            min-height: 6em;
            padding: 0 3em;
            backdrop-filter: blur(3px);
            //background-image: url("../../../Nameplate2.jpg");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-color: rgba(255, 255, 255, 255);
            box-shadow: 0 0 10px 2px rgb(255, 255, 255);
        }

        span {
            height: 2.5em;
            width: 2.5em;
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: larger;
            //background-image: url("../../../Icon2.png");
            scale: 1.2;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            //background-color: aqua;
            //background: rgb(69,252,188);
            //background: linear-gradient(0deg, rgb(163, 255, 223) 0%, rgb(139, 255, 245) 44%);
            border: solid 4px currentColor;
        }

        h3 {
            text-align: center;
            color: currentColor;
        }
    }
</style>

<section>
    {#each ninjas as ninja, index}
        <div in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }}>
            <span style="background-color: {ninja.at(index).belt};"></span>
            <h3>{ninja.at(index).name}</h3>
        </div>
    {/each}
</section>