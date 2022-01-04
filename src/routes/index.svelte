<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { browser } from '$app/env';

  interface Config {
    'link-login': string;
    'link-logout': string;
    ip: string;
    'logged-in': 'yes' | 'no';
    mac: string;
    username: string;
    uptime: string;
  }

  $: status = {} as Partial<Config>;

  async function check() {
    try {
      const response = await fetch('https://captiveportal.mora.u-szeged.hu/debuginfo.txt');
      status = await response.json();
    } catch (err) {
      status = {};
    }
  }

  let int: NodeJS.Timer;
  onMount(() => {
    check();
    int = setInterval(check, 10000);
  });
  onDestroy(() => clearTimeout(int));
</script>

<svelte:head>
  <title>Internet státusz</title>
</svelte:head>

<article>
  <h1 id="welcome">Üdv{status.username ? ' ' : ''}{status.username || ''}!</h1>
  <table>
    <tbody>
      <tr>
        <td>Belső IP cím</td>
        <td>{status.ip || 'frissítés...'}</td>
      </tr>

      <tr>
        <td>Eszköz azonosító</td>
        <td>{status.mac || 'frissítés...'}</td>
      </tr>

      <tr>
        <td>Tiltások:</td>
        <td>
          Torrentezés: <span id="torrent-guys" style="color: green">TODO!</span><br />
          Túl sok kapcsolat: <span id="many-connections" style="color: green">TODO!</span>
        </td>
      </tr>
      <tr>
        <td>Internethasználati idő</td>
        <td>{status.uptime || 'frissítés...'}</td>
      </tr>
      <tr>
        <td>Rendszergazdák ábécében</td>
        <td>
          Juhász Andor (V/14),<br />
          Kiss Ádám (III/S),<br />
          Südi Tamás (I/4),<br />
          Tajti Viktor (V/14)
        </td>
      </tr>
    </tbody>
  </table>
  {#if status['logged-in'] == 'yes'}
    <a href="https://captiveportal.mora.u-szeged.hu/logout?redirect=app" id="logout"
      >Kijelentkezés</a
    >
  {/if}
  {#if !browser || status['logged-in'] == 'no'}
    <a href="https://captiveportal.mora.u-szeged.hu/login?redirect=app" id="login">Bejelentkezés</a>
  {/if}
</article>

<style lang="scss">
  article {
    color: var(--text-primary);
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  h1 {
    text-align: center;
    font-size: 24px !important;
  }

  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 16px;
  }

  table {
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  article > * {
    max-width: 420px;
    width: 90%;
    display: flex;
    flex-direction: column;
  }

  table tr {
    border-bottom: 1px solid #e6e6e6aa;
    max-width: 420px;
  }

  table td {
    padding: 10px 4px 10px 0;
    &:nth-child(2) {
      width: 100%;
      float: right;
      margin-left: 40px;
    }
  }

  table td:first-child {
    font-weight: 700;
  }

  :root[theme='dark'] table td {
    border-bottom-color: #505050;
  }

  #login,
  #logout {
    border-radius: 6px;
    background: #3e4d59;
    text-align: center;
    padding: 15px;
    text-decoration: none;
    color: white;
  }
</style>
