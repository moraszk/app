<!-- The service worker responds with this file, when offline -->
<script lang="ts">
  import { browser } from '$app/env';

  import { goto } from '$app/navigation';
  import { onMount, onDestroy } from 'svelte';
  let link = browser
    ? (() => {
        const u = new URL(window.location.href);
        u.pathname = u.searchParams.get('redirect') ?? '/';
        u.search = '';
        return u.href;
      })()
    : '';

  let timer: NodeJS.Timer;

  $: percent = 0;

  onMount(async () => {
    const TICK_IN_MS = 10;
    const TIMEOUT_IN_MS = 5000;
    timer = setInterval(() => {
      percent += TICK_IN_MS / TIMEOUT_IN_MS;
      if (percent >= 1) {
        goto(link, { replaceState: true });
        percent = 1;
      }
    }, TICK_IN_MS);
  });
  onDestroy(() => clearInterval(timer));
</script>

<section id="offline">
  <span id="emoji" />
  <h3>Nem sikerült kapcsolódni a hálózathoz</h3>
  <p><i>Az alkalmazás hamarosan betöltődik az eszközöd memóriájából</i></p>
  <div class="progress-bar">
    <div style={`width: ${100 * percent}%;`} class="progress" />
  </div>
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
  .progress-bar {
    width: 100%;
    border: 1px solid rgb(64 64 64 / 0.3);
    border-radius: 5px;
    margin: 5px auto;
    max-width: 300px;
  }
  .progress {
    border-radius: 5px;
    height: 15px;
    text-align: left;
    width: 0%;
    transition: width 10ms;
    background-color: green;
  }
</style>
