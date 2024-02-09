<script lang="ts">
	import { exploration, homeTime, theme, training, typing, waterBreak } from "$lib/stores/theme";

    export let startTime: Date;
    let endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1);
    let now = new Date();
    let distance = endTime.getTime() - now.getTime();
    let minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let block: string = ""
    block = "Typing!";
    theme.set(typing);
    

    let countdown: any;

   $: if(now.getTime() > startTime.getTime()) {
        countdown = setInterval(() => {
            now = new Date();
            distance = endTime.getTime() - now.getTime();
            minute = (Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            seconds = (Math.floor((distance % (1000 * 60)) / 1000));
            countdown = clearInterval(countdown);
        }, 1000)

        if(minute < 50 && minute > 30) {
            block = "Ninja Training!";
            theme.set(training);
        }
        if(minute < 30 && minute > 25) {
            block = "Water Break!"
            theme.set(waterBreak);
        }
        if(minute < 25 && minute > 10) {
            block = "Ninja Training!"
            theme.set(training);
        }
        if(minute < 10 && minute > 0) {
            block = "Ninja Exploration!"
            theme.set(exploration);
        }
        if(minute == 0) {
            block = "Home Time!"
            theme.set(homeTime);
        }
    } 
    else {
        minute = 59;
        seconds = 59;
        block = "Class will start soon."
    }
    
    $: if(distance <= 0) {
        countdown = clearInterval(countdown);
        minute = 59;
        seconds = 59;
        block = "Come back tomorrow.";
    }
</script>

<style lang="scss">
    span {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-width: fit-content;
        position: relative;
        margin: 0;
        min-width: fit-content;
        width: 90dvw;
        max-width: 500px;
        height: 20dvh;
        border-radius: 1em;

        h3 {
            z-index: 0;
            color: currentColor;
        }

        div {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: baseline;
            gap: 4em;
            width: 100%;

            p {
                font-size: xx-large;
                font-weight: 800;
            }

            span {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: baseline;
                flex-direction: row;
                gap: 1em;
                padding: 0;
                min-width: fit-content;
                min-height: fit-content;
                width: fit-content;
                height: fit-content;
                background-image: none;
                background-color: transparent;
                border: none;
                box-shadow: none;
            }
        }
    }

</style>

<span style="background-color: {$theme.bgCol};">
    <h3 style="color: {$theme.textCol};">{block}</h3>
    <div>
        <span>
            <h1 style="color: {$theme.textCol};">{minute}</h1>
            <p style="color: {$theme.textShade};">Min</p>
        </span>
        <span>
            <h1 style="color: {$theme.textCol};">{seconds}</h1>
            <p style="color: {$theme.textShade};">Sec</p>
        </span>
    </div>
</span>