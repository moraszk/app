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
  }

  @mixin no-animation {
    animation: none !important;
    transition: none !important;
  }
  .preload,
  .preload * {
    @include no-animation();
  }
  @media (prefers-reduced-motion) {
    * {
      @include no-animation();
    }
  }

  main {
    // border: calc(var(--nav-open) * 1rem) solid green;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 90vh;
    margin: 0;
    /* max-width: 420px */
    padding: 0 max(8px, calc(50vw - 250px));

    & :global(a) {
      color: #0064c8;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }

      &:visited {
        color: #0050a0;
      }
    }
  }

  @media screen and (min-width: 600px) {
    main {
      margin-left: 5rem;
    }
  }
  @media screen and (min-width: 900px) {
    main {
      // margin-left: 10rem;
    }
  }
</style>
