<script lang="ts">
	import Session from "$lib/components/Attendance.svelte";

    export let data;

    let hour: number = 3;
    let start = new Date()
    
    if(start.getDay() != 6) {
        start.setHours(18);
        start.setMinutes(30);
    }
    else {
        start.setHours(12);
        start.setMinutes(0);
    }


</script>

<Session {data} {start} {hour}></Session>