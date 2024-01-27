<script lang="ts">
    export let data;

    const { students } = data;
    
</script>

<section>
    <h3>Class List Work in Progress</h3>
    <span>
        {#each students as student} 
            <div>
                <h4>{student.nickname}</h4>
                <a href="/{student.nickname}">View Profile</a>
            </div>
        {/each}
    </span>
</section>

<style lang="scss">
    section {
        span {
            display: flex;
            align-items: center;
            gap: 2em;
            padding: 2em;
            
            div {
                border-radius: 0.5em;
                border: solid 0.1em #d5d5d5;
                display: flex;
                align-items: center;
                flex-direction: column;
                gap: 1em;
                padding: 2em;
            }
        }
    }
</style>