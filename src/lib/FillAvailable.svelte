<script lang="ts">
  import { browser } from '$app/env';

  let innerHeight = 720;
  $: browser && document.body.style.setProperty('--vh', `${innerHeight / 100}px`);
</script>

<svelte:window bind:innerHeight />

<style global lang="scss">
  body {
    --vh: 1vh;
  }
</style>
