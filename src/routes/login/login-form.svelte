<script lang="ts">
  import { browser } from '$app/env';
  import { amoled } from '$lib/storage/theme';
  import { user } from '$lib/storage/captive';
  import { onMount } from 'svelte';

  const CAPTIVEPORTAL_LOGIN = 'https://captiveportal.mora.u-szeged.hu/login';

  $: hasJS = false;
  $: error = '';
  let alert: any;

  onMount(() => {
    hasJS = true;
    import('@shoelace-style/shoelace/dist/components/button/button.js');
    import('@shoelace-style/shoelace/dist/components/alert/alert.js');
    import('@shoelace-style/shoelace/dist/components/input/input.js');
  });

  async function onLogin(e: SubmitEvent) {
    const formData = new FormData(e.target as HTMLFormElement);
    const data = new URLSearchParams();
    data.append('username', formData.get('username') as string);
    data.append('password', formData.get('password') as string);
    e.preventDefault();
    error = '';

    let t = setTimeout(() => {
      error =
        'Kérlek próbálj meg a régi felületen bejelentkezni. (no tcp syn-ack from captiveportal)';
      alert.toast();
    }, 5000);

    try {
      const resp = await fetch(`https://captiveportal.mora.u-szeged.hu/api/login`, {
        method: 'POST',
        body: data,
      });
      const { ...result } = await resp.json();
      error = result.error;
      user.set(result);
    } catch (err) {
      error = JSON.stringify(err);
      if (error === '{}')
        error = 'Nem sikerült csatlakozni a hálózathoz. A kollégiumi hálózaton vagy?';
    }

    clearTimeout(t);

    alert.toast();
  }
</script>

{#if !hasJS}
  <form action={CAPTIVEPORTAL_LOGIN} method="post">
    <input type="text" name="username" required />
    <input type="password" name="password" required />
    <input type="submit" value="captiveportal" />
  </form>
{:else}
  <form
    class="form-overview input-validation-required"
    method="post"
    action={CAPTIVEPORTAL_LOGIN}
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
    <sl-button size="large" variant="warning" type="submit"> Eszköz aktiválása </sl-button>
    <div>
      <a id="captiveportallink" href="https://captiveportal.mora.u-szeged.hu/login?redirect=no"
        >Gyakran be kell jelentkeznem / régi felület</a
      >
    </div>

    <sl-alert
      bind:this={alert}
      variant={error == '' ? 'success' : 'danger'}
      duration="7000"
      closable
    >
      <strong>{error || 'Sikeres bejelentkezés'}</strong>
    </sl-alert>
  </form>
{/if}

<style lang="scss">
  #captiveportallink {
    color: var(--sl-color-neutral-500);
  }

  form {
    max-width: 420px;
    width: 90%;
    display: flex;
    flex-direction: column;

    & > * {
      margin-bottom: 1.2em;
    }
  }

  sl-button {
    min-width: 100%;
  }

  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 16px;
  }
</style>
