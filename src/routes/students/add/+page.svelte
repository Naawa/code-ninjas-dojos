<script lang="ts">
	import { goto } from '$app/navigation';
    import csv from "csvtojson";

    let files: FileList;
    let students: string[] = [];

    export let data;
    const { supabase, session } = data;

    let name: string;
    let belt: string;
    let points: number;

    async function addStudent() {
        const { data, error } = await supabase
        .from('students')
        .insert([
            { 
                name: `${name}`,  
                belt: `${belt}`,  
                points: `${points}`,  
                center_admin: `${session?.user.id}`,  
            },
        ])
        .select()
        goto("/students")
    }


    $: if (files) {
        for (const file of files) {
            viewStudents(file)
        }
    }
    
    async function viewStudents(file: any) {
        const data = await file.text()
        const jsonArray = await csv().fromString(data);
        for(let i = 0; i < jsonArray.length; i++) {
            let student: string = jsonArray.at(i).Participant.replace(/ .*/,'');
            let formated: string = "";
            for(let j = 0; j < student.length; j++) {
                if(j == 0) {
                    formated += student.charAt(j).toUpperCase();
                }
                else {
                    formated += student.charAt(j).toLowerCase();
                }
            }

            if(jsonArray.at(i).ParticipantLastName) {
                formated += " " + jsonArray.at(i).ParticipantLastName.charAt(0).toUpperCase() + jsonArray.at(i).ParticipantLastName.charAt(1).toLowerCase() + "."
            }

            if(!students.includes(formated)) {
                students.push(formated);
            }
        }
        students = students;
    }

    async function addStudents(students: string[]) {
        for(let i = 0; i < students.length; i++) {
            const { data, error } = await supabase
            .from('students')
            .insert([
                { 
                    name: `${students[i]}`,  
                    belt: "White",  
                    points: 10,  
                    center_admin: `${session?.user.id}`,  
                },
            ])
            .select()
            goto("/students");
        }
    }
</script>

<section>
    <h3>Single</h3>
    <div>
        <span>
            <strong>Name</strong>
            <input type="text" bind:value={name} placeholder="Jelly Bean">
        </span>
        <span>
            <strong>Belt</strong>
            <input type="text" bind:value={belt} placeholder="White">
        </span>
        <span>
            <strong>Points</strong>
            <input type="number" bind:value={points} placeholder="10">
        </span>
    </div>
    <button on:click={addStudent}>Add Student</button>
    <h3>Multiple</h3>
    <label>
        <input type="file" bind:files accept=".csv">
        + CSV
    </label>
    <h4>{students.length}</h4>
    <div>
        {#each students as student}
            <h4>{student}</h4>
        {/each}
    </div>
    <button on:click={() => addStudents(students)}>Add Students</button>
</section>

<style lang="scss">
    section {
        margin: auto;
        min-width: 40dvw;
        font-size: larger;
        gap: 4em;

        div {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 2em;

            span {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 2em;
                width: 100%;

                strong {
                    padding: 1em;
                    height: 3em;
                    width: 5em;
                }

                input {
                    min-width: 12em;
                    width: 12em;
                }
            }
        }
        button {
            min-width: 16em;
            width: 16em;
        }
    }
    input[type="file"] {
        display: none;
    }
</style>
