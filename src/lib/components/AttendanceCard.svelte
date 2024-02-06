<script lang="ts">
    export let headCount: number;
    export let start: Date;
    
    let end = new Date(start);
    end.setHours(start.getHours() + 1)
</script>
    
<span>
    <p>{headCount} Students</p>
        <span>
            <strong>{start.toLocaleString([], {hour: 'numeric', minute: '2-digit'})
            }</strong>
            <p>-</p>
            <strong>{end.toLocaleString([], {hour: 'numeric', minute: '2-digit'})
            }</strong>
        </span>
    
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

