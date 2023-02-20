<script lang="ts">
  import Register from './register.svelte';
  import type { ApiResult } from './api';
  import { onMount } from 'svelte';
  import type SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert.js';

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

<sl-alert
  bind:this={alert}
  variant={error.success ? 'success' : 'danger'}
  duration="10000"
  closable
>
  <strong>{error.message}</strong>
</sl-alert>

<Register bind:error {alert} {loading} />
