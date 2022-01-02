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
  onMount(async () => {
    timer = setTimeout(() => goto(link, { replaceState: true }), 5000);
  });
  onDestroy(() => clearTimeout(timer));
</script>

<section id="offline">
  <h3 id="emoji">&#128148;</h3>
  <h3>Nem sikerült kapcsolódni a hálózathoz</h3>
  <p><i>Az alkalmazás hamarosan betöltődik az eszközöd memóriájából</i></p>
  <div class="progress-bar">
    <div class="progress" />
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
    animation: progress 5000ms;
    animation-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1);
    background-color: green;
  }
  @keyframes progress {
    from {
      width: 0%;
      background-color: green;
    }
    to {
      width: 100%;
      background-color: cyan;
    }
  }
</style>
