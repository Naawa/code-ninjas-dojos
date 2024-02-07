<script lang="ts">
    import Timer from "$lib/components/Timer.svelte";
	import NinjaInfo from "$lib/components/NinjaInfo.svelte";
    export let data;
    const { attendance, supabase} = data;

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

    let end = new Date();
    end.setHours(19);
    end.setMinutes(30);

    let now;
    let ninjas: any[] = [];
    let hour: number = 0;
    let update: any;
    let block: string = "";

    $: update = setInterval(function() {
        now = new Date().getTime();
        if(now < tHour02.getTime()) {
            if(hour != 1) {
                hour = 1;
                getNinjas(attendance.hourly.at(hour - 1).attending);
            }
        }
        else if(now > tHour02.getTime() && now < tHour03.getTime()) {
            if(hour != 2) {
                hour = 2;
                getNinjas(attendance.hourly.at(hour - 1).attending);
            }
        }
        else if(now > tHour03.getTime() && now < tHour04.getTime()) {
            if(hour != 3) {
                hour = 3;
                getNinjas(attendance.hourly.at(hour - 1).attending);
            }
        }
        else if(now > tHour04.getTime() && now < end.getTime()) {
            if(hour != 4) {
                hour = 4;
                getNinjas(attendance.hourly.at(hour - 1).attending);
            }
        }
        else {
            hour = 1;
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
                .eq('name', `${list[i]}`)
                ninjas.push(ninja);
                ninjas = ninjas;
            }
        }
    }

    $: console.log(hour)
</script>
<style lang="scss">
    section {
        min-height: 100dvh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        //background-image: url("../../../../Background.jpg");
        //background-color: #00f7ff;
        background: rgb(69,252,188);
        background: linear-gradient(0deg, rgba(69,252,188,1) 0%, rgba(0,255,235,1) 44%);
    }
</style>

<section>
    {#if hour == 1}
        <Timer startTime={tHour01}></Timer>
        <NinjaInfo {ninjas}></NinjaInfo>
    {:else if hour == 2}
        <Timer startTime={tHour02}></Timer>
        <NinjaInfo {ninjas}></NinjaInfo>
    {:else if hour == 3}
        <Timer startTime={tHour03}></Timer>
        <NinjaInfo {ninjas}></NinjaInfo>
    {:else if hour == 4}
        <Timer startTime={tHour04}></Timer>
        <NinjaInfo {ninjas}></NinjaInfo>
    {:else if hour == 0}
        <Timer startTime={tHour01}></Timer>
        <NinjaInfo {ninjas}></NinjaInfo>
    {/if}
</section>