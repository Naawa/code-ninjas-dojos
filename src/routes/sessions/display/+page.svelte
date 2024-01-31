<script lang="ts">
    import Timer from "$lib/components/Timer.svelte";
	import NinjaInfo from "$lib/components/NinjaInfo.svelte";
    export let data;
    const { hours, attendanceInfo, supabase, session } = data;

    const { tHour01, tHour02, tHour03, tHour04 } = hours
    let now;
    let ninjas: any[] = [];
    let hour: number;
    let update;

    $: if(hour == 1) {
        if(attendanceInfo?.first_hour_attendance) {
            getNinjas(attendanceInfo?.first_hour_attendance);
        }
    } 
    else if(hour == 2) {
        if(attendanceInfo?.second_hour_attendance) {
            getNinjas(attendanceInfo?.second_hour_attendance);
        }
    }
    else if(hour == 3) {
        if(attendanceInfo?.third_hour_attendance) {
            getNinjas(attendanceInfo?.third_hour_attendance);
        }
    }
    else if(hour == 4) {
        if(attendanceInfo?.fourth_hour_attendance) {
            getNinjas(attendanceInfo?.fourth_hour_attendance);
        }
    }
    else {
        if(attendanceInfo?.first_hour_attendance) {
            getNinjas(attendanceInfo?.first_hour_attendance);
        }
    }

    update = setInterval(function() {
        now = new Date().getTime();
        if(tHour01.getTime() > now) {
            hour = 1;
        }
        if(tHour02.getTime() > now) {
            hour = 2;
            
        }
        if(tHour03.getTime() > now) {
            hour = 3;
            
        }
        if(tHour04.getTime() > now) {
            hour = 4;
        }
    }, 1000)

    async function getNinjas(list: string[] | null) {
        ninjas = [];
        if(list) {
            for(let i = 0; i < list.length; i++) {
                let { data: ninja, error } = await supabase
                .from('students')
                .select("*")
                .eq('nickname', `${list[i]}`)
                ninjas.push(ninja);
            }
        }
        return ninjas;
    }

    let backgroundColor = "#0E2937";
    let color = "#FFCF46";
    let shade = "#e6a800";
    let block = "";
</script>
<style lang="scss">
    section {
        height: 100dvh;
        width: 100%;
        top: 0;
        left: 0;
        display: grid;
        grid-auto-rows: 70dvh 15dvh;
        place-items: center;
        padding: 0;
        background-image: url("../../../../Background.jpg");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-align: center;

        h2 {
            color: white;
            -webkit-text-stroke: 2px black;
        }
    }
    @media (width < 1200px) {
        section {
            padding: 6em 0 0;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
    }
</style>

<section>
    {#if hour == 1}
        <Timer startTime={tHour01} {backgroundColor} {shade} {color} {block}></Timer>
        {#if attendanceInfo?.first_hour_attendance}
            <NinjaInfo {backgroundColor} {color} {ninjas}></NinjaInfo>
        {/if}
    {:else if hour == 2}
        <Timer startTime={tHour02} {backgroundColor} {shade} {color} {block}></Timer>
        {#if attendanceInfo?.first_hour_attendance}
            <NinjaInfo {backgroundColor} {color} {ninjas}></NinjaInfo>
        {/if}
    {:else if hour == 3}
        <Timer startTime={tHour03} {backgroundColor} {shade} {color} {block}></Timer>
        {#if attendanceInfo?.first_hour_attendance}
            <NinjaInfo {backgroundColor} {color} {ninjas}></NinjaInfo>
        {/if}
    {:else if hour == 4}
        <Timer startTime={tHour04} {backgroundColor} {shade} {color} {block}></Timer>
        {#if attendanceInfo?.first_hour_attendance}
            <NinjaInfo {backgroundColor} {color} {ninjas}></NinjaInfo>
        {/if}
    {:else}
        <h2>Come again tomorrow.</h2>
        {#if attendanceInfo?.first_hour_attendance}
            <NinjaInfo {backgroundColor} {color} {ninjas}></NinjaInfo>
        {/if}
    {/if}
</section>