<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { browser } from '$app/env';
  import { status, statusBan } from '$lib/storage/captive';
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
          {#if $status.ip || $statusBan.ip}
            {$status.ip || $statusBan.ip}
          {:else if browser && 'localStorage' in window && window.localStorage.getItem('ip')}
            {window.localStorage.getItem('ip')}<span
              class="cached-data"
              title="Nem sikerült frissíteni, az adat memóriából lett betöltve"
              >(utolsó ismert adat)</span
            >
          {:else}
            <span> Frissítés... </span>
          {/if}
        </td>
      </tr>

      <tr>
        <td>Eszköz azonosító</td>
        <td>
          {#if $status.mac}
            {$status.mac}
          {:else if browser && 'localStorage' in window && window.localStorage.getItem('mac')}
            {window.localStorage.getItem('mac')}<span
              class="cached-data"
              title="Nem sikerült frissíteni, az adat memóriából lett betöltve"
              >(utolsó ismert adat)</span
            >
          {:else}
            <i> Frissítés... </i>
          {/if}
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
          Juhász Andor (V/14),<br />
          Kiss Ádám (III/S),<br />
          Südi Tamás (I/4),<br />
          Tajti Viktor (V/14)
        </td>
      </tr>
    </tbody>
  </table>
  {#if $status['logged-in'] == 'yes'}
    <a href="https://captiveportal.mora.u-szeged.hu/logout?redirect=app" id="logout"
      >Kijelentkezés</a
    >
  {/if}
  {#if !browser || $status['logged-in'] != 'yes'}
    <a href="https://captiveportal.mora.u-szeged.hu/login?redirect=app" id="login">Bejelentkezés</a>
  {/if}
</article>

<style lang="scss">
  article {
    color: var(--sl-color-neutral-900);
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

  :global(.sl-theme-dark) table td {
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

  .cached-data {
    font-size: 0.75em;
    opacity: 0.8;
    margin-top: 0.2em;
    display: block;
  }
</style>
