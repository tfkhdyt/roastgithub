<script lang="ts">
  export let href: string;
  export let newTab: boolean = false;
</script>

<a
  {href}
  target={newTab ? "_blank" : undefined}
  class="underline hover:text-slate-400 transition font-semibold"
>
  <slot />
</a>
