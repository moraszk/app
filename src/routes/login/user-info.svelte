<script lang="ts">
  import { browser } from '$app/environment';
  import { user, ban } from '$lib/storage/captive';
  import CustomPrerender from '$lib/CustomPrerender.svelte';
  import { onMount } from 'svelte';

  const copy = (text?: string) => {
    'clipboard' in navigator && navigator.clipboard.writeText(text || JSON.stringify(state));
  };

  $: state = {
    ip: $user.ip || $ban.ip || (browser && window.localStorage?.getItem('ip')) || '',
    mac: $user.mac || (browser && window.localStorage?.getItem('mac')) || '',
    username: $user.username || '',
  };

  onMount(async () => {
    import('@shoelace-style/shoelace/dist/components/tooltip/tooltip.js');
  });
</script>

<table>
  <tbody>
    <tr>
      <td>Belső IP cím</td>
      <td>
        <sl-tooltip on:click={() => state.ip && copy(state.ip)}>
          <div slot="content">másolás</div>
          {#if state.ip}
            {state.ip}
            <CustomPrerender>
              <span class="material-icons copy-icon">file_copy</span>
            </CustomPrerender>
            {#if !$user.ip && !$ban.ip}
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
          <div slot="content">másolás</div>
          {#if state.mac}
            {state.mac}
            <CustomPrerender>
              <span class="material-icons copy-icon">file_copy</span>
            </CustomPrerender>
            {#if !$user.mac}
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
        Torrentezés: {#if $ban['torrent-guys'] === true}
          <span style="color: red; font-weight:bold"
            >Fekete lista!!! A feloldást a <a href="https://support.mora.u-szeged.hu"
              >support.mora.u-szeged.hu</a
            > oldalon kérheted!</span
          >
        {:else if $ban['torrent-guys'] === false}
          <span id="torrent-guys" style="color: green">Tiszta vagy</span>
        {:else}
          <i>Betöltés...</i>
        {/if}
        <br />
        Túl sok kapcsolat: {#if $ban['many-connections'] === true}
          <span style="color: red; font-weight:bold"
            >Fekete lista!!! A feloldást a <a href="https://support.mora.u-szeged.hu"
              >support.mora.u-szeged.hu</a
            > oldalon kérheted!</span
          >
        {:else if $ban['many-connections'] === false}
          <span id="many-connections" style="color: green">Tiszta vagy</span>
        {:else}
          <i>Betöltés...</i>
        {/if}
      </td>
    </tr>

    {#if $user.username}
      <tr>
        <td>Internethasználati idő</td>
        <td>{$user.uptime || 'frissítés...'}</td>
      </tr>
    {/if}

    <tr>
      <td>Rendszergazdák ábécében</td>
      <td>
        <ul class="admins">
          <li>Erős Bálint (I/4),</li>
          <li>Juhász Andor (V/14),</li>
          <li>Kiszel Pál (I/5),</li>
          <li>Tajti Viktor (V/14)</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<style lang="scss">
  sl-tooltip {
    cursor: pointer;
  }

  table {
    max-width: 420px;
    width: 90%;
    display: flex;
    flex-direction: column;

    border-collapse: collapse;
    margin-bottom: 20px;

    tr {
      border-bottom: 1px solid #e6e6e6aa;
    }

    td {
      padding: 10px 4px 10px 0;
      &:nth-child(2) {
        width: 100%;
        float: right;
        margin-left: 40px;
      }

      &:first-child {
        font-weight: bold;
      }
    }
  }
  .copy-icon {
    display: inline;
    color: var(--sl-color-neutral-500);
  }

  .cached-data {
    font-size: 0.75em;
    opacity: 0.8;
    margin-top: 0.2em;
    display: block;
  }

  .admins {
    padding-left: 0;
    list-style: none;
    margin: 0;
  }

  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 16px;
  }
</style>
