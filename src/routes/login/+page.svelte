<script lang="ts">
  import LoginForm from './login-form.svelte';
  import UserInfo from './user-info.svelte';
  import LogoutForm from './logout-form.svelte';

  import { browser } from '$app/env';
  import { user } from '$lib/storage/captive';
  import Channels from '$lib/channels.svelte';
</script>

<svelte:head>
  <title>Internet státusz</title>
</svelte:head>

<div id="main">
  <article class="flex-2">
    {#if !browser || $user['logged-in'] != 'yes'}
      <LoginForm />
    {:else}
      <h1>Üdv {$user.username}!</h1>
    {/if}

    <UserInfo />

    <LogoutForm />
  </article>
  <article class="channels">
    <Channels />
  </article>
</div>

<style lang="scss">
  article {
    color: var(--sl-color-neutral-900);
    display: flex;
    align-items: center;
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
