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
      <h4>Students</h4>
    </a>
    <a href="/display">
      <h4>Display</h4>
    </a>
    <a href="/sessions">
      <h4>Sessions</h4>
    </a>
    <a href="/shop">
      <h4>Shop</h4>
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
            color: black;
            padding: 1em;
            min-height: 200px;
            width: 60dvw;
            min-width: 240px;
            border-radius: 0.5em;
            border: solid 0.25em #000000;
            text-decoration: none;
            h4 {
              width: fit-content;
            }
          }
        }
    }
</style>