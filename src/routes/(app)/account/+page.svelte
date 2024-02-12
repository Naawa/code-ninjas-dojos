<!-- // src/routes/login/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';

  export let data
  let { supabase, admin } = data
  $: ({ supabase, admin } = data)
  
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    goto('/');
  }
</script>

<section>
  <h3>Account</h3>
  <span>
    <button on:click="{handleSignOut}">Log Out</button>
    <a href="support">Need help?</a>
  </span>
</section>


<style lang="scss">
    section {
        gap: 4em;
        text-align: center;
  
        span {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          gap: 3em;

          &:last-of-type {
            align-items: center;
            gap: 2em;
        }
      }
    }
</style>