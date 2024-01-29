<script lang="ts">
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
                nickname: `${name}`,  
                belt: `${belt}`,  
                points: `${points}`,  
                center_admin: `${session?.user.id}`,  
            },
        ])
        .select()
        console.log(data);
    }
</script>

<section>
    <h3>Add Student</h3>
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
                    border-bottom: solid 2px rgb(59, 59, 59);
                    padding: 1em;
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
</style>
