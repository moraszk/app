<script lang="ts">
  import { onMount } from 'svelte';
  // import '@fontsource/material-icons'; // Defaults to weight 400.
  import { amoled } from '$lib/storage/theme';
  import { status } from '$lib/storage/captive';
  // import { browser } from '$app/env';
  $: error = { success: false, message: '' };
  let alert: any;

  let initUsername = $status.username;

  $: username = initUsername || null;

  // set username from captiveportal on load
  status.subscribe((x) => {
    if (x.username && username === null) {
      username = x.username;
    }
  });

  async function onSubmit(e: CustomEvent) {
    const { formData } = e.detail;
    const json = {} as any;
    formData.forEach((value: any, key: string | number) => (json[key as any] = value));

    const result = await fetch('https://acc.mora.u-szeged.hu/register', {
      method: 'POST',
      body: JSON.stringify(json),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          error = { success: false, message: 'Sikertelen regisztráció' };

          error = { ...error, message: (await res.json()).message };

          console.log(error);
        } else {
          error = { success: true, message: 'Sikeres regisztráció' };

          error = { ...error, message: (await res.json()).message || 'Sikeres regisztráció' };

          console.log(error);
        }
      })
      .catch((err) => {
        console.error(err);
        error = { success: false, message: 'Nem sikerült csatlakozni a szerverhez' };
      })
      .finally(() => alert && alert.toast());
    console.log(result);
  }

  $: loading = true;

  onMount(async () => {
    import('@shoelace-style/shoelace/dist/components/spinner/spinner.js');

    await Promise.all([
      import('@shoelace-style/shoelace/dist/components/alert/alert.js'),
      import('@shoelace-style/shoelace/dist/components/form/form.js'),
      import('@shoelace-style/shoelace/dist/components/input/input.js'),
      import('@shoelace-style/shoelace/dist/components/select/select.js'),
      import('@shoelace-style/shoelace/dist/components/menu-item/menu-item.js'),
      import('@shoelace-style/shoelace/dist/components/menu-label/menu-label.js'),
      import('@shoelace-style/shoelace/dist/components/divider/divider.js'),
      import('@shoelace-style/shoelace/dist/components/checkbox/checkbox.js'),
      import('@shoelace-style/shoelace/dist/components/button/button.js'),
      import('@shoelace-style/shoelace/dist/components/icon/icon.js'),
      import('@shoelace-style/shoelace/dist/components/alert/alert.js'),
    ]).then(() => (loading = false));
  });
</script>

<section id="registration">
  <header class:text-center={loading}>
    <h2 class="title">Hálózati regisztráció</h2>

    <p>
      Ahhoz, hogy használni tudd a kollégiumi hálózatot a következő félévben is, frissítened kell az
      adataidat. <a href="https://acc.mora.u-szeged.hu"
        >Jelszó változtatás</a> (utána újra kell regisztrálnod és azt fogja kiírni, hogy a felhasználó már létezik)
    </p>

    <sl-alert
      bind:this={alert}
      variant={error.success ? 'success' : 'danger'}
      duration="10000"
      closable
    >
      <strong>{error.message}</strong>
    </sl-alert>
  </header>

  {#if loading}
    <sl-spinner class="spinner" />
    <p class="text-center">Oldal betöltése...</p>
  {:else}
    <sl-form class="form-overview" on:sl-submit={onSubmit}>
      <sl-input
        value={username || ''}
        filled={!$amoled}
        required
        name="username"
        variant="text"
        label="felhasználónév"
        spellcheck="false"
        clearable
      >
        <span class="material-icons" slot="prefix"> login </span>
      </sl-input>

      <sl-input
        filled={!$amoled}
        required
        spellcheck="false"
        name="password"
        variant="text"
        label="jelenlegi jelszó"
        placeholder="***"
        type="password"
        toggle-password
      >
        <span class="material-icons" slot="prefix"> pin </span>
      </sl-input>

      <sl-input
        filled={!$amoled}
        required
        name="firstname"
        variant="text"
        autocomplete="on"
        label="vezetéknév"
        placeholder="Gipsz"
        clearable
      >
        <span class="material-icons" slot="prefix"> people </span>
      </sl-input>

      <sl-input
        filled={!$amoled}
        required
        name="surname"
        variant="text"
        autocomplete="on"
        label="keresztnév"
        placeholder="Jakab"
        clearable
      >
        <span class="material-icons" slot="prefix"> people </span>
      </sl-input>

      <sl-select filled={!$amoled} required name="room" label="szobaszám" clearable>
        <span class="material-icons" slot="prefix"> place </span>
        <sl-menu-label>Legjobb emelet</sl-menu-label>
        <sl-menu-item value="roomid_66.in">1/1</sl-menu-item>
        <sl-menu-item value="roomid_67.in">1/2</sl-menu-item>
        <sl-menu-item value="roomid_68.in">1/3</sl-menu-item>
        <sl-menu-item value="roomid_69.in">1/4</sl-menu-item>
        <sl-menu-item value="roomid_70.in">1/5</sl-menu-item>
        <sl-menu-item value="roomid_71.in">1/6</sl-menu-item>
        <sl-menu-item value="roomid_72.in">1/7</sl-menu-item>
        <sl-menu-item value="roomid_73.in">1/8</sl-menu-item>
        <sl-menu-item value="roomid_74.in">1/9</sl-menu-item>
        <sl-menu-item value="roomid_127.in">1/9¾</sl-menu-item>
        <sl-menu-item value="roomid_75.in">1/10</sl-menu-item>
        <sl-menu-item value="roomid_128.in">1/vendég</sl-menu-item>
        <sl-divider />
        <sl-menu-label>Második emelet</sl-menu-label>
        <sl-menu-item value="roomid_76.in">2/11</sl-menu-item>
        <sl-menu-item value="roomid_77.in">2/12</sl-menu-item>
        <sl-menu-item value="roomid_78.in">2/13</sl-menu-item>
        <sl-menu-item value="roomid_79.in">2/14</sl-menu-item>
        <sl-menu-item value="roomid_80.in">2/15</sl-menu-item>
        <sl-menu-item value="roomid_81.in">2/16</sl-menu-item>
        <sl-menu-item value="roomid_82.in">2/17</sl-menu-item>
        <sl-menu-item value="roomid_83.in">2/18</sl-menu-item>
        <sl-menu-item value="roomid_84.in">2/19</sl-menu-item>
        <sl-menu-item value="roomid_85.in">2/20</sl-menu-item>
        <sl-menu-item value="roomid_129.in">2/senior</sl-menu-item>
        <sl-divider />
        <sl-menu-label>Harmadik emelet</sl-menu-label>
        <sl-menu-item value="roomid_86.in">3/21</sl-menu-item>
        <sl-menu-item value="roomid_87.in">3/22</sl-menu-item>
        <sl-menu-item value="roomid_88.in">3/23</sl-menu-item>
        <sl-menu-item value="roomid_89.in">3/24</sl-menu-item>
        <sl-menu-item value="roomid_90.in">3/25</sl-menu-item>
        <sl-menu-item value="roomid_91.in">3/26</sl-menu-item>
        <sl-menu-item value="roomid_92.in">3/27</sl-menu-item>
        <sl-menu-item value="roomid_93.in">3/28</sl-menu-item>
        <sl-menu-item value="roomid_94.in">3/29</sl-menu-item>
        <sl-menu-item value="roomid_95.in">3/30</sl-menu-item>
        <sl-menu-item value="roomid_130.in">3/senior</sl-menu-item>
        <sl-menu-item value="roomid_131.in">3/vasaló</sl-menu-item>
        <sl-divider />
        <sl-menu-label>Negyedik emelet</sl-menu-label>
        <sl-menu-item value="roomid_96.in">4/31</sl-menu-item>
        <sl-menu-item value="roomid_97.in">4/32</sl-menu-item>
        <sl-menu-item value="roomid_98.in">4/33</sl-menu-item>
        <sl-menu-item value="roomid_99.in">4/34</sl-menu-item>
        <sl-menu-item value="roomid_135.in">4/35</sl-menu-item>
        <sl-menu-item value="roomid_101.in">4/36</sl-menu-item>
        <sl-menu-item value="roomid_102.in">4/37</sl-menu-item>
        <sl-menu-item value="roomid_103.in">4/38</sl-menu-item>
        <sl-menu-item value="roomid_104.in">4/39</sl-menu-item>
        <sl-menu-item value="roomid_105.in">4/40</sl-menu-item>
        <sl-menu-item value="roomid_132.in">4/42</sl-menu-item>
        <sl-menu-item value="roomid_133.in">4/43</sl-menu-item>
        <sl-menu-item value="roomid_134.in">4/senior</sl-menu-item>
        <sl-divider />
        <sl-menu-label>Ötödik emelet</sl-menu-label>
        <sl-menu-item value="roomid_106.in">V/1</sl-menu-item>
        <sl-menu-item value="roomid_107.in">V/2</sl-menu-item>
        <sl-menu-item value="roomid_108.in">V/3</sl-menu-item>
        <sl-menu-item value="roomid_109.in">V/4</sl-menu-item>
        <sl-menu-item value="roomid_110.in">V/5</sl-menu-item>
        <sl-menu-item value="roomid_111.in">V/6</sl-menu-item>
        <sl-menu-item value="roomid_112.in">V/7</sl-menu-item>
        <sl-menu-item value="roomid_113.in">V/8</sl-menu-item>
        <sl-menu-item value="roomid_114.in">V/9</sl-menu-item>
        <sl-menu-item value="roomid_115.in">V/10</sl-menu-item>
        <sl-menu-item value="roomid_116.in">V/11</sl-menu-item>
        <sl-menu-item value="roomid_117.in">V/12</sl-menu-item>
        <sl-menu-item value="roomid_118.in">V/13</sl-menu-item>
        <sl-menu-item value="roomid_119.in">V/14</sl-menu-item>
        <sl-menu-item value="roomid_120.in">V/15</sl-menu-item>
        <sl-menu-item value="roomid_121.in">V/16</sl-menu-item>
        <sl-menu-item value="roomid_122.in">V/17</sl-menu-item>
        <sl-menu-item value="roomid_123.in">V/18</sl-menu-item>
        <sl-menu-item value="roomid_124.in">V/19</sl-menu-item>
        <sl-menu-item value="roomid_125.in">V/20</sl-menu-item>
        <sl-menu-item value="roomid_126.in">V/21</sl-menu-item>
      </sl-select>

      <sl-input
        filled={!$amoled}
        name="email"
        variant="text"
        label="email"
        type="email"
        clearable
        help-text="Hogy tudjunk neked értesítéseket küldeni"
      >
        <span class="material-icons" slot="prefix"> email </span>
      </sl-input>

      <!-- {#if !$status.username}
        <div
          style={browser && new URL(window.location.href).searchParams.get('captha')
            ? 'display: none;'
            : ''}
        >
          <p>
            Írd be ezt a szöveget, pontok nélkül:<br />

            <span class="a" style="width: 14px;">m.b.a.t</span>
            <span class="a" style="width: 10px;">o.l.k.o</span>
            <span class="a" style="width: 6px;">r.adiohullámok nélkül</span>
            <span class="a" style="width: 9px;">akadályozza meg a gonosz kínai botokat</span>
          </p>
          <sl-input
            filled={!$amoled}
            value={browser && new URL(window.location.href).searchParams.get('captha')}
            name="szakkoli"
            variant="text"
            placeholder="Írd be a fenti szöveget pontok nélkül"
            pattern="(A|r|o|R|m|O|a|6|á|M)+"
            minlength="4"
            maxlength="4"
            clearable
          >
            <span class="material-icons" slot="prefix"> pan_tool </span>
          </sl-input>
        </div>
      {/if} -->

      <footer>
        <sl-checkbox name="agree" value="yes" required>
          Elolvastam és elfogadom a hálózat használati <a target="_blank" href="/szabalyzat"
            >szabályzatot <span class="external-link material-icons">launch</span>
          </a>
        </sl-checkbox>

        <sl-button variant="primary" class="submit" submit>Submit</sl-button>
      </footer>
    </sl-form>
  {/if}
</section>

<style lang="scss">
  #registration {
    text-align: justify;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    min-height: 90vh;
    margin: 5vh auto 0;
    max-width: 480px;
  }
  header {
    margin-bottom: 1.5em;
  }
  footer,
  a {
    color: var(--sl-color-neutral-700);
  }
  .form-overview > * {
    margin-bottom: 1.2em;
  }
  .submit {
    float: right;
    margin-left: 1em;
  }
  footer {
    display: flex;
    align-items: center;
  }
  .spinner {
    margin: 1rem auto;
    font-size: 3rem;
  }
  .text-center {
    text-align: center;
  }
  sl-button {
    min-width: 100px;
  }
  // .a {
  //   display: inline-block;
  //   white-space: nowrap;
  //   font-size: 16px;
  //   width: 14px;
  //   overflow: hidden;
  //   text-overflow: clip;
  //   text-overflow: ellipsis;
  // }
</style>
