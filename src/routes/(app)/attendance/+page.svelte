<script lang="ts">
	import SessionInfo from "$lib/components/AttendanceCard.svelte";
    export let data;
    
    const { attendance } = data;
    const hourly = attendance.hourly;

    let first = new Date()
    let second = new Date()
    let third = new Date()
    let fourth = new Date()
    
    if(first.getDay() != 6) {
        first.setHours(15);
        first.setMinutes(30);
        second.setHours(16);
        second.setMinutes(30);
        third.setHours(17);
        third.setMinutes(30);
        fourth.setHours(18);
        fourth.setMinutes(30);
    }
    else {
        first.setHours(10);
        first.setMinutes(0);
        second.setHours(11);
        second.setMinutes(0);
        third.setHours(12);
        third.setMinutes(0);
        fourth.setHours(13);
        fourth.setMinutes(0);
    }

    interface Hour {
        name: string,
        time: Date
    }

    const hours: Hour[] = [];
    hours.push({name: "First", time: first}, {name: "Second", time: second}, {name: "Third", time: third}, {name: "Fourth", time: fourth});
</script>

<section>
    <h3>Display</h3>
    <span>
        <a href="/display" target="_blank">
            <div>
                <h4>Current Hour</h4>
                <p>Open</p>
            </div>
        </a>
    </span>
    <br>
    <h3>Sessions</h3>
    <span>
        {#if hourly}
            {#each hourly as info, i}
            <a href="/attendance/hours/{hours[i].name.toLowerCase()}">
                <span>
                    <h5>{hours[i].name} Hour</h5>
                    <p>Edit Details</p>
                </span>
                <SessionInfo headCount={info.scheduled.length} start={hours[i].time}></SessionInfo>
            </a>
            {/each}
        {/if}
    </span>
    
</section>

<style lang="scss">
    section {
       overflow: scroll;
       display: flex;
       align-items: center;
       
        span {
            display: flex;
            align-items: normal;
            justify-content: space-between;
            gap: 1em;
            flex-wrap: wrap;
            width: 100%;
        
            a {
                border-radius: 0.5em;
                border: solid 0.1em #d5d5d5;
                display: flex;
                align-items: center;
                flex-direction: column;
                gap: 1em;
                padding: 1em 2em;
                height: fit-content;
                width: 100%;
                justify-content: center;
                text-decoration: none;
                background-color: white;

                div {
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                }
            }
        }
    }
</style>