<script lang="ts">
  import { browser } from '$app/env';
  import CustomPrerender from '$lib/CustomPrerender.svelte';
  import { user, ban } from '$lib/storage/captive';
  import { onMount } from 'svelte';
  import { amoled } from '$lib/storage/theme';
  import Channels from '$lib/channels.svelte';

  $: loaded = false;
  $: error = '';
  let alert: any;
  onMount(() => {
    Promise.all([
      import('@shoelace-style/shoelace/dist/components/button/button.js'),
      import('@shoelace-style/shoelace/dist/components/tooltip/tooltip.js'),
      import('@shoelace-style/shoelace/dist/components/alert/alert.js'),
      import('@shoelace-style/shoelace/dist/components/input/input.js'),
    ]).then(() => (loaded = true));
  });

  $: state = {
    ip: $user.ip || $ban.ip || (browser && window.localStorage?.getItem('ip')) || '',
    mac: $user.mac || (browser && window.localStorage?.getItem('mac')) || '',
    username: $user.username || '',
  };

  const copy = (text?: string) => {
    'clipboard' in navigator && navigator.clipboard.writeText(text || JSON.stringify(state));
  };

  async function onLogin(e: SubmitEvent) {
    const formData = new FormData(e.target as HTMLFormElement);
    const data = new URLSearchParams();
    data.append('username', formData.get('username') as string);
    data.append('password', formData.get('password') as string);
    error = '';

    try {
      const resp = await fetch(`https://captiveportal.mora.u-szeged.hu/api/login`, {
        method: 'POST',
        body: data,
      });
      const result = await resp.json();
      error = result.error;
      user.set(result);
    } catch (err) {
      error = JSON.stringify(err);
      if (error == '{}')
        error = 'Nem sikerült csatlakozni a hálózathoz. A kollégiumi hálózaton vagy?';
    }

    alert.toast();
  }
</script>

<svelte:head>
  <title>Internet státusz</title>
</svelte:head>

<div id="main">
  <article class="flex-2">
    <h1 id="welcome">Üdv {$user.username || 'ismeretlen'}!</h1>
    {#if !browser || $user['logged-in'] != 'yes'}
      <form
        class="form-overview input-validation-required"
        method="post"
        target="https://captiveportal.mora.u-szeged.hu/login"
        on:submit={onLogin}
      >
        <sl-input
          value={$user.username ||
            (browser && 'localStorage' in window && localStorage.getItem('username')) ||
            ''}
          filled={!$amoled}
          name="username"
          variant="text"
          label="felhasználónév"
          spellcheck="false"
          required
          clearable
        >
          <span class="material-icons" slot="prefix"> login </span>
        </sl-input>

        <sl-input
          filled={!$amoled}
          spellcheck="false"
          name="password"
          variant="text"
          label="jelszó"
          required
          type="password"
          placeholder="********"
          toggle-password
        >
          <span class="material-icons" slot="prefix"> pin </span></sl-input
        >
        <sl-button size="large" variant="warning" submit> Eszköz aktiválása </sl-button>
        <div>
          <a id="captiveportallink" href="https://captiveportal.mora.u-szeged.hu/login?redirect=no"
            >Gyakran be kell jelentkeznem / regi felulet</a
          >
        </div>

        <sl-alert
          bind:this={alert}
          variant={error == '' ? 'success' : 'danger'}
          duration="3000"
          closable
        >
          <strong>{error || 'Sikeres bejelentkezés'}</strong>
        </sl-alert>
      </form>
      <!-- <a href="https://captiveportal.mora.u-szeged.hu">A régi bejelentkező felület</a><br /> -->
    {/if}
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
              <li>Juhász Andor (V/14),</li>
              <li>Kiss Ádám (III/S),</li>
              <li>Kiszel Pál (I/5),</li>
              <li>Südi Tamás (I/4),</li>
              <li>Tajti Viktor (V/14)</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="auth-buttons">
      {#if $user['logged-in'] == 'yes'}
        <sl-button
          size="large"
          class="button-default"
          href="https://captiveportal.mora.u-szeged.hu/logout?redirect=app"
        >
          Kijelentkezés
        </sl-button>

        <sl-button
          class="delete-button"
          variant="text"
          size="large"
          href="https://captiveportal.mora.u-szeged.hu/logout?redirect=app&erase-cookie=on"
          on:click={() => 'localStorage' in window && localStorage.clear()}
        >
          <span class="primary"> Eszköz törlése </span>
        </sl-button>
      {/if}
    </div>
  </article>
  <article class="channels">
    <Channels />
  </article>
</div>

<style lang="scss">
  #captiveportallink {
    color: var(--sl-color-neutral-500);
  }
  .form-overview > * {
    margin-bottom: 1.2em;
  }
  sl-button {
    min-width: 100%;
  }
  article {
    color: var(--sl-color-neutral-900);
    display: flex;
    align-items: center;
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
    sl-button.button-default::part(base) {
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
  .flex-2 {
    flex: 20;
    margin-top: 10%;
  }
  #main {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  @media screen and (min-width: $br-xl) {
    #main {
      flex-direction: row;
      margin-left: auto;
      margin-right: auto;
    }
    .channels {
      width: 556px;
    }
  }
</style>
