<script lang="ts">
    import Timer from "$lib/components/Timer.svelte";
	import NinjaInfo from "$lib/components/NinjaInfo.svelte";
    export let data;
    const { attendanceInfo, supabase} = data;

    let tHour01 = new Date()
    tHour01.setHours(15);
    tHour01.setMinutes(30);

    let tHour02 = new Date()
    tHour02.setHours(16);
    tHour02.setMinutes(30);

    let tHour03 = new Date()
    tHour03.setHours(17);
    tHour03.setMinutes(30);

    let tHour04 = new Date()
    tHour04.setHours(18);
    tHour04.setMinutes(30);

    let tHourTest = new Date()
    tHourTest.setHours(tHourTest.getHours());
    tHourTest.setMinutes(30);
    
    let now;
    let ninjas: any[] = [];
    let hour: number = 0;
    let update: any;

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

    $: update = setInterval(function() {
        now = new Date().getTime();
        if(now < tHour02.getTime()) {
            hour = 1;
        }
        else if(now > tHour02.getTime() && now < tHour03.getTime()) {
            hour = 2;
            
        }
        else if(now > tHour03.getTime() && now < tHour04.getTime()) {
            hour = 3;
            
        }
        else if(now > tHour04.getTime() && now < tHour04.getTime() + 1) {
            hour = 4;
        }
        else {
            hour = 0;
        }
        update = clearInterval(update);

    }, 1000)

    async function getNinjas(list: string[] | null) {
        if(list) {
            ninjas = []
            for(let i = 0; i < list.length; i++) {
                let { data: ninja, error } = await supabase
                .from('students')
                .select("*")
                .eq('nickname', `${list[i]}`)
                ninjas.push(ninja);
                ninjas = ninjas;
            }
        }
    }

    let backgroundColor = "#0E2937";
    let color = "white";
    let shade = "lightgray";
    let block = "";
</script>
<style lang="scss">
    section {
        height: 100dvh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-image: url("../../../../Background.jpg");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-align: center;
    }
</style>

<section>
    {#if hour == 1}
        <Timer startTime={tHour01} {backgroundColor} {shade} {color} {block}></Timer>
        <NinjaInfo {backgroundColor} {color} {ninjas}></NinjaInfo>
    {:else if hour == 2}
        <Timer startTime={tHour02} {backgroundColor} {shade} {color} {block}></Timer>
        <NinjaInfo {backgroundColor} {color} {ninjas}></NinjaInfo>
    {:else if hour == 3}
        <Timer startTime={tHour03} {backgroundColor} {shade} {color} {block}></Timer>
        <NinjaInfo {backgroundColor} {color} {ninjas}></NinjaInfo>
    {:else if hour == 4}
        <Timer startTime={tHour04} {backgroundColor} {shade} {color} {block}></Timer>
        <NinjaInfo {backgroundColor} {color} {ninjas}></NinjaInfo>
    {:else if hour == 0}
        <Timer startTime={tHourTest} {backgroundColor} {shade} {color} block=""></Timer>
        <NinjaInfo {backgroundColor} {color} {ninjas}></NinjaInfo>
    {/if}
</section>