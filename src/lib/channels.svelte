<script lang="ts">
  import { onMount } from 'svelte';
  let csatornalista: any = {};

  onMount(async () => {
    import('@shoelace-style/shoelace/dist/components/card/card.js');
    csatornalista = await fetch('https://iptv.mora.u-szeged.hu/csatornalista.json').then((x) =>
      x.json()
    );
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

<style>
  .card-header [slot='header'] {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  sl-card {
    width: 270px;
    min-width: 270px;
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
</style>
