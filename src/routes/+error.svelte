<script>
  import { page } from '$app/stores';
  $: details = (() => {
    const { error = {}, ...rest } = $page;
    return JSON.stringify(
      {
        ...rest,
        error: error.message || error,
      },
      null,
      2
    );
  })();
  // $: title = {$page.status} - {page.error?.message || JSON.stringify($page.error)}
</script>

<svelte:head>
  <title>Error {$page.status}</title>
</svelte:head>

<section>
  <h1>
    {$page.status} - {$page.error?.message || JSON.stringify($page.error || 'Unknown error')}
  </h1>

  <code>
    {details}
  </code>

  <h3>Gyorslinkek</h3>
  <ul>
    <li>
      <a href="/">Vissza a főoldalra</a>
    </li>
    <li>
      <a href="https://captiveportal.mora.u-szeged.hu/status">A régi státuszoldal</a>
    </li>
  </ul>
</section>

<style>
  section {
    /* max-width: 600px; */
    padding-top: 5rem;
    margin-left: 16rem;
    margin-left: var(--nav-width);
  }
  code {
    overflow-x: scroll;
    line-break: anywhere;
  }
</style>
