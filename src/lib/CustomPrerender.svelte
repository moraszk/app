<script>
  import { browser } from '$app/env';
</script>

{#if browser}
  <slot />
{:else}
  <slot name="prerender" />
{/if}
