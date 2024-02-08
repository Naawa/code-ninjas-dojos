<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import "$lib/scss/styles.scss"
    import { invalidate } from '$app/navigation'
    import { onMount } from 'svelte'
	  import Navigation from "$lib/components/Navigation.svelte";
  
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
  
  <Navigation></Navigation>
  <slot />