<script lang="ts">
	import { goto, invalidate } from "$app/navigation";
    export let data;
    const { supabase, session, students, attendanceInfo} = data;

    let attendance: any = attendanceInfo?.second_hour_attendance || [];

    let file: string; 
    let studentNames: string[] = [];
    let filtered: string = "";

    if(students) {
        for(let i = 0; i < students?.length; i++) {
            studentNames.push(students[i].nickname);
        }
    }

    let key: string = "";

    function add(name: string) {
        if(!attendance.includes(name)) {
            attendance.push(name);
            attendance.sort();
            attendance = attendance;
        }
    }
    function remove(name: string) {
        if(attendance.includes(name)) {
            attendance.splice(attendance.indexOf(name), 1);
            attendance.sort();
            attendance = attendance;
        }
    }

    function search(key: string) {
        filtered = studentNames[studentNames.indexOf(key)];
    }

    async function updateHour(attendance: string[]) {
        const { data, error } = await supabase
        .from('sessions')
        .update({ second_hour_attendance: `{${attendance}}` })
        .eq('center_admin', `${session?.user.id}`)
        .select()
        invalidate('/sessions/display');
        goto("/sessions");
    }

</script>

<section>
    <div>
        <div>
            <h3>Edit Hour</h3>
            <span>
                <strong>4:30 PM</strong>
                <p>-</p>
                <strong>5:30 PM</strong>
            </span>
        </div>
        <div>
            <h4>Attendance</h4>
            <span>
                <label>
                    <input type="file" bind:value={file}/>
                    Drop CSV
                </label>
            </span>
            <span>
                <input bind:value={key} type="text" placeholder="Search Student" on:keypress={() => search(key)}>
            </span>
            <span>
                {#if filtered}
                    <button id="add-student" on:click={() => add(filtered)}>Add {filtered}</button>
                {/if}
            </span>
            <span>
                <div>
                    <label>
                        <strong><u>Students Attending</u></strong>
                        {#if attendance}
                            {#each attendance as attendee}
                                <span id="atdn-container">
                                    <p>{attendee}</p>
                                    <button id="rmv-student" on:click={() => remove(attendee)}>
                                    </button>
                                </span>
                            {/each}
                        {/if}
                    </label>
                </div>
            </span>
        </div>
    </div>
    <button on:click={() => updateHour(attendance)}>Update Session</button>
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
            gap: 3em;
            width: 100%;

            div {
                gap: 1em;
            }

            span {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1em;
                width: 100%;

                input {
                    min-width: 10em;
                    width: 10em;
                    font: inherit;
                }
                input[type="file"] {
                    display: none;
                }
            }
        }
        button {
            min-width: 16em;
            width: 16em;
        }
    }

    label {
        border: solid 0.1em #d5d5d5;
        padding: 1em;
        border-radius: 10px;
        min-width: 225px;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
        max-height: 200px;
    }

    #atdn-container {
        display: flex;
        justify-content: space-between;
        width: 125px;
    }

    #add-student {
        min-width: fit-content;
        width: fit-content;
        background-color: transparent;
        color: #030303;
    }
    #rmv-student {
        min-width: fit-content;
        width: fit-content;
        background-color: rgb(255, 200, 200);
        color: #030303;
        height: min-content;
        min-height: min-content;
        min-width: min-content;
        width: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        font-weight: lighter;
        border-radius: 100%;
        scale: 0.6;

        &:hover {
            background-color: rgb(255, 132, 132);
        }
    }
</style>
