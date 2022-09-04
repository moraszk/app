<script lang="ts">
  import {} from '$app/paths';
  import type { ApiResult } from '../api';
  import { onMount } from 'svelte';
  import type SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert.js';
  import SlInput from '../sl-input.svelte';
  import { confirm, CONFIRM_URL } from '../api';
  import { amoled } from '$lib/storage/theme';
  import { browser } from '$app/env';

  $: error = {
    success: false,
    message: '',
  } as ApiResult;
  $: loading = true;
  let alert: SlAlert;

  onMount(async () => {
    await import('@shoelace-style/shoelace/dist/components/spinner/spinner.js');

    await Promise.all([
      import('@shoelace-style/shoelace/dist/components/alert/alert.js'),
      import('@shoelace-style/shoelace/dist/components/input/input.js'),
      import('@shoelace-style/shoelace/dist/components/select/select.js'),
      import('@shoelace-style/shoelace/dist/components/button/button.js'),
      import('@shoelace-style/shoelace/dist/components/icon/icon.js'),
    ]).then(() => (loading = false));
  });

  let token = '';
  let password = '';
  let passwordConfirm = '';

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1] as any));
    } catch (e) {
      return null;
    }
  };

  $: jwt = parseJwt(token);

  onMount(() => {
    token = new URL(window.location.href).searchParams.get('token') || '';
  });

  async function onSubmit(e: Event) {
    e.preventDefault();

    error = await confirm(
      JSON.stringify({
        token,
        password,
        password_confirm: passwordConfirm,
      })
    );

    alert.toast();
  }
</script>

<sl-alert
  bind:this={alert}
  variant={error.success ? 'success' : 'danger'}
  duration="10000"
  closable
>
  <strong>{error.message}</strong>
</sl-alert>

<section>
  <header class:text-center={loading}>
    <h2>Hálózati regisztráció</h2>
  </header>

  {#if loading}
    <sl-spinner class="spinner" />
    <p class="text-center">Oldal betöltése...</p>
  {:else}
    <form
      class="form-overview input-validation-required"
      method="post"
      action={CONFIRM_URL}
      on:submit={onSubmit}
    >
      <SlInput
        bind:value={token}
        defaultValue={token}
        bind:error
        filled={!$amoled}
        name="token"
        type="password"
        autocomplete="off"
        label="Token"
        icon="pin"
      />

      {#if jwt}
        <SlInput
          value={jwt.username}
          bind:error
          disabled
          filled={!$amoled}
          name="token"
          type="text"
          autocomplete="off"
          label="Felhasználónév"
          icon="pin"
        />

        <SlInput
          value={jwt.email}
          bind:error
          disabled
          filled={!$amoled}
          name="token"
          type="text"
          autocomplete="off"
          label="Felhasználónév"
          icon="pin"
        />
      {/if}

      <SlInput
        bind:value={password}
        bind:error
        filled={!$amoled}
        type="password"
        name="password"
        autocomplete="on"
        toggle-password
        label="Jelszó"
        icon="pin"
      />

      <SlInput
        bind:value={passwordConfirm}
        bind:error
        filled={!$amoled}
        type="password"
        name="password_confirm"
        autocomplete="on"
        toggle-password
        label="Jelszó újra"
        icon="pin"
      />

      <sl-button
        disabled={browser && !password}
        size="large"
        class="submit"
        variant="primary"
        type="submit"
      >
        Regisztráció
      </sl-button>
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
    min-height: 80vh;
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

  sl-button {
    width: 100%;
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
