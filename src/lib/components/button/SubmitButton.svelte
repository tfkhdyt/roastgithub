<script lang="ts">
  import { LoaderCircleIcon } from "lucide-svelte";
  import { Button } from "../ui/button";

  export let delayed: boolean;
</script>

<Button tabindex={3} disabled={delayed} type="submit">
  {#if delayed}
    <LoaderCircleIcon class="animate-spin" />
  {:else}
    <slot />
  {/if}
</Button>
