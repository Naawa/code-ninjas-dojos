<script lang="ts">
    export let startTime: Date;
    let endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1);

    let now = new Date();
    let distance = endTime.getTime() - now.getTime();

    let minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let countdown: any;

   $: if(!(startTime.getHours() > (now.getHours() + 1))) {
        countdown = setInterval(() => {
            now = new Date();
            distance = endTime.getTime() - now.getTime();
            minute = (Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            seconds = (Math.floor((distance % (1000 * 60)) / 1000));
            countdown = clearInterval(countdown)
        }, 1000)
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

    export let backgroundColor = "#0E2937";
    export let color = "#FFCF46";
    export let block: string;
    export let shade = "#e6a800";

    console.log(distance)
</script>

<style lang="scss">
    span {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 3em;
        border-radius: 2em;
        min-width: fit-content;
        width: 40dvw;
        max-height: 20dvh;

        div {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: baseline;
            gap: 4em;


            p {
                font-size: xx-large;
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
</style>

<span style="background-color: {backgroundColor};">
    <h3 style="color: {color};">{block}</h3>
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