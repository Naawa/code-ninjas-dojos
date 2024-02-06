<script lang="ts">
	import Session from "$lib/components/Attendance.svelte";

    export let data;

    let hour: number = 2;
    let start = new Date()
    start.setHours(16);
    start.setMinutes(30);



</script>

<Session {data} {start} {hour}></Session>