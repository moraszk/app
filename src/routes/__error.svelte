<script context="module" lang="ts">
  export function load(args: any) {
    return {
      props: {
        title: `${args.status}: ${args.error?.message || 'Unknown'}`,
        json: JSON.stringify(args, null, 5),
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
    margin-left: 16rem;
    margin-left: var(--nav-width);
  }
</style>
