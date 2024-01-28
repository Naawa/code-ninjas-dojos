<script lang="ts">
    export let data;
    const { students } = data;
    
</script>

<section>
    <h3>Class List Work in Progress</h3>
    <span>
        <a href="/students/add" class="div">
            <span></span>
            <span></span>
        </a>
        {#if students}
            {#each students as student} 
                <div>
                    <h4>{student.nickname}</h4>
                    <a href="/students/{student.nickname}">View Profile</a>
                </div>
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
            
            div,.div {
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
</style>