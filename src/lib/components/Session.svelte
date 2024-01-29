<script lang="ts">
    export let nextSession: any;

    let start = new Date(nextSession?.at(0).date);
    let end = new Date(start);
    end.setHours(start.getHours() + 1)

    function format(time: Date) {
        return time.toLocaleString([], {hour: '2-digit', minute: '2-digit'});
    }
</script>
    
<span>
    <p>{nextSession?.at(0).students.length} Students</p>
    <span>
        <h5>{format(start)}</h5>
        <p>-</p>
        <h5>{format(end)}</h5>
    </span>
</span>

<style lang="scss">
    span {
        display: flex;
        justify-content: space-between;
        gap: 1em;
        text-decoration: none;
    }
</style>

