<script lang="ts">
  import { browser } from '$app/env';
  import { theme, amoled } from '$lib/storage/theme';
  $: browser && document.body.classList.toggle('sl-theme-dark', $theme == 'dark');
  $: browser && document.body.classList.toggle('black', $amoled);
  $: themeColor = $theme == 'light' ? '#ffffff' : $amoled ? '#000000' : '#0d1117';
</script>

<svelte:head>
  <meta name="theme-color" content={themeColor} />
  <meta name="msapplication-TileColor" content={themeColor} />
</svelte:head>

<style global lang="scss">
  @import '@shoelace-style/shoelace/dist/themes/light.css';
  @import '@shoelace-style/shoelace/dist/themes/dark.css';

  body {
    background-color: var(--sl-color-neutral-0);
    color: var(--sl-color-neutral-900);
  }
  .sl-theme-dark {
    --sl-color-neutral-0: #0d1117;
    --sl-color-neutral-50: #161b22;
    &.black {
      --sl-color-neutral-0: #000;
      --sl-color-neutral-50: #000;
      --sl-color-neutral-900: #dadada;
    }
  }
</style>
