<!-- // src/routes/login/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';

  export let data
  let { supabase, admin } = data
  $: ({ supabase, admin } = data)
  
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    goto("/");
  }
</script>

<section>
  <h3>Welcome {admin?.name}</h3>
  <span>
    <h4>{admin?.center} Dojo</h4>
    <div>
      <a href="/students">
        <h4>Students</h4>
      </a>
      <a href="/attendance">
        <h4>Attendance</h4>
      </a>
      <a href="/sessions">
        <h4>Sessions</h4>
      </a>
      <a href="/shop">
        <h4>Shop</h4>
      </a>
    </div>
  </span>
  <span>
    <button on:click="{handleSignOut}">Log Out</button>
    <a href="support">Need help?</a>
  </span>
</section>


<style lang="scss">
    section {
        gap: 5em;

        span {
          display: flex;
          justify-content: center;
          flex-direction: column;
          gap: 2em;

          &:last-of-type {
            align-items: center;
          }
          
          div {
            display: flex;
            overflow-x: scroll;
            align-items: center;
            gap: 3em;
            max-width: 90dvw;

            a {
              padding: 1em;
              min-height: 400px;
              width: 60dvw;
              min-width: 70%;
              border-radius: 0.5em;
              border: solid 0.1em #d5d5d5;
              text-decoration: none;
              h4 {
                  width: fit-content;
              }
            }
          }
        }
    }
</style>