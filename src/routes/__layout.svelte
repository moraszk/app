<script lang="ts">
  import { browser } from '$app/env';
  import '../app.scss';
  import Theme from '$lib/Theme.svelte';
  import Nav from '$lib/Nav/index.svelte';
  import Preload from '$lib/Preload.svelte';
  import FillAvailable from '$lib/FillAvailable.svelte';
  import { goto } from '$app/navigation';
  $: browser &&
    window.location.pathname.endsWith('/') &&
    goto(window.location.pathname.slice(0, -1) + window.location.search);
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
    margin: 0;
    padding: 0;
    min-height: 100vh;
    min-height: calc(100 * var(--vh));
    min-height: -webkit-fill-available;
    font-family: 'Roboto', sans-serif;
  }

  main {
    min-height: 100vh;
    padding: 0px 1em;
  }

  @media screen and (min-width: $br-md) {
    main {
      margin-left: 5rem;
    }
  }
  @media screen and (min-width: $br-lg) {
    main {
      margin-right: 5rem;
    }
  }
  @media screen and (min-width: $br-xl) {
    main {
      margin-left: 16rem;
      margin-right: 5rem;
    }
  }

  .preload,
  .preload * {
    transition: none !important;
  }
</style>
