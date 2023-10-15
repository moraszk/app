<script>
  import { browser } from '$app/environment';
</script>

{#if browser}
  <slot />
{:else}
  <slot name="prerender" />
{/if}
