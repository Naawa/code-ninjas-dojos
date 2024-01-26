<!-- // src/routes/login/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';

  export let data
  let { supabase, query } = data
  $: ({ supabase } = data)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    goto("/");
  }
</script>

<section>
  <h3>Welcome {query?.at(0).name}</h3>
  <h4>Manage {query?.at(0).center}</h4>
  <a href="/dojo">Manage Dojo</a>
  <a href="/sessions">Manage Sessions</a>
  <a href="/shop">Manage Shop</a>
  <button on:click="{handleSignOut}">Log Out</button>
</section>