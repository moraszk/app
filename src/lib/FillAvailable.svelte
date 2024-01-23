<script lang="ts">
  import { browser } from '$app/environment';

  let innerHeight = 720;
  $: browser && document.body.style.setProperty('--vh', `${innerHeight / 100}px`);
</script>

<svelte:window bind:innerHeight />
