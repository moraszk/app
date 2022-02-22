<script lang="ts">
  import CustomPrerender from '$lib/CustomPrerender.svelte';
  import Skipper from './Skipper.svelte';
  import Install from './Install.svelte';
  import { theme, amoled } from '$lib/storage/theme';
  import { status } from '$lib/storage/captive';

  $: fullTheme = $theme == 'dark' ? ($amoled ? 'black' : 'dark') : 'light';

  function setTheme(fullTheme: 'light' | 'dark' | 'black') {
    if (fullTheme == 'light') return theme.set('light');
    theme.set('dark');
    amoled.set(fullTheme == 'black');
  }

  export let open = false;

  let prompt: () => unknown;
</script>

<Skipper />
<input type="checkbox" name="nav-toggler" id="nav-toggler" bind:checked={open} />
<nav id="nav">
  <span class="nav-opener" on:click={() => (open = true)} />
  <span class="nav-opener left" on:click={() => (open = true)} />

  <ul class="nav-header">
    <li>
      <label for="nav-toggler">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a class="nav-title">
          <svg class="icon" viewBox="0 0 448 512">
            <g>
              <path
                d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
              />
              <path
                d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
              />
            </g>
          </svg>
          <span class="label title">Moraweb</span>
        </a>
      </label>
    </li>
  </ul>
  <ul class="nav-items" on:click={() => (open = false)}>
    <li>
      <a href="/" class="nav-item">
        <CustomPrerender>
          <svg width="32" height="25.6" viewBox="0 0 640 512">
            <path
              d="M640 264v-16c0-8.84-7.16-16-16-16H344v-40h72c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32H224c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h72v40H16c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h104v40H64c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32h-56v-40h304v40h-56c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32h-56v-40h104c8.84 0 16-7.16 16-16zM256 128V64h128v64H256zm-64 320H96v-64h96v64zm352 0h-96v-64h96v64z"
            />
          </svg>
        </CustomPrerender>
        <span class="label">Bejelentkezés</span>
      </a>
    </li>
    <li>
      <a href="/regisztracio" class="nav-item">
        <CustomPrerender>
          <svg width="32" height="25.6" viewBox="0 0 640 512">
            <path
              d="M224 256A128 128 0 1 0 96 128a128 128 0 0 0 128 128zm96 64a63.08 63.08 0 0 1 8.1-30.5c-4.8-.5-9.5-1.5-14.5-1.5h-16.7a174.08 174.08 0 0 1-145.8 0h-16.7A134.43 134.43 0 0 0 0 422.4V464a48 48 0 0 0 48 48h280.9a63.54 63.54 0 0 1-8.9-32zm288-32h-32v-80a80 80 0 0 0-160 0v80h-32a32 32 0 0 0-32 32v160a32 32 0 0 0 32 32h224a32 32 0 0 0 32-32V320a32 32 0 0 0-32-32zM496 432a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm32-144h-64v-80a32 32 0 0 1 64 0z"
            />
          </svg>
        </CustomPrerender>

        <span class="label">Regisztráció</span>
      </a>
    </li>
    <li>
      <a
        href="https://zulip.mora.u-szeged.hu"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-item"
      >
        <CustomPrerender>
          <svg width="32" height="25.6" viewBox="0 0 640 512">
            <path
              d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"
            />
          </svg>
        </CustomPrerender>
        <span class="label">Zulip</span>
      </a>
    </li>
    <li class:disabled={!$status.username}>
      <a
        href="https://maci.mora.u-szeged.hu"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-item"
      >
        <CustomPrerender>
          <svg width="32" height="28.444444444444443" viewBox="0 0 576 512">
            <path
              d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"
            />
          </svg>
        </CustomPrerender>
        <span class="label">Maci</span>
      </a>
    </li>
    <li class:disabled={!$status.username}>
      <a
        href="https://speedtest.mora.u-szeged.hu"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-item"
      >
        <CustomPrerender>
          <svg width="32" height="25.6" viewBox="0 0 640 512">
            <path
              d="M592.604 208.244C559.735 192.836 515.777 184 472 184H186.327c-4.952-6.555-10.585-11.978-16.72-16H376C229.157 137.747 219.403 32 96.003 32H96v128H80V32c-26.51 0-48 28.654-48 64v64c-23.197 0-32 10.032-32 24v40c0 13.983 8.819 24 32 24v16c-23.197 0-32 10.032-32 24v40c0 13.983 8.819 24 32 24v64c0 35.346 21.49 64 48 64V352h16v128h.003c123.4 0 133.154-105.747 279.997-136H169.606c6.135-4.022 11.768-9.445 16.72-16H472c43.777 0 87.735-8.836 120.604-24.244C622.282 289.845 640 271.992 640 256s-17.718-33.845-47.396-47.756zM488 296a8 8 0 0 1-8-8v-64a8 8 0 0 1 8-8c31.909 0 31.942 80 0 80z"
            />
          </svg>
        </CustomPrerender>
        <span class="label">Speedtest</span>
      </a>
    </li>
    <li class:disabled={!$status.username}>
      <a
        href="https://support.mora.u-szeged.hu"
        class="nav-item"
        target="_blank"
        rel="noopener noreferrer"
      >
        <CustomPrerender>
          <svg width="32" height="32" viewBox="0 0 512 512">
            <path
              d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"
            />
          </svg>
        </CustomPrerender>
        <span class="label">Support</span>
      </a>
    </li>
    <li class:disabled={!$status.username}>
      <a
        href="https://drive.mora.u-szeged.hu"
        class="nav-item"
        target="_blank"
        rel="noopener noreferrer"
      >
        <CustomPrerender>
          <svg width="32" height="28.444444444444443" viewBox="0 0 576 512"
            ><path
              id="path-0"
              d="M576 304v96c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48v-96c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48zm-48-80a79.557 79.557 0 0 1 30.777 6.165L462.25 85.374A48.003 48.003 0 0 0 422.311 64H153.689a48 48 0 0 0-39.938 21.374L17.223 230.165A79.557 79.557 0 0 1 48 224h480zm-48 96c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm-96 0c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z"
            />
          </svg>
        </CustomPrerender>
        <span class="label">Tárhely</span>
      </a>
    </li>
    <li>
      <a href="/experimental" class="nav-item">
        <CustomPrerender>
          <svg width="32" height="32" viewBox="0 0 512 512">
            <g>
              <path
                d="M501.70312,224H448V160H368V96h48V66.67383A246.86934,246.86934,0,0,0,256,8C119.03125,8,8,119.0332,8,256a250.017,250.017,0,0,0,1.72656,28.26562C81.19531,306.76953,165.47656,320,256,320s174.80469-13.23047,246.27344-35.73438A250.017,250.017,0,0,0,504,256,248.44936,248.44936,0,0,0,501.70312,224ZM192,240a80,80,0,1,1,80-80A80.00021,80.00021,0,0,1,192,240ZM384,343.13867A940.33806,940.33806,0,0,1,256,352c-87.34375,0-168.71094-11.46094-239.28906-31.73633C45.05859,426.01953,141.29688,504,256,504a247.45808,247.45808,0,0,0,192-91.0918V384H384Z"
              />
              <path
                d="M256,320c-90.52344,0-174.80469-13.23047-246.27344-35.73438a246.11376,246.11376,0,0,0,6.98438,35.998C87.28906,340.53906,168.65625,352,256,352s168.71094-11.46094,239.28906-31.73633a246.11376,246.11376,0,0,0,6.98438-35.998C430.80469,306.76953,346.52344,320,256,320Zm-64-80a80,80,0,1,0-80-80A80.00021,80.00021,0,0,0,192,240Zm0-104a24,24,0,1,1-24,24A23.99993,23.99993,0,0,1,192,136Z"
              />
            </g>
          </svg>
        </CustomPrerender>
        <span class="label">Fejlesztés alatt</span>
      </a>
    </li>
    <li class="seperator" />
    <CustomPrerender>
      <Install bind:prompt>
        <li>
          <a href="./" class="nav-item" on:click={prompt}>
            <svg width="32" height="32" viewBox="0 0 512 512">
              <path
                d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
              />
            </svg>
            <span class="label">Telepítés </span>
          </a>
        </li>
      </Install>
    </CustomPrerender>
    <li>
      <a href="/szabalyzat" class="nav-item">
        <CustomPrerender>
          <svg width="32" height="32" viewBox="0 0 512 512">
            <path
              d="M504.971 199.362l-22.627-22.627c-9.373-9.373-24.569-9.373-33.941 0l-5.657 5.657L329.608 69.255l5.657-5.657c9.373-9.373 9.373-24.569 0-33.941L312.638 7.029c-9.373-9.373-24.569-9.373-33.941 0L154.246 131.48c-9.373 9.373-9.373 24.569 0 33.941l22.627 22.627c9.373 9.373 24.569 9.373 33.941 0l5.657-5.657 39.598 39.598-81.04 81.04-5.657-5.657c-12.497-12.497-32.758-12.497-45.255 0L9.373 412.118c-12.497 12.497-12.497 32.758 0 45.255l45.255 45.255c12.497 12.497 32.758 12.497 45.255 0l114.745-114.745c12.497-12.497 12.497-32.758 0-45.255l-5.657-5.657 81.04-81.04 39.598 39.598-5.657 5.657c-9.373 9.373-9.373 24.569 0 33.941l22.627 22.627c9.373 9.373 24.569 9.373 33.941 0l124.451-124.451c9.372-9.372 9.372-24.568 0-33.941z"
            />
          </svg>
        </CustomPrerender>
        <span class="label">Szabályzat</span>
      </a>
    </li>
    <li id="nav-theme" on:click={() => setTimeout(() => (open = true), 0)}>
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a
        href=""
        title="light theme"
        class:active={fullTheme == 'light'}
        on:click={() => setTheme('light')}
      >
        <CustomPrerender>
          <svg width="32" height="32" viewBox="0 0 512 512">
            <path
              d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"
            />
          </svg>
          <span slot="prerender">világos téma</span>
        </CustomPrerender>
      </a>
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a
        href=""
        title="dark theme"
        class:active={fullTheme == 'dark'}
        on:click={() => setTheme('dark')}
      >
        <CustomPrerender>
          <svg width="32" height="28.444444444444443" viewBox="0 0 576 512">
            <path
              d="M342.8 352.7c5.7-9.6 9.2-20.7 9.2-32.7 0-35.3-28.7-64-64-64-17.2 0-32.8 6.9-44.3 17.9-16.3-29.6-47.5-49.9-83.7-49.9-53 0-96 43-96 96 0 2 .5 3.8.6 5.7C27.1 338.8 0 374.1 0 416c0 53 43 96 96 96h240c44.2 0 80-35.8 80-80 0-41.9-32.3-75.8-73.2-79.3zm222.5-54.3c-93.1 17.7-178.5-53.7-178.5-147.7 0-54.2 29-104 76.1-130.8 7.3-4.1 5.4-15.1-2.8-16.7C448.4 1.1 436.7 0 425 0 319.1 0 233.1 85.9 233.1 192c0 8.5.7 16.8 1.8 25 5.9 4.3 11.6 8.9 16.7 14.2 11.4-4.7 23.7-7.2 36.4-7.2 52.9 0 96 43.1 96 96 0 3.6-.2 7.2-.6 10.7 23.6 10.8 42.4 29.5 53.5 52.6 54.4-3.4 103.7-29.3 137.1-70.4 5.3-6.5-.5-16.1-8.7-14.5z"
            />
          </svg>
          <span slot="prerender">sötét téma</span>
        </CustomPrerender>
      </a>
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a
        href=""
        title="amoled dark theme"
        class:active={fullTheme == 'black'}
        on:click={() => setTheme('black')}
      >
        <CustomPrerender>
          <svg width="32" height="32" viewBox="0 0 512 512">
            <path
              d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"
            />
          </svg>
          <span slot="prerender">fekete téma</span>
        </CustomPrerender>
      </a>
    </li>
  </ul>
</nav>
<label for="nav-toggler" class="nav-overlay" />

<style lang="scss">
  .nav-overlay {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgb(0 0 0 / 0.25);
  }
  // Enable nav overlay above content
  #nav-toggler:checked ~ .nav-overlay {
    display: block;
  }
  nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;

    display: flex;
    flex-direction: column; // mobile

    max-width: 75%;
    transition: width 400ms 150ms ease, box-shadow 400ms 150ms, var(--style-transition);
    box-shadow: 0px 0 10px 0 rgb(0 0 0 / 0);
    --nav-open: 0;
    width: 5rem;
    height: 5rem;
    background-color: transparent;

    #nav-toggler:checked ~ & {
      box-shadow: 0 0 10px 0 rgb(0 0 0 / 0.2);
      --nav-open: 1;
      width: 15.5rem;
      height: 100%;
      background-color: var(--sl-color-neutral-0);
    }
  }
  ul {
    overflow-x: hidden;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }
  li {
    display: flex;
    width: 100%;
    &.disabled {
      filter: grayscale(1) opacity(0.5);
      a {
        filter: none;
      }
    }
    & a {
      &[target='_blank']::after {
        color: var(--sl-color-neutral-500);
        margin-left: 3px;
        font-size: 0.75em;
        content: 'launch';
        font-family: 'Material Icons';
      }
      text-decoration: none;
      color: #ff7eee;
      display: flex;
      align-items: center;
      filter: grayscale(1) opacity(0.85);
      height: 3rem;
      width: 100%;
      &:hover {
        filter: grayscale(0) opacity(1);
        background-color: var(--sl-color-neutral-50);
      }
      & > * {
        padding-left: 24px;
      }
    }
  }
  .nav-header {
    label {
      display: flex;
      width: 100%;
    }
    a {
      height: 5rem;
      padding: 0 24px;
      filter: none;
    }
    .icon {
      width: 2rem;
      padding: 0;
      transition: transform 400ms;
      transform: rotate(calc(var(--nav-open) * -180deg));
      & path:first-child {
        color: #df49a6;
      }
    }
    .label {
      font-weight: bold;
      text-transform: uppercase;
      font-size: 1.5em;
      letter-spacing: 0.3ch;
      color: var(--sl-color-neutral-900);
    }
  }
  .nav-items {
    flex: 2;
    flex-direction: column; // mobile
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      width: 0;
    }
    &:hover {
      scrollbar-width: thin;
      &::-webkit-scrollbar {
        width: 0.1em;
      }
    }
    scrollbar-color: #6649b888 #1e1e2430;
    &::-webkit-scrollbar-track {
      background: #1e1e2430;
    }

    &::-webkit-scrollbar-thumb {
      background: #6649b888;
    }
    .label {
      white-space: nowrap;
      color: var(--sl-color-neutral-900);
    }
  }
  #nav-theme {
    display: flex;
    justify-content: flex-start;
    overflow-x: clip;
    text-align: center; // prerender text
    & > a {
      height: 5rem;
      width: 5rem;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 25%;
      transition: filter 400ms;
      color: var(--sl-color-neutral-900);
      filter: opacity(0.4);
      & > svg {
        margin: 0;
        padding: 0 1.5rem;
      }
      &.active {
        filter: grayscale(0%);
        color: #c5a501;
      }
      &:hover {
        filter: grayscale(0%);
        background-color: #5858581a;
        color: #c5a501;
      }
    }
    &:hover > *:not(:hover) {
      filter: grayscale(100%) opacity(0.4) !important;
    }
  }
  svg {
    min-width: 2rem; // used when parent in a flexbox
    width: 2rem;
    max-height: 2rem;
    fill: currentColor;
  }
  .seperator {
    margin-top: auto;
    margin-bottom: auto;
  }
  .nav-opener {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    &.left {
      right: unset;
      left: 0;
    }
  }

  #nav-toggler {
    display: none;
  }
  @media screen and (min-width: $br-md) {
    .nav-overlay {
      width: 0;
    }
    nav {
      box-shadow: none !important;
      flex-direction: column;
      right: unset;
      left: 0;
      min-height: 100%;

      width: 5rem !important;
      --nav-open: 0 !important;
      &:hover,
      &:focus-within {
        --nav-open: 1 !important;
        width: 15.5rem !important;
        background-color: var(--sl-color-neutral-0);
      }
    }
    li a,
    .nav-header a {
      filter: grayscale(1) opacity(0.85);
    }
    .nav-items {
      // min-height: 100%;
      flex-direction: column;
    }
    .nav-title {
      flex-direction: row-reverse;
      .label {
        text-align: center;
        // padding: 0;
        position: absolute;
        transition: left 400ms 150ms;
        left: calc((1 - var(--nav-open)) * -200px);
      }
    }
  }
  @media screen and (min-width: $br-xl) {
    nav {
      --nav-open: 1 !important;
      width: 15.5rem !important;
      background-color: var(--sl-color-neutral-50) !important;
    }
  }
</style>
