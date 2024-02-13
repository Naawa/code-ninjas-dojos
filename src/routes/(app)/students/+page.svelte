<script lang="ts">
    export let data;
    const { students } = data;

    let filtered: any = [];
    let key: string = "";

    function search(key: string) {
        if(key.length > 0) {
            for(let i = 0; i < students.data.length; i++) {
                if(students.data[i].name.split(" ")[0].toLowerCase() == key.toLowerCase()) {
                    filtered = [students.data[i]];
                }
            }
        }
        else {
            filtered = [];
        }
    }
</script>

<section>
    <h3>{students.data.length} Students</h3>
    <input type="text" bind:value={key} on:keyup={() => search(key)} placeholder="Search">
        <div>
            {#each filtered as student}
                <a href="/students/{student.name}">
                    <h4>{student.name}</h4>
                    <p>{student.points} Points</p>
                </a>
            {/each}
        </div>
    <span>
        <a href="/students/add" class="div">
            <h4>+ Add</h4>
        </a>
        {#if students.data}
            {#each students.data as student} 
                <a href="/students/{student.name}">
                    <h4>{student.name}</h4>
                    <p>{student.points} Points</p>
                </a>
            {/each}
        {/if}
    </span>
</section>

<style lang="scss">
    section {
       overflow: scroll;
        span {
            display: flex;
            align-items: normal;
            justify-content: center;
            gap: 2em;
            padding: 2em;
            flex-wrap: wrap;
            overflow: scroll;

            a {
                border-radius: 0.5em;
                border: solid 0.1em #d5d5d5;
                display: flex;
                align-items: center;
                flex-direction: column;
                gap: 1em;
                padding: 2em;
                height: 10em;
                width: 20em;
                justify-content: center;
                text-decoration: none;
                background-color: white;
            }
        }
    }
</style>