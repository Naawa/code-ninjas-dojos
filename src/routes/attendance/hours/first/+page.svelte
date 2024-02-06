<script lang="ts">
	import Session from "$lib/components/Attendance.svelte";

    export let data;

    let hour: number = 1;
    let start = new Date()
    start.setHours(15);
    start.setMinutes(30);



</script>

<Session {data} {start} {hour}></Session>