<script lang="ts">
  import { browser } from '$app/env';
  import { theme, amoled } from '$lib/storage/theme';
  $: browser && document.documentElement.setAttribute('theme', $theme);
  $: browser && document.documentElement.setAttribute('amoled', $amoled ? 'amoled' : 'false');
  $: themeColor = $theme == 'light' ? '#ffffff' : $amoled ? '#000000' : '#0d1117';
</script>

<svelte:head>
  <meta name="theme-color" content={themeColor} />
  <meta name="msapplication-TileColor" content={themeColor} />
</svelte:head>

<style global lang="scss">
  :root {
    --text-primary: #1f1f1f;
    --text-secondary: #000000;
    --bg-primary: #ffffff;
    --bg-secondary: #e4e4e4;
  }
  @mixin dark {
    --bg-primary: #0d1117;
    --bg-secondary: #141418;
    --text-primary: #b6b6b6;
    --text-secondary: #ececec;
  }
  :root[theme='dark'] {
    @include dark();
  }

  @media (prefers-color-scheme: dark) {
    :root:not([theme]) {
      @include dark();
    }
  }

  :root[theme='dark'][amoled='amoled'] {
    --bg-primary: #000000;
  }
</style>
