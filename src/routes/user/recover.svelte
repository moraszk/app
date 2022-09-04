<script lang="ts">
  import SlInput from './sl-input.svelte';
  import { recover, RECOVER_URL } from './api';
  import type { ApiResult } from './api';
  export let error: ApiResult;
  export let alert: SlAlert;
  export let loading: boolean;
  import { amoled } from '$lib/storage/theme';
  import type SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert';

  let id = '';

  async function onRegister(e: Event) {
    e.preventDefault();

    error = await recover(
      JSON.stringify({
        id,
      })
    );

    alert.toast();
  }
</script>

<section id="recover">
  <header class:text-center={loading}>
    <h2>Elfelejtett azonosító</h2>
  </header>

  {#if loading}
    <sl-spinner class="spinner" />
    <p class="text-center">Oldal betöltése...</p>
  {:else}
    <form
      class="form-overview input-validation-required"
      method="post"
      action={RECOVER_URL}
      on:submit={onRegister}
    >
      <SlInput
        bind:value={id}
        bind:error
        filled={!$amoled}
        name="id"
        label="email vagy felhasználónév"
        icon="login"
      />

      <footer>
        Ha létezik a felhasználó, akkor emailben elküldjük neki az adatait.
        <sl-button size="large" class="submit" variant="warning" type="submit"> Mehet </sl-button>
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

  footer {
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
