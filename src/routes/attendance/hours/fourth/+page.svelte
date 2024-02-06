<script lang="ts">
	import Session from "$lib/components/Attendance.svelte";

    export let data;

    let hour: number = 4;
    let start = new Date()
    start.setHours(19);
    start.setMinutes(30);



</script>

<Session {data} {start} {hour}></Session>