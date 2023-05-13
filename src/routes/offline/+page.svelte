<!-- The service worker responds with this file, when offline -->
<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { user } from '$lib/storage/captive';
  import { onMount, onDestroy } from 'svelte';
  let link = browser
    ? (() => {
        const u = new URL(window.location.href);
        u.pathname = u.searchParams.get('redirect') ?? '/';
        u.search = '';
        return u.href === window.location.href ? '/' : u.href;
      })()
    : '';

  let timer: NodeJS.Timer;

  let loaded = false;

  const onLoaded = () => {
    if (!loaded) {
      goto(link, { replaceState: true });
    }
    loaded = true;
  };
  const isEmpty = (o: Object) => Object.keys(o).length === 0;

  onMount(() => {
    import('@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.js');
    user.subscribe((u) => {
      if (!isEmpty(u)) onLoaded();
    });
    timer = setTimeout(onLoaded, 5000);
  });
  onDestroy(() => clearTimeout(timer));
</script>

<section id="offline">
  <span id="emoji" />
  <h3>Nem sikerült kapcsolódni a hálózathoz</h3>
  <p><i>Az alkalmazás hamarosan betöltődik az eszközöd memóriájából</i></p>
  <sl-progress-bar indeterminate />

  <p>A betöltendő útvonal: <a href={link}>{link}</a></p>
</section>

<style lang="scss">
  #offline {
    // padding-left: var(--nav-width);
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
  }
  #emoji {
    margin: 0;
    font-size: 56px;
    &::after {
      content: '\01F494';
    }
  }
  * {
    text-align: center;
    max-width: 350px;
  }

  sl-progress-bar {
    margin: 1rem 0;
    width: 80%;
  }
</style>
