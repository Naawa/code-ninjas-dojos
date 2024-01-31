<script lang="ts">
    export let attendance: any;
    export let start: Date;
    
    let end = new Date(start);
    end.setHours(start.getHours() + 1)

    function format(time: Date) {
        return time.toLocaleString([], {hour: '2-digit', minute: '2-digit'});
    }
</script>
    
<span>
    {#if attendance}
        <p>{attendance.length} Students</p>
        <span>
            <strong>{format(start)}</strong>
            <p>-</p>
            <strong>{format(end)}</strong>
        </span>
    {/if}
</span>

<style lang="scss">
    span {
        display: flex;
        justify-content: space-between;
        gap: 1em;
        text-decoration: none;
        align-items: center;
    }
</style>

