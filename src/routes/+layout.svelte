<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import "$lib/scss/styles.scss"
    import { invalidate } from '$app/navigation'
    import { onMount } from 'svelte'
	  import SideNavigation from "$lib/components/SideNavigation.svelte";
    import BottomNavigation from "$lib/components/BottomNavigation.svelte";
    export let data
  
    let { supabase, session } = data
    $: ({ supabase, session } = data)
  
    onMount(() => {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, _session) => {
        if (_session?.expires_at !== session?.expires_at) {
          invalidate('supabase:auth')
        }
      })
  
      return () => subscription.unsubscribe()
    });
  </script>
  
 {#if session}
  <div>
    <SideNavigation></SideNavigation>
    <span>
      <slot />
    </span>
    <BottomNavigation></BottomNavigation>
  </div>
  {:else}
  <div>
    <span>
      <slot />
    </span>
  </div>
 {/if}


 <style lang="scss">
    div {
      display: flex;
      padding: 2em;
      height: 100dvh;
      gap: 2em;

      span {
        height: 100%;
        width: 100%;
      }
    }

    @media (width < 800px) {
        div {
            flex-direction: column;
            span {
              height: 80dvh;
            }
        }
    }
 </style>