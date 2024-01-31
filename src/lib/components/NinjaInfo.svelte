<script lang="ts">
	import { fly } from "svelte/transition";

    export let ninjas: any;
    export let color: string;
    export let backgroundColor: string;

    let display: any[] = [];
    let i = 0;
    let max = 5;
    let ms = 5000;

    function displayNinjas() {
        display = [];
        for(i; i < max && i < ninjas.length; i++) {
            display.push(ninjas[i]);
        }
        if(max >= ninjas.length) {
            max = 5;
            i = 0;
        }
        else {
            max += 5;
        }
        display = display;
    }
    displayNinjas();
    //setInterval(displayNinjas, ms);

</script>

<style lang="scss">
    section {
        position: relative;
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 20% 20% 20% 20% 20%;
        place-items: center;
        height: 10em;
        width: 90dvw;
        padding: 0;
        gap: 0;

        div {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 2em;
            width: 16em;
            padding: 1em;
            backdrop-filter: blur(40px);
            border-radius: 16px;
            background-image: url("../../../Nameplate2.jpg");
            background-repeat: no-repeat;
            background-size: 100% 100%;

        }

        span {
            height: 2.5em;
            width: 2.5em;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: larger;
            background-image: url("../../../Icon2.png");
            scale: 1.6;
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }

        h5 {
            text-align: center;
        }
    }

    @media (width < 1200px) {
        section {
            padding: 0;
            display: grid;
            grid-auto-flow: column;
            grid-template-rows: 20% 20% 20% 20% 20%;
            grid-template-columns: 1fr;
            place-items: center;
            height: 36em;
            width: 16em;
        }
    }
</style>

<section>
    {#key display}
        {#each display as ninja, index}
            <div in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }} style="background-color: {backgroundColor}">
                <span></span>
                <h5 style="color: {color};">{ninja.at(0).nickname}</h5>
            </div>
        {/each}
    {/key}
</section>