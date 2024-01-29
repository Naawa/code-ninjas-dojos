<script lang="ts">
	import AddSession from "$lib/components/AddSession.svelte";
	import Session from "$lib/components/Session.svelte";
    export let data;
    const { nextSession } = data
</script>
<section>
    <h3>Sessions</h3>
    <div>
        {#if nextSession?.at(0)?.date}
            <a href="/sessions/${nextSession}">
                <h4>Create</h4>
                <Session {nextSession}></Session>
            </a>
        {:else}
            <span>
                <AddSession {data}></AddSession>
            </span>
        {/if}
        <a href="/sessions/history">
            <h4>History</h4>
        </a>
    </div>
</section>

<style lang="scss">
    section {
        div {
            display: flex;
            justify-content: center;
            flex-direction: column;
            width: 90dvw;
            max-width: 400px;
            gap: 2em;

            a, span {
                display: flex;
                flex-direction: column;
                border-radius: 0.5em;
                border: solid 0.1em #d5d5d5;
                padding: 1em;
                gap: 1em;
                text-decoration: none;
            }
            span {
                padding: 0;
            }
        }
    }
</style>