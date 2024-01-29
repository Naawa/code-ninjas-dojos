<script lang="ts">
	import { goto } from "$app/navigation";
    import { twelveHourFormat } from "$lib/utils/timeFormat";
    export let data;
    const { supabase, session } = data;

    let today = new Date().toLocaleDateString()
    let students: string[] = ["Nawaz", "Dennis"];
    let file: string;
    let timeInput: string = "15:30";

    let message: string;

    async function updateSession(timeInput: string, students: string[]) {
        let hours: number = parseInt(timeInput.charAt(0) + timeInput.charAt(1));
        let minutes: number = parseInt(timeInput.charAt(3) + timeInput.charAt(4));
        let date: Date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);

        if(date < new Date()) {
            message = "Time has passed."
        }
        else {
            const { data, error } = await supabase.from('sessions')
            .update({ date: `${date.toISOString()}`, students: `{${students}}` })
            .eq('center_admin', `${session?.user.id}`)
            .select()
            goto("/sessions")
        }
    }
</script>

<section>
    <div>
        <h4>Update Session <br>{today}</h4>
        <p>
        {#if message}
            {message}
        {/if}
        </p>
        <span>
            <input type="time" bind:value={timeInput}>
        </span>
        <span>
            <label>
                <input type="file" bind:value={file}/>
                Students Attending
            </label>
        </span>
    </div>
    <button on:click={() => updateSession(timeInput, students)}>Update Session</button>
    <p><strong>Session</strong> will be scheduled for <strong>one hour</strong> after start time.</p>
</section>

<style lang="scss">
    section {
        margin: auto;
        min-width: 40dvw;
        font-size: larger;
        gap: 3em;
        text-align: center;
        min-height: 100dvh;

        div {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 1em;

            p {
                height: 2em;
            }

            span {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1em;
                width: 100%;

                strong {
                    border-bottom: solid 2px rgb(59, 59, 59);
                    padding: 1em;
                    width: 8em;
                    text-align: center;
                }

                input, label{
                    min-width: 10em;
                    width: 10em;
                    font: inherit;
                }
                input[type="file"] {
                    display: none;
                }
                label {
                    background-color: transparent;
                    color: #030303;
                    text-align: center;
                    border: none;
                    border-radius: 0.5em;
                    border: solid 0.1em #d5d5d5;
                    width: 12em;
                    padding: 1em;

                    &:hover {
                        background-color: #303030;
                        color: white;
                    }
                }
            }
        }
        button {
            min-width: 16em;
            width: 16em;
        }
    }
    
</style>
