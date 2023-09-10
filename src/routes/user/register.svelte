<script lang="ts">
  import SlInput from './sl-input.svelte';
  import Rooms from './rooms.svelte';
  import { register, REGISTER_URL } from './api';
  import type { ApiResult } from './api';
  export let error: ApiResult;
  export let alert: SlAlert;
  export let loading: boolean;
  import { amoled } from '$lib/storage/theme';
  import type SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert';

  let username = '';
  let firstname = '';
  let lastname = '';
  let roomid = '';
  let email = '';
  let password = '';
  let terms = false;

  async function onRegister(e: Event) {
    e.preventDefault();

    error = await register(
      JSON.stringify({
        form: {
          username,
          firstname,
          lastname,
          roomid,
          email,
          password,
          terms: terms ? 'on' : 'off',
        },
      })
    );

    alert.toast();
  }
</script>

<section id="register">
  <header class:text-center={loading}>
    <h2>Hálózati regisztráció</h2>

    <p>Minden félév elején szükséges kitölteni a hálózati regisztrációt</p>
  </header>

  {#if loading}
    <sl-spinner class="spinner" />
    <p class="text-center">Oldal betöltése...</p>
  {:else}
    <form
      class="form-overview input-validation-required"
      method="post"
      action={REGISTER_URL}
      on:submit={onRegister}
    >
      <SlInput
        bind:value={username}
        bind:error
        filled={!$amoled}
        name="username"
        label="felhasználónév"
        icon="login"
      />

      <SlInput
        bind:value={firstname}
        bind:error
        filled={!$amoled}
        name="firstname"
        autocomplete="on"
        label="vezetéknév"
        placeholder="Gipsz"
        icon="people"
      />

      <SlInput
        bind:value={lastname}
        bind:error
        filled={!$amoled}
        name="surname"
        autocomplete="on"
        label="keresztnév"
        placeholder="Jakab"
        icon="people"
      />

      <SlInput
        slType="select"
        bind:value={roomid}
        bind:error
        filled={!$amoled}
        name="roomid"
        label="szobaszám"
      >
        <span class="material-icons" slot="prefix"> place </span>
        <Rooms />
      </SlInput>

      <SlInput
        bind:value={password}
        bind:error
        filled={!$amoled}
        name="password"
        autocomplete="on"
        label="jelszó"
        type="password"
        icon="lock"
      />

      <SlInput
        bind:value={email}
        bind:error
        filled={!$amoled}
        name="email"
        autocomplete="on"
        label="email"
        type="email"
        icon="email"
        help-text="Hogy tudjunk neked értesítéseket küldeni"
      />

      <footer>
        <SlInput slType="checkbox" bind:value={terms} bind:error name="terms">
          Elolvastam és elfogadom a hálózat használati <a target="_blank" href="/terms"
            >szabályzatot <span class="external-link material-icons">launch</span>
          </a>
        </SlInput>

        <sl-button size="large" class="submit" variant="warning" type="submit">
          Regisztráció
        </sl-button>
      </footer>
    </form>
  {/if}
</section>

<style lang="scss">
  section {
    text-align: justify;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    // min-height: 80vh;
    margin: 5vh auto 0;
    max-width: 480px;
  }
  header {
    margin-bottom: 1.5em;
  }

  .spinner {
    margin: 1rem auto;
    font-size: 3rem;
  }
  .text-center {
    text-align: center;
  }
  footer {
    display: flex;
    align-items: center;
  }

  footer,
  a {
    color: var(--sl-color-neutral-700);
  }
  .form-overview > * {
    margin-bottom: 1.2em;
  }
  .submit {
    margin-left: 1em;
    float: right;
    padding: 0;
  }
</style>
