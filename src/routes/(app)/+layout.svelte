<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import "$lib/scss/styles.scss"
	  import SideNavigation from "$lib/components/SideNavigation.svelte";
    import BottomNavigation from "$lib/components/BottomNavigation.svelte";
    export let data
  
    let { session, admin } = data;
  </script>
  
  <main>
    <h3>{admin?.data.center}</h3>
    {#if session}
    <div>
      <SideNavigation></SideNavigation>
      <span>
        <slot />
      </span>
    </div>
    <BottomNavigation></BottomNavigation>
    {:else}
    <div>
      <span>
        <slot />
      </span>
    </div>
   {/if}
  </main>



 <style lang="scss">
    main {
     display: flex;
     flex-direction: column;
     padding: 2em;
     gap: 2em;
     height: 100dvh;

      h3 {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 1em;
        background-color: white;
        border-radius: 0.5em;
        width: 100%;
        height: 10dvh;
      }

      div {
        display: flex;
        flex-direction: row;
        width: 100%;
        gap: 2em;
        height: 80dvh;

        span {
          //height: 100%;
          width: 100%;
        }
      }
    }

    @media (width < 800px) {
        main {
          div {
              flex-direction: column;
          }
        }
    }
 </style>