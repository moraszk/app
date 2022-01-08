<script lang="ts">
  import { browser } from '$app/env';

  import { onDestroy, onMount } from 'svelte';
  import { numSubscribers } from './storage/captive';

  let isOnline = browser && 'navigator' in window && window.navigator.onLine;
  onMount(() => {
    isOnline && numSubscribers.set($numSubscribers + 1);
    window.addEventListener('online', () => {
      $numSubscribers += 1;
      isOnline = true;
    });
    window.addEventListener('offline', () => {
      $numSubscribers -= 1;
      isOnline = false;
    });
  });
  onDestroy(() => {
    if (isOnline) $numSubscribers--;
  });
</script>
