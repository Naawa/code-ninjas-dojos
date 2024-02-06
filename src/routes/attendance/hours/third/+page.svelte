<script lang="ts">
	import Session from "$lib/components/Attendance.svelte";

    export let data;

    let hour: number = 3;
    let start = new Date()
    start.setHours(17);
    start.setMinutes(30);



</script>

<Session {data} {start} {hour}></Session>