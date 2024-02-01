<script lang="ts">
	import { fly } from "svelte/transition";
    
    export let ninjas: any;
    export let color: string;
    export let backgroundColor: string;

    

</script>

<style lang="scss">
    section {
        padding: 4em 0 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 2em;
        max-height: 100%;
        width: fit-content;

        div {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 2em;
            width: 14dvw;
            min-width: 16em;
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
</style>

<section>
    {#each ninjas as ninja, index}
        <div in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }} style="background-color: {backgroundColor}">
            <span></span>
            <h5 style="color: {color};">{ninja.at(0).nickname}</h5>
        </div>
    {/each}
    {#each ninjas as ninja, index}
        <div in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }} style="background-color: {backgroundColor}">
            <span></span>
            <h5 style="color: {color};">{ninja.at(0).nickname}</h5>
        </div>
    {/each}
    {#each ninjas as ninja, index}
        <div in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }} style="background-color: {backgroundColor}">
            <span></span>
            <h5 style="color: {color};">{ninja.at(0).nickname}</h5>
        </div>
    {/each}
    {#each ninjas as ninja, index}
        <div in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }} style="background-color: {backgroundColor}">
            <span></span>
            <h5 style="color: {color};">{ninja.at(0).nickname}</h5>
        </div>
    {/each}
    {#each ninjas as ninja, index}
        <div in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }} style="background-color: {backgroundColor}">
            <span></span>
            <h5 style="color: {color};">{ninja.at(0).nickname}</h5>
        </div>
    {/each}
    {#each ninjas as ninja, index}
        <div in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }} style="background-color: {backgroundColor}">
            <span></span>
            <h5 style="color: {color};">{ninja.at(0).nickname}</h5>
        </div>
    {/each}\

    
</section>