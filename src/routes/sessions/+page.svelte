<script lang="ts">
	import Session from "$lib/components/Session.svelte";
    export let data;

    const { attendanceInfo, hours } = data;
    const { tHour01, tHour02, tHour03, tHour04 } = hours
	let a01 = attendanceInfo?.first_hour_attendance;
	let a02 = attendanceInfo?.second_hour_attendance;
	let a03 = attendanceInfo?.third_hour_attendance;
	let a04 = attendanceInfo?.fourth_hour_attendance;
</script>
<section>
    <h3>Display</h3>
    <div>
        <a href="/sessions/display" target="_blank">
            <div>
                <h4>Countdown Timer</h4>
                <p>Open</p>
            </div>
        </a>
    </div>
    <br>
    <h3>Sessions</h3>
    <div>
        <a href="/sessions/01">
            <span>
                <h5>First Hour</h5>
                <p>Edit Details.</p>
            </span>
            <Session attendance={a01} start={tHour01}></Session>
        </a>
        <a href="/sessions/02">
            <span>
                <h5>Second Hour</h5>
                <p>Edit Details.</p>
            </span>
            <Session attendance={a02} start={tHour02}></Session>
        </a>
        <a href="/sessions/03">
            <span>
                <h5>Third Hour</h5>
                <p>Edit Details.</p>
            </span>
            <Session attendance={a03} start={tHour03}></Session>
        </a>
        <a href="/sessions/04">
            <span>
                <h5>Fourth Hour</h5>
                <p>Edit Details.</p>
            </span>
            <Session attendance={a04} start={tHour04}></Session>
        </a>
    </div>
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