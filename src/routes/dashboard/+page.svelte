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
  <h3>{admin?.center} Dojo</h3>
  <span>
    <div>
      <a href="/students">
        <h4>Students</h4>
      </a>
      <a href="/attendance">
        <h4>Attendance</h4>
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
        gap: 4em;
        text-align: center;
        min-height: 100dvh;
  
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
          
          div {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 3em;
            width: 90dvw;

            a {
              padding: 1em;
              min-height: fit-content;
              height: 10em;
              width: 100%;
              max-width: 20em;
              border-radius: 0.5em;
              border: solid 0.1em #d5d5d5;
              text-decoration: none;
              display: flex;
              justify-content: center;
              align-items: center;

              h4 {
                  width: fit-content;
              }
            }
          }
        }
    }
</style>