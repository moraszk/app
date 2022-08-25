<script lang="ts">
  import { user } from '$lib/storage/captive';
  import { CAPTIVEPORTAL_LOGOUT_URL, CAPTIVEPORTAL_EREASE_URL } from '$lib/config';
  import { onMount } from 'svelte';
  onMount(() => {
    import('@shoelace-style/shoelace/dist/components/button/button.js');
  });
</script>

<div class="logout">
  {#if $user['logged-in'] == 'yes'}
    <sl-button size="large" class="button-default" href={CAPTIVEPORTAL_LOGOUT_URL}>
      Kijelentkezés
    </sl-button>

    <sl-button
      class="delete-button"
      variant="text"
      size="large"
      href={CAPTIVEPORTAL_EREASE_URL}
      on:click={() => 'localStorage' in window && localStorage.clear()}
    >
      <span class="primary"> Eszköz törlése </span>
    </sl-button>
  {/if}
</div>

<style lang="scss">
  sl-button {
    min-width: 100%;
  }

  .logout {
    max-width: 420px;
    width: 90%;
    display: flex;
    flex-direction: column;

    --sl-input-border-width: 0px;
    & > * {
      margin-bottom: 15px;
    }
    sl-button.button-default::part(base) {
      background-color: #3e4d59;
      color: white;
    }
  }

  .delete-button:hover {
    border-radius: 5px;
    background-color: #8181811f;
  }

  .primary {
    color: var(--sl-color-primary-500) !important;
  }

  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 16px;
  }
</style>
