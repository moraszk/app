<script lang="ts">
  import type { ApiResult } from './api';

  export let slType = 'input';
  export let value: any;
  export let error: ApiResult;
  export let name: string;
  export let icon = '';
  export let required = true;

  const setValue = (e: any) => {
    value = e.target.value;
  };

  const setCheck = (e: any) => {
    value = e.target.checked;
    console.log(e.target.checked);
  };
</script>

{#if slType === 'input'}
  <sl-input
    {value}
    on:sl-focus={() => {
      if (name && error.fields) delete error.fields[name];
    }}
    on:sl-input={setValue}
    {required}
    {name}
    variant="text"
    clearable
    {...$$restProps}
  >
    <span class="material-icons" slot="prefix"> {icon} </span>
  </sl-input>
{:else if slType === 'select'}
  <sl-select {value} on:sl-change={setValue} {required} {name} {...$$restProps} clearable>
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </sl-select>
{:else if slType === 'checkbox'}
  <sl-checkbox {name} checked={value} on:sl-change={setCheck} required> <slot /> </sl-checkbox>
{:else}
  <slot />
{/if}
{#if name && error.fields?.[name]}
  <sl-alert variant="danger" open closable class="alert-closable">
    <ul>
      {#each error.fields[name] || [] as field}
        <li>{field.message} <code>({field.code})</code></li>
      {/each}
    </ul>
  </sl-alert>
{/if}

<style lang="scss">
  sl-input,
  sl-alert,
  sl-select {
    margin-bottom: 1.2rem;
  }
</style>
