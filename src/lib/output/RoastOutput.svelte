<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";

  export let delayed: boolean;
  export let type: "success" | "error" | undefined;
  export let text: string | undefined;
  export let username: string;
</script>

<div class="space-y-2 leading-relaxed">
  {#if delayed}
    <p>Please wait...</p>
  {:else if type === "success"}
    <h2 class="text-2xl font-semibold">Roasting for {username}</h2>
    <SvelteMarkdown source={text} />
  {:else if type === "error"}
    <h2 class="text-2xl font-semibold">Error</h2>
    <p>{text}</p>
  {:else}
    <p>Enter a GitHub username to get started.</p>
  {/if}
</div>
