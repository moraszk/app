<script context="module" lang="ts">
  export function load(arg: any) {
    return {
      props: {
        title: `${arg.status}: ${arg.error?.message || 'Unknown'}`,
        json: (JSON.stringify(arg, null, 2) + '').replace(/\\n/g, '\n'),
      },
    };
  }
</script>

<script lang="ts">
  export let title: string;
  export let json: string | void;
</script>

<section>
  <h1>{title}</h1>

  <code>
    {json}
  </code>
</section>

<style>
  section {
    /* max-width: 600px; */
    padding-top: 5rem;
  }
  code {
    overflow-x: scroll;
    line-break: anywhere;
  }
</style>
