<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { browser } from '$app/env';
  import CustomPrerender from '$lib/CustomPrerender.svelte';
  import { status, statusBan } from '$lib/storage/captive';
  import { onMount } from 'svelte';

  $: loaded = false;

  onMount(() => {
    Promise.all([
      import('@shoelace-style/shoelace/dist/components/button/button.js'),
      import('@shoelace-style/shoelace/dist/components/tooltip/tooltip.js'),
    ]).then(() => (loaded = true));
  });

  $: state = {
    ip: $status.ip || (browser && window.localStorage?.getItem('ip')) || '',
    mac: $status.mac || (browser && window.localStorage?.getItem('mac')) || '',
    username: $status.username || '',
  };

  const copy = (text?: string) => {
    'clipboard' in navigator && navigator.clipboard.writeText(text || JSON.stringify(state));
  };
</script>

<svelte:head>
  <title>Internet státusz</title>
</svelte:head>

<article>
  <h1 id="welcome">Üdv{$status.username ? ' ' : ''}{$status.username || ''}!</h1>
  <table>
    <tbody>
      <tr>
        <td>Belső IP cím</td>
        <td>
          <sl-tooltip on:click={() => state.ip && copy(state.ip)}>
            <div slot="content">
              {#if loaded}
                másolás
              {/if}
            </div>
            {#if state.ip}
              {state.ip}
              <CustomPrerender>
                <span class="material-icons copy-icon">file_copy</span>
              </CustomPrerender>
              {#if !$status.ip && !$statusBan.ip}
                <span
                  class="cached-data"
                  title="Nem sikerült frissíteni, az adat memóriából lett betöltve"
                >
                  (utolsó ismert adat)</span
                >
              {/if}
            {:else}
              <span> Frissítés... </span>
            {/if}
          </sl-tooltip>
        </td>
      </tr>

      <tr>
        <td>Eszköz azonosító</td>
        <td>
          <sl-tooltip on:click={() => state.mac && copy(state.mac)}>
            <div slot="content">
              {#if loaded}
                másolás
              {/if}
            </div>
            {#if state.mac}
              {state.mac}
              <CustomPrerender>
                <span class="material-icons copy-icon">file_copy</span>
              </CustomPrerender>
              {#if !$status.mac}
                <span
                  class="cached-data"
                  title="Nem sikerült frissíteni, az adat memóriából lett betöltve"
                  >(utolsó ismert adat)</span
                >
              {/if}
            {:else}
              <span> Frissítés... </span>
            {/if}
          </sl-tooltip>
        </td>
      </tr>

      <tr>
        <td>Tiltások:</td>
        <td>
          Torrentezés: {#if $statusBan['torrent-guys'] === true}
            <span style="color: red; font-weight:bold; font-size: 200%"
              >Fekete lista!!! A feloldást a <a href="https://support.mora.u-szeged.hu"
                >support.mora.u-szeged.hu</a
              > oldalon kérheted!</span
            >
          {:else if $statusBan['torrent-guys'] === false}
            <span id="torrent-guys" style="color: green">Tiszta vagy</span>
          {:else}
            <i>Betöltés...</i>
          {/if}
          <br />
          Túl sok kapcsolat: {#if $statusBan['many-connections'] === true}
            <span style="color: red; font-weight:bold; font-size: 200%"
              >Fekete lista!!! A feloldást a <a href="https://support.mora.u-szeged.hu"
                >support.mora.u-szeged.hu</a
              > oldalon kérheted!</span
            >
          {:else if $statusBan['many-connections'] === false}
            <span id="many-connections" style="color: green">Tiszta vagy</span>
          {:else}
            <i>Betöltés...</i>
          {/if}
        </td>
      </tr>
      <tr>
        <td>Internethasználati idő</td>
        <td>{$status.uptime || 'frissítés...'}</td>
      </tr>
      <tr>
        <td>Rendszergazdák ábécében</td>
        <td>
          <ul class="admins">
            <li>Juhász Andor (V/14),</li>
            <li>Kiss Ádám (III/S),</li>
            <li>Südi Tamás (I/4),</li>
            <li>Tajti Viktor (V/14)</li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="auth-buttons">
    {#if $status['logged-in'] == 'yes'}
      <sl-button size="large" href="https://captiveportal.mora.u-szeged.hu/logout?redirect=app">
        Kijelentkezés
      </sl-button>

      <sl-button
        class="delete-button"
        variant="text"
        size="large"
        href="https://captiveportal.mora.u-szeged.hu/logout?redirect=app&erase-cookie=on"
      >
        <span class="primary"> Eszköz törlése </span>
      </sl-button>
    {/if}
    {#if !browser || $status['logged-in'] != 'yes'}
      <sl-button size="large" href="https://captiveportal.mora.u-szeged.hu/login?redirect=app">
        Bejelentkezés
      </sl-button>
    {/if}
  </div>
</article>

<style lang="scss">
  article {
    color: var(--sl-color-neutral-900);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  sl-tooltip {
    cursor: pointer;
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
    font-weight: bold;
  }

  .auth-buttons {
    --sl-input-border-width: 0px;
    & > * {
      margin-bottom: 15px;
    }
    sl-button:not([variant='text'])::part(base) {
      background-color: #3e4d59;
      color: white;
    }
  }
  .primary {
    color: var(--sl-color-primary-500) !important;
  }

  .cached-data {
    font-size: 0.75em;
    opacity: 0.8;
    margin-top: 0.2em;
    display: block;
  }

  .copy-icon {
    display: inline;
    color: var(--sl-color-neutral-500);
  }

  .delete-button:hover {
    border-radius: 5px;
    background-color: #8181811f;
  }

  .admins {
    padding-left: 0;
    list-style: none;
    margin: 0;
  }
</style>
