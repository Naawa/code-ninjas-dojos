<script lang="ts">
    export let headCount: number;
    export let start: Date;
    
    let end = new Date(start);
    end.setHours(start.getHours() + 1)
</script>
    
<span>
    <p>{headCount} Students</p>

    <div>
        <strong>{start.toLocaleString([], {hour: 'numeric', minute: '2-digit'})
        }</strong>
        <p>-</p>
        <strong>{end.toLocaleString([], {hour: 'numeric', minute: '2-digit'})
        }</strong>
    </div>
    
</span>

<style lang="scss">
    span {
        display: flex;
        justify-content: space-between;
        gap: 1em;
        text-decoration: none;
        align-items: center;
        width: 100%;

        div {
            display: flex;
            gap: 1em;
        }
    }
</style>

