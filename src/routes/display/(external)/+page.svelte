<script lang="ts">
    import Timer from "$lib/components/Timer.svelte";
	import NinjaInfo from "$lib/components/NinjaInfo.svelte";
	import { theme } from "$lib/stores/theme";
	import { ninjas } from "$lib/stores/ninjas";
    export let data;
    const { attendance, supabase } = data;

    let first = new Date()
    let second = new Date()
    let third = new Date()
    let fourth = new Date()
    let end = new Date();

    if(first.getDay() != 6) {
        first.setHours(15);
        first.setMinutes(30);
        second.setHours(16);
        second.setMinutes(30);
        third.setHours(17);
        third.setMinutes(30);
        fourth.setHours(18);
        fourth.setMinutes(30);
        end.setHours(19);
        end.setMinutes(30);
    }
    else {
        first.setHours(10);
        first.setMinutes(0);
        second.setHours(11);
        second.setMinutes(0);
        third.setHours(12);
        third.setMinutes(0);
        fourth.setHours(13);
        fourth.setMinutes(0);
        end.setHours(14);
        end.setMinutes(0);
    }

    let now: number = new Date().getTime();
    let hour: number = 0;
    let update: any;

    $: update = setInterval(function() {
        now = new Date().getTime();
        if(now < second.getTime()) {
            if(hour != 1) {
                hour = 1;
            }
        }
        else if(now > second.getTime() && now < third.getTime()) {
            if(hour != 2) {
                hour = 2;
            }
        }
        else if(now > third.getTime() && now < fourth.getTime()) {
            if(hour != 3) {
                hour = 3;
            }
        }
        else if(now > fourth.getTime() && now < end.getTime()) {
            if(hour != 4) {
                hour = 4;
            }
        }
        else {
            if(hour != 5) {
                hour = 5;
            }
        }
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
        if(hour < 5) {
            getNinjas(attendance.hourly.at(hour - 1).scheduled);   
        }
        else {
            getNinjas(attendance.hourly.at(0).scheduled);
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
            if(hour < 5) {
                getNinjas(payload.new.hourly.at(hour - 1).scheduled);   
            }
            else {
                getNinjas(payload.new.hourly.at(0).scheduled);
            }
        }
    )
    .subscribe()

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
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: none;

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
    <img class="bigFocus" src="{$theme.bigFocus}" alt="Illustration.">
    <img class="v1" src="{$theme.v1}" alt="Illustration.">
    <img class="v2" src="{$theme.v2}" alt="Illustration.">
    <img class="v3" src="{$theme.v3}" alt="Illustration.">
    {#if hour == 1}
        <Timer startTime={first}></Timer>
    {:else if hour == 2}
        <Timer startTime={second}></Timer>
    {:else if hour == 3}
        <Timer startTime={third}></Timer>
    {:else if hour >= 4}
        <Timer startTime={fourth}></Timer>
    {/if}
    <NinjaInfo></NinjaInfo>
</section>