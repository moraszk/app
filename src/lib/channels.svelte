<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  let csatornalista: any = {};

  let int: NodeJS.Timer;
  const update = () => {
    fetch('https://iptv.mora.u-szeged.hu/csatornalista.json')
      .then((response) => response.json())
      .then((data) => {
        csatornalista = data;
      });
  };
  onMount(async () => {
    import('@shoelace-style/shoelace/dist/components/card/card.js');

    update();
    const ONE_MINUTE = 60000;
    setInterval(update, 10 * ONE_MINUTE);
  });
  onDestroy(() => {
    clearInterval(int);
  });
</script>

<div class="card-wrapper">
  {#each Object.keys(csatornalista) as csatorna}
    <sl-card class="card-header">
      <div slot="header">
        <b>{csatorna.slice(0, 16)}</b>
        <span class="time">
          {(csatornalista[csatorna][0]?.start.slice(8, 10) ?? '') +
            ':' +
            (csatornalista[csatorna][0]?.start.slice(10, 12) ?? '')} - {(csatornalista[
            csatorna
          ][0]?.stop.slice(8, 10) ?? '') +
            ':' +
            (csatornalista[csatorna][0]?.stop.slice(10, 12) ?? '')}
        </span>
      </div>

      <ul>
        <li>
          most: <em> {csatornalista[csatorna][0]?.title ?? ''}</em>
        </li>
        <li>
          utána: <em> {csatornalista[csatorna][1]?.title ?? ''} </em>
        </li>
      </ul>
    </sl-card>
  {/each}
</div>

<style lang="scss">
  .card-header [slot='header'] {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  sl-card {
    width: 100%;
    height: 125px;
    --border-color: transparent;

    margin: 4px;
  }
  sl-card > :global(*) {
    background-color: transparent;
  }
  ul {
    list-style: none;
    padding: 0; /* Remove padding */
    margin: 0;
  }
  li {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .time {
    text-align: right;
    float: right;
    color: var(--sl-color-neutral-600);
  }
  .card-wrapper {
    width: 100%;
  }
  @media screen and (min-width: $br-md) {
    sl-card {
      width: 270px;
    }
  }
</style>
