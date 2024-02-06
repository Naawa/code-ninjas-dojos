<script lang="ts">
	import { goto } from "$app/navigation";
    
    export let data;
    let { supabase, session, students, attendance } = data
    students = students.data;
    export let start: Date;
    export let hour: number;

    let scheduled = attendance.hourly.at(hour - 1).scheduled as string[];
    let attending: string[] = attendance.hourly.at(hour - 1).attending as string[];

    let end = new Date(start);
    end.setHours(start.getHours() + 1)

    let studentNames: string[] = [];
    let filtered: string[] = [];
    let key: string = "";

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
        }
    }

    
    function remove(name: string) {
        if(scheduled.includes(name)) {
            scheduled.splice(scheduled.indexOf(name), 1);
            scheduled.sort();
            scheduled = scheduled;
        }
    }

    function confirm(name: string) {
        if(!attending.includes(name)) {
            attending.push(name);
            attending.sort();
            attending = attending;
            remove(name);
        }
    }

    function cancel(name: string) {
        if(attending.includes(name)) {
            attending.splice(scheduled.indexOf(name), 1);
            attending.sort();
            attending = attending;
            add(name);
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

    async function updateAttendance(scheduled: string[], attending: string[]) {
        let hourly = attendance.hourly;
        hourly.at(hour - 1).scheduled = scheduled;
        const { data, error } = await supabase
        .from('attendance')
        .update({ hourly: hourly })
        .eq('center_admin', `${session?.user.id}`)
        .select()
        updateAttending(attending);
        goto("/attendance")
    }


    async function updateAttending(attending: string[]) {
        let hourly = attendance.hourly;
        hourly.at(hour - 1).attending = attending;
        const { data, error } = await supabase
        .from('attendance')
        .update({ hourly: hourly })
        .eq('center_admin', `${session?.user.id}`)
        .select()
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
        <h4>Scheduled</h4>
        <div>
            {#each scheduled as attendee}
                <span>
                    <strong>
                        {attendee}
                    </strong>
                    <span>
                        <button id="add" on:click={() => confirm(attendee)}></button>
                        <button id="remove" on:click={() => remove(attendee)}></button>
                    </span>
                </span>
            {/each}
        </div>
    </div>
    <div>
        <h4>Attending</h4>
        <div>
            {#each attending as attendee}
                <span>
                    <strong>
                        {attendee}
                    </strong>
                    <button id="remove" on:click={() => cancel(attendee)}></button>
                </span>
            {/each}
        </div>
    </div>
    <button on:click={() => updateAttendance(scheduled, attending)}>Update Session</button>
</section>

<style lang="scss">
    section {
        span {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2em;
            width: 80dvw;
            min-width: 240px;
            min-height: 48px;
            max-width: 400px;
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
            min-width: 20em;
            width: 80dvw;
            min-width: 240px;
            min-height: 48px;
            max-width: 400px;

            input {
                width: 100%;
            }

            div {
                border: none;
                    width: 100%;
                span {
                    min-width: 40%;
                    width: 40%;
                    justify-content: space-between;

                    button, #add {
                        min-width: 1em;
                        width: 1em;
                        height: 1em;
                        min-height: 1em;
                        padding: 1em;
                        border-radius: 100%;
                        border: none;
                        background-color: rgb(215, 255, 207);

                        &:hover {
                            background-color: rgb(172, 255, 172);
                        }
                    }
                    #remove {
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
