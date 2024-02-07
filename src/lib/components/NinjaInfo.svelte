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
        gap: 1.5dvw;
        min-height: fit-content;
        max-height: 80dvh;
        width: fit-content;
        position: absolute;
        top: 25dvh;
        overflow: scroll;
    
        div {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding-left: 3em;
            gap: 2em;
            width: 15dvw;
            height: 6em;
            backdrop-filter: blur(3px);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-color: rgba(255, 255, 255, 255);
            box-shadow: 0 0 10px 2px rgb(255, 255, 255);
            border-radius: 2px;
        }

        span {
            height: 2.25em;
            width: 2.25em;
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: larger;
            //background-image: url("../../../Icon2.png");
            scale: 1.2;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-color: aqua;
            background: rgb(69,252,188);
            background: linear-gradient(0deg, rgb(163, 255, 223) 0%, rgb(139, 255, 245) 44%);
            border: solid 4px currentColor;
        }

        h3 {
            text-align: center;
            color: currentColor;
            font-size: 1.25em;
        }
    }
</style>

<section>
    {#each ninjas as ninja, index}
        <div in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }}>
            <span></span>
            <h3>{ninja.at(0).name}</h3>
        </div>
        <div in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }}>
            <span></span>
            <h3>{ninja.at(0).name}</h3>
        </div>
        <div in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }}>
            <span></span>
            <h3>{ninja.at(0).name}</h3>
        </div>
        <div in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }}>
            <span></span>
            <h3>{ninja.at(0).name}</h3>
        </div>
        <div in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }}>
            <span></span>
            <h3>{ninja.at(0).name}</h3>
        </div>
        <div in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }}>
            <span></span>
            <h3>{ninja.at(0).name}</h3>
        </div>
        <div in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }}>
            <span></span>
            <h3>{ninja.at(0).name}</h3>
        </div>
        <div in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }}>
            <span></span>
            <h3>{ninja.at(0).name}</h3>
        </div>
        <div in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }}>
            <span></span>
            <h3>{ninja.at(0).name}</h3>
        </div>
        <div in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }}>
            <span></span>
            <h3>{ninja.at(0).name}</h3>
        </div>
        <div in:fly|global={{ y: 25, duration: index*400, delay: 1200 }} out:fly|global={{ y: 25, duration: 400 }}>
            <span></span>
            <h3>{ninja.at(0).name}</h3>
        </div>
    {/each}
</section>