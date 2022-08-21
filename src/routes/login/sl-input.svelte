<script lang="ts">
  import { onMount } from 'svelte';

  $: hasJS = false;

  onMount(() => {
    hasJS = true;
    import('@shoelace-style/shoelace/dist/components/input/input.js');
  });
</script>

{#if hasJS}
  <sl-input {...$$props}><slot name="prefix" /><slot name="suffix" /></sl-input>
{:else}
  <input {...$$props} />
  <input class="submit-fallback" type="submit" value="submit" />
{/if}

<style lang="scss">
  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 16px;
  }

  .submit-fallback {
    display: none;
    &:global(:last-of-type) {
      display: block;
    }
  }
</style>
