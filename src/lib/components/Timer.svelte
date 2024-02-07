<script lang="ts">
    export let startTime: Date;
    let endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1);

    let now = new Date();
    let distance = endTime.getTime() - now.getTime();

    let minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let block: string = "Ninja Typing!"

    let countdown: any;

   $: if(!(startTime.getHours() > (now.getHours() + 1))) {
        countdown = setInterval(() => {
            now = new Date();
            distance = endTime.getTime() - now.getTime();
            minute = (Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            seconds = (Math.floor((distance % (1000 * 60)) / 1000));
            countdown = clearInterval(countdown)
        }, 1000)

        if(minute < 50 && minute > 30) {
            block = "Ninja Training!"
        }
        if(minute < 30 && minute > 25) {
            block = "Water Break!"
        }
        if(minute < 25 && minute > 10) {
            block = "Ninja Training!"
        }
        if(minute < 10 && minute > 0) {
            block = "Ninja Exploration!"
        }
        if(minute == 0) {
            block = "Home Time!"
        }
    } else {
        minute = 59;
        seconds = 59;
        block = "Class will start soon."
    }
    
    $: if(distance <= 0) {
        countdown = clearInterval(countdown);
        minute = 0;
        seconds = 0;
    }
</script>

<style lang="scss">
    span {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: transparent;
        min-width: fit-content;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 30dvh;

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
                width: fit-content;
                height: fit-content;
                background-image: none;
                background-color: transparent;
            }
        }

        .background {
            background-image: url("../../../lwh/lwh01.svg#svgView(preserveAspectRatio(none))");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            position: absolute;
            height: 60dvh;
            width: 100dvw;
            top: 0;
        }
    }

</style>

<span>
    <div class="background"></div>
    <h3>{block}</h3>
    <div>
        <span>
            <h1>{minute}</h1>
            <p>Min</p>
        </span>
        <span>
            <h1>{seconds}</h1>
            <p>Sec</p>
        </span>
    </div>
</span>