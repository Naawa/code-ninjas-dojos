<script lang="ts">
    import Timer from "$lib/components/Timer.svelte";
	import NinjaInfo from "$lib/components/NinjaInfo.svelte";
	import { theme } from "$lib/stores/theme";
	import { ninjas } from "$lib/stores/ninjas";
    export let data;
    const { attendance, supabase } = data;

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

    let now: number = new Date().getTime();
    let hour: number = 0;
    let update: any;


    $: update = setInterval(function() {
        if(now < tHour02.getTime()) {
            if(hour != 1) {
                hour = 1;
            }
        }
        else if(now > tHour02.getTime() && now < tHour03.getTime()) {
            if(hour != 2) {
                hour = 2;
            }
        }
        else if(now > tHour03.getTime() && now < tHour04.getTime()) {
            if(hour != 3) {
                hour = 3;
            }
        }
        else if(now > tHour04.getTime() && now < end.getTime()) {
            if(hour != 4) {
                hour = 4;
            }
        }
        else {
            if(hour != 5) {
                hour = 5;
            }
        }
        now = new Date().getTime();
        update = clearInterval(update);     

    }, 1000)

    async function getNinjas(list: string[] | null) {
        if(list) {
            let students: {}[] = []
            for(let i = 0; i < list.length; i++) {
                let { data: ninja, error } = await supabase
                .from('students')
                .select("*")
                .eq('name', `${list[i]}`)
                if(ninja) {}
                students.push(ninja?.at(0));
            }
            ninjas.set(students);
        }
    }

    $: {
        if(hour <= 4) {
            getNinjas(attendance.hourly.at(hour - 1).scheduled);   
        }
    }

    const attendanceUpdates = supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
      },
      (payload) => {
            getNinjas(attendance.hourly.at(hour - 1).scheduled);   
        }
    )
    .subscribe()
</script>
<style lang="scss">
    section {
        min-height: 100dvh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-size: 100% 100%;
        background-repeat: no-repeat;

        img {
            position: absolute;
        }

        .bigFocus {
            bottom: 2dvh;
            max-height: 30dvh;
            max-width: 50dvw;
        }
        .v1 {
            left: 20dvw;
            max-height: 10dvh;
            top: 30dvh;
        }
        .v2 {
            right: 10dvw;
            top: 30dvh;
            max-height: 12dvh;
        }
        .v3 {
            top: 2dvh;
            max-height: 18dvh;
        }
    }
</style>

<section style="{$theme.bdrop};">
    <img class="bigFocus" src="{$theme.bigFocus}" alt="Big focus.">
    <img class="v1" src="{$theme.v1}" alt="Big focus.">
    <img class="v2" src="{$theme.v2}" alt="Big focus.">
    <img class="v3" src="{$theme.v3}" alt="Big focus.">
    {#if hour == 1}
        <Timer startTime={tHour01}></Timer>
    {:else if hour == 2}
        <Timer startTime={tHour02}></Timer>
    {:else if hour == 3}
        <Timer startTime={tHour03}></Timer>
    {:else if hour == 4}
        <Timer startTime={tHour04}></Timer>
    {/if}
    {#if hour < 5}
        <NinjaInfo></NinjaInfo>
    {/if}
</section>