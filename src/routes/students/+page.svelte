<script lang="ts">
    export let data;
    const { students } = data;
</script>

<section>
    <h3>Students</h3>
    <span>
        <a href="/students/add" class="div">
            <div>
                <span></span>
                <span></span>
            </div>
            <h4>Add</h4>
        </a>
        {#if students.data }
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
        span {
            display: flex;
            align-items: center;
            gap: 2em;
            padding: 2em;
            flex-wrap: wrap;
            
            a {
                border-radius: 0.5em;
                border: solid 0.1em #d5d5d5;
                display: flex;
                align-items: center;
                flex-direction: column;
                gap: 1em;
                padding: 2em;
                min-height: 100px;
                min-width: 125px;
                justify-content: center;
                text-decoration: none;

                div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0.5em;

                    span {
                        width: 1em;
                        border: solid 1px #d5d5d5;
                        padding: 0;
                        gap: 0;
                        position: absolute;

                        &:last-of-type {
                            rotate: 90deg;
                        }
                    }
                }
            }
        }
    }
</style>