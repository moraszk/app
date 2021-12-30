<script lang="ts">
  import Theme from '$lib/Theme.svelte';
  import Nav from '$lib/Nav/index.svelte';
  import Preload from '$lib/Preload.svelte';
</script>

<Preload />
<Theme />
<Nav />
<main id="main-content">
  <slot />
</main>

<style global lang="scss">
  body {
    color: var(--text-primary);
    background-color: var(--bg-primary);
    margin: 0;
    padding: 0;
  }

  .preload,
  .preload * {
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }

  main {
    padding: 0 8px;
  }

  @media screen and (min-width: 600px) {
    main {
      margin-left: 5rem;
    }
  }
  @media screen and (min-width: 900px) {
    main {
      margin-left: 16rem;
    }
  }
</style>
