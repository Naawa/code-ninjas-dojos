<!-- // src/routes/login/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';

  export let data
  let { supabase, adminDetails } = data
  $: ({ supabase } = data)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    goto("/");
  }
</script>

<section>
  <h3>Welcome {adminDetails?.at(0).name}</h3>
  <div>
    <h4>{adminDetails?.at(0).center} Dojo</h4>
    <a href="/dojo">
      <h5>Manage Students</h5>
    </a>
    <a href="/sessions">
      <h5>Manage Sessions</h5>
    </a>
    <a href="/shop">
      <h5>Manage Shop</h5>
    </a>
  </div>
  <button on:click="{handleSignOut}">Log Out</button>
</section>


<style lang="scss">
    section {
        gap: 3em;
        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 3em;

          a {
            background-color: rgb(247, 247, 247);
            color: rgb(0, 23, 128);
            padding: 1em;
            min-height: 150px;
            width: 70dvw;
            min-width: 240px;
            text-decoration: none;
            border-radius: 0.5em;
            border: solid 0.5em #c1a6ce;
            h5 {
              width: fit-content;
            }
          }
        }
    }
</style>