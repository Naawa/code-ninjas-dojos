<script lang="ts">
	import { goto } from '$app/navigation';
	import { studentListFormat } from '$lib/utils/studentListFormat.js';

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
        students = [];
        const data = await file.text()
        let formatedStudents = await studentListFormat(data);
        for(let i = 0; i < formatedStudents.length; i++) {
            students.push(formatedStudents[i]);
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
