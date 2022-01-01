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
  <div id="ie-fix">
    <slot />
  </div>
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
    --margin-left: 0rem;
    margin-left: var(--margin-left) !important;
    /* max-width: 420px */
    padding: 0 8px; // IE fallback
    padding: 0 max(8px, calc(50vw - var(--margin-left) / 2 - 210px));

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
    #ie-fix {
      float: right;
      max-width: 420px;
      // IE 11 does not support `calc` and `display: flex`, content can't be centered
      max-width: calc(10000vw + var(--anything) * 1px);
    }
  }

  @media screen and (min-width: $br-md) {
    main {
      margin-left: 5rem;
      --margin-left: 5rem;
    }
  }
  @media screen and (min-width: $br-lg) {
  }
</style>
