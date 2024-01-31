<script lang="ts">
	import { fly } from "svelte/transition";

    export let startTime: Date;
    let endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1);

    let now = new Date();
    let distance = endTime.getTime() - now.getTime();

    let minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let countdown: any;

   $: if(startTime.getTime() > now.getTime()) {
        setInterval(() => {
            now = new Date();
            distance = endTime.getTime() - now.getTime();
            minute = (Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            seconds = (Math.floor((distance % (1000 * 60)) / 1000));
            clearInterval(countdown)
        }, 1000)
    } else {
        minute = 59;
        seconds = 59;
    }
    
    $: if(distance <= 0) {
        clearInterval(countdown);
        minute = 0;
        seconds = 0;
    }

    export let backgroundColor = "#0E2937";
    export let color = "#FFCF46";
    export let block = "Shh... Ninjas are Typing!";
    export let shade = "#e6a800";

</script>

<style lang="scss">
    span {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2em;
        text-align: center;
        padding: 2em;
        border-radius: 2em;
        width: 60dvw;
        height: 40dvh;

        h2 {
            font-size: 3vw;
        }

        div {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: baseline;
            gap: 4em;


            h1 {
                font-size: 6vw;
            }

            p {
                font-size: 4dvw;
                font-weight: 800;
            }

            span {
                display: flex;
                justify-content: center;
                align-items: baseline;
                flex-direction: row;
                gap: 1em;
                padding: 0;
                width: fit-content;
                height: fit-content;
            }
        }
    }

    @media (width < 1200px) {
        span {
            width: 90%;
            height: fit-content;
            padding: 2em;

            span {
                padding: 0;
            }
        }
    }
</style>

<span in:fly|global={{ y: 25, duration: 800, delay: 800}} out:fly|global={{ y: 25, duration: 400 }} style="background-color: {backgroundColor};">
    <h2 style="color: {color};">{block}</h2>
    <div>
        <span>
            <h1 style="color: {color};">{minute}</h1>
            <p style="color: {shade};">Min</p>
        </span>
        <span>
            <h1 style="color: {color};">{seconds}</h1>
            <p style="color: {shade};">Sec</p>
        </span>
    </div>
</span>