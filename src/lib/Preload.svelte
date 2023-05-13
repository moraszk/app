<script lang="ts">
  import { browser } from '$app/environment';

  const loaded = () => browser && document.body.classList.remove('preload');
  browser && setTimeout(loaded, 1000);
</script>

<svelte:body on:load={loaded} />
