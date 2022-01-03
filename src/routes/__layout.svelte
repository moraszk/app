<script lang="ts">
  import Theme from '$lib/Theme.svelte';
  import Nav from '$lib/Nav/index.svelte';
  import Preload from '$lib/Preload.svelte';
  import FillAvailable from '$lib/FillAvailable.svelte';
</script>

<FillAvailable />
<Preload />
<Theme />
<Nav />
<main id="main-content">
  <slot />
</main>

<style global lang="scss">
  body {
    --vh: 1vh;
    color: var(--text-primary);
    background-color: var(--bg-primary);
    margin: 0;
    padding: 0;
    min-height: 100vh;
    min-height: calc(100 * var(--vh));
    min-height: -webkit-fill-available;
    --nav-width: 0rem;
  }

  main {
    min-height: 100vh;
    padding: 0px 8px;
  }

  @media screen and (min-width: $br-md) {
    body {
      --nav-width: 5rem;
    }
  }
  @media screen and (min-width: $br-lg) {
    body {
      --nav-width: 16rem;
    }
  }

  .preload,
  .preload * {
    transition: none !important;
  }
</style>
