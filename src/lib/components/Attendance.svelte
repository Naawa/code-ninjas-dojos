<script lang="ts">
	import { goto, invalidate } from "$app/navigation";
	import { ninjas } from "$lib/stores/ninjas";
	import { studentListFormat } from "$lib/utils/studentListFormat";
    
    
    export let data;
    let { supabase, session, students, attendance } = data
    students = students.data;
    export let start: Date;
    export let hour: number;

    let scheduled = attendance.hourly.at(hour - 1).scheduled as string[];

    let end = new Date(start);
    end.setHours(start.getHours() + 1)

    let studentNames: string[] = [];
    let filtered: string[] = [];
    let key: string = "";
    let files: FileList;

    if(students) {
        for(let i = 0; i < students?.length; i++) {
            studentNames.push(students[i].name);
        }
    }

    function add(name: string) {
        if(!scheduled.includes(name)) {
            scheduled.push(name);
            scheduled.sort();
            scheduled = scheduled;
            ninjas.set(scheduled);
        }
    }

    
    function remove(name: string) {
        if(scheduled.includes(name)) {
            scheduled.splice(scheduled.indexOf(name), 1);
            scheduled.sort();
            scheduled = scheduled;
            ninjas.set(scheduled);
        }
    }

    function search(key: string) {
        if(key.length > 0) {
            filtered = studentNames.filter(list => list.includes(key));
        }
        else {
            filtered = [];
        }
    }

    async function updateAttendance(scheduled: string[]) {
        let hourly = attendance.hourly;
        hourly.at(hour - 1).scheduled = scheduled;
        const { data, error } = await supabase
        .from('attendance')
        .update({ hourly: hourly })
        .eq('center_admin', `${session?.user.id}`)
        .select()
        goto("/attendance")
    }

    $: if (files) {
        for (const file of files) {
            bulkAdd(file)
        }
    }

    async function bulkAdd(file: any) {
        const data = await file.text()
        let formatedStudents = await studentListFormat(data);
        for(let i = 0; i < formatedStudents.length; i++) {
            add(formatedStudents[i]);
        }
    }

    function clear() {
        scheduled = [];
        updateAttendance(scheduled);
        goto("/attendance")
    }

</script>

<section>
    <span>
        <h3>{start.toLocaleString([], {hour: 'numeric', minute: '2-digit'})
        }</h3>
        <h3>-</h3>
        <h3>{end.toLocaleString([], {hour: 'numeric', minute: '2-digit'})
        }</h3>
    </span>
    <div>
        <h4>Students</h4>
        <input type="text" bind:value={key} on:keydown={() => search(key)} placeholder="Search">
        <div>
            {#each filtered as item}
                <span>
                    <strong>
                        {item}
                    </strong>
                    <button id="add" on:click={() => add(item)}></button>
                </span>
            {/each}
        </div>
    </div>
    <div>
        <h4>{scheduled.length} Scheduled</h4>
        <div>
            {#each scheduled as attendee, i}
                <span>
                    <strong>
                        {i+ 1}. {attendee}
                    </strong>
                    <span>
                        <button id="remove" on:click={() => remove(attendee)}></button>
                    </span>
                </span>
            {/each}
        </div>
        <div>
            <label>
                <input type="file" bind:files accept=".csv">
                + CSV
            </label>
        </div>
        <div>
            <button on:click={clear}>Clear</button>
        </div>
    </div>
    <button on:click={() => updateAttendance(scheduled)}>Update Session</button>
</section>

<style lang="scss">
    section {
        height: 100%;
        overflow: scroll;
        span {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2em;
            width: 100%;
        }
        div {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 1em;
            gap: 1em;
            border: solid 0.1em #d5d5d5;
            border-radius: 10px;
            width: 90%;
            background-color: white;


            input {
                width: 100%;
            }

            input[type="file"] {
                display: none;
            }

            div {
                border: none;
                width: 100%;
                max-height: 20em;
                overflow-y: scroll;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                gap: 2em;

                button {
                    background-color: transparent;
                    color: currentColor;
                    width: 100%;

                    &:hover {
                        background-color: #303030;
                        color: white;
                    }
                }

                span {
                    min-width: 70%;
                    width: 70%;
                    justify-content: space-between;
                    padding: 0 2em;
                    display: flex;

                    span {
                        min-width: fit-content;
                        width: fit-content;
                        padding: 0;
                    }

                    button {
                        min-width: 1em;
                        width: 1em;
                        height: 1em;
                        min-height: 1em;
                        padding: 1em;
                        border-radius: 100%;
                        border: none;
                        background-color: rgb(255, 207, 207);
                        &:hover {
                            background-color: rgb(255, 172, 172);
                        }
                    }
                }
            }
        }
    }
</style>
