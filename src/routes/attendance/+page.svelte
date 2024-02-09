<script lang="ts">
	import SessionInfo from "$lib/components/AttendanceCard.svelte";
    export let data;
    
    const { attendance } = data;
    const hourly = attendance.hourly;

    let first = new Date()
    first.setHours(15);
    first.setMinutes(30);
    
    let second = new Date()
    second.setHours(16);
    second.setMinutes(30);

    let third = new Date()
    third.setHours(17);
    third.setMinutes(30);

    let fourth = new Date()
    fourth.setHours(18);
    fourth.setMinutes(30);

    interface Hour {
        name: string,
        time: Date
    }

    const hours: Hour[] = [];
    hours.push({name: "First", time: first}, {name: "Second", time: second}, {name: "Third", time: third}, {name: "Fourth", time: fourth});
</script>
<section>
    <h3>Display</h3>
    <div>
        <a href="/attendance/display" target="_blank">
            <div>
                <h4>Current Hour</h4>
                <p>Open</p>
            </div>
        </a>
    </div>
    <br>
    <h3>Sessions</h3>
    {#if hourly}
        {#each hourly as info, i}
            <div>
                <a href="/attendance/hours/{hours[i].name.toLowerCase()}">
                    <span>
                        <h5>{hours[i].name} Hour</h5>
                        <p>Edit Details</p>
                    </span>
                    <SessionInfo headCount={info.scheduled.length} start={hours[i].time}></SessionInfo>
                </a>
            </div>
        {/each}
        
    {/if}
</section>

<style lang="scss">
    section {
        min-height: 100dvh;
        div {
            display: flex;
            justify-content: center;
            flex-direction: column;
            width: 90dvw;
            max-width: 800px;
            gap: 2em;

            div, span {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 100%;
                align-items: center;

                span {
                    width: fit-content;
                    gap: 0.5em;
                }
            }

            a {
                display: flex;
                flex-direction: column;
                border-radius: 0.5em;
                border: solid 0.1em #d5d5d5;
                padding: 1em;
                gap: 1em;
                text-decoration: none;
            }
        }
    }
</style>