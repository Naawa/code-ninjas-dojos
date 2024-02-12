<!-- // src/routes/login/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms'
	export let form
</script>

<section>
  <h3>Code Ninjas Dojos</h3>
  <form method="post" use:enhance>
    <h5>Center Admin</h5>
    <input type="email" name="email" value={form?.email ?? ''} placeholder="your-email@example.com" />
    <input type="password" name="password" placeholder="********" />
    <button>Log In</button>
  </form>
</section>

<style lang="scss">
  section {
    height: 100dvh;
    justify-content: center;
    align-items: center;
  }
</style>