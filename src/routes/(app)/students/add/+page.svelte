<script lang="ts">
	import { goto } from '$app/navigation';
	import { studentListFormat } from '$lib/utils/studentListFormat.js';

    let files: FileList;
    let studentList: string[] = [];

    export let data;
    const { supabase, session, students } = data;

    let name: string;
    let belt: string;
    let points: number;

    async function addStudent(name: string) {
        const { data, error } = await supabase
        .from('students')
        .insert([
            { 
                name,  
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
            viewstudentList(file)
        }
    }
    
    async function viewstudentList(file: any) {
        studentList = [];
        const data = await file.text()
        let formatedstudentList = await studentListFormat(data);
        for(let i = 0; i < formatedstudentList.length; i++) {
            studentList.push(formatedstudentList[i]);
        }
        studentList = studentList;
    }

    async function addstudentList(studentList: string[]) {
        for(let i = 0; i < studentList.length; i++) {
            let exists = false;
            for(let j = 0; j < students.length; j++) {
                if(students[j].name == studentList[i]) {
                    exists = true;
                }
            }
            if(!exists) {
                addStudent(studentList[i]);
            }
        }
        goto("/students");
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
    <button on:click={() => addStudent(name)}>Add Student</button>
    <h3>Multiple</h3>
    <label>
        <input type="file" bind:files accept=".csv">
        + CSV
    </label>
    <h4>{studentList.length}</h4>
    <div>
        {#each studentList as student}
            <h4>{student}</h4>
        {/each}
    </div>
    <button on:click={() => addstudentList(studentList)}>Add studentList</button>
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
