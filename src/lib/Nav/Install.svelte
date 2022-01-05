<script lang="ts">
  import { browser } from '$app/env';
  import { amount, getPWADisplayMode } from '$lib/storage/pwa-denies';

  $: installer = null as any;

  export const prompt = () => installer && installer.prompt();

  browser &&
    window.addEventListener('beforeinstallprompt', async (event) => {
      console.log('Install ready', event);
      // After two denies
      if ($amount >= 2) {
        console.log('Install aborted due to user preference');
      } else if (getPWADisplayMode() != 'browser') {
        console.log('PWA already installed');
      } else {
        installer = event as any;
        event.preventDefault();
        try {
          // once user clicked the button
          const result = await (event as any).userChoice;
          console.log('pwa', result);
          if (result.outcome === 'dismissed') $amount += 1;
          installer = null;
        } catch (err) {
          console.error(err);
        } finally {
        }
      }
    });

  browser &&
    window.addEventListener('appinstalled', () => {
      console.log('PWA installed!');
      $amount = 100;
    });
</script>

{#if installer}
  <slot />
{/if}
