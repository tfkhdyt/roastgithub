<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import type { PageData } from "./$types";
  import SvelteMarkdown from "svelte-markdown";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import { LoaderCircle } from "lucide-svelte";
  // import { token } from "../stores/token";

  export let data: PageData;
  const { form, errors, constraints, message, enhance, delayed } = superForm(
    data.form,
    {
      resetForm: false,
    }
  );
</script>

<svelte:head>
  <title>GitHub Profile Roasting 🔥🔥🔥</title>
</svelte:head>
<main class="container mx-auto max-w-3xl py-16 space-y-6 font-sans">
  <h1 class="text-4xl font-bold">GitHub Profile Roasting 🔥🔥🔥</h1>
  <form method="post" use:enhance class="flex space-x-2 items-center">
    <div>
      <Input
        type="text"
        name="username"
        tabindex={1}
        bind:value={$form.username}
        {...$constraints.username}
        placeholder="Enter GitHub username"
        class="max-w-md"
      />
      {#if $errors.username}
        <p class="text-red-500 text-sm">{$errors.username}</p>
      {/if}
    </div>
    <Button tabindex={3} disabled={$delayed} type="submit">
      {#if $delayed}
        <LoaderCircle class="animate-spin" />
      {:else}
        Roast 🔥
      {/if}
    </Button><br />
    {#if $errors.username}
      <p>{$errors.username}</p>
    {/if}
    <!-- <input
      type="password"
      name="token"
      tabindex={2}
      bind:value={$token}
      {...$constraints.token}
      placeholder="Your GitHub Token (Optional)"
    />
    <a href="https://github.com/settings/tokens">
      <button type="button">Get Token</button>
    </a> -->
  </form>

  <div class="space-y-2 leading-relaxed">
    {#if $delayed}
      <p>Please wait...</p>
    {:else if $message?.type === "success"}
      <h2 class="text-2xl font-semibold">Roasting Result</h2>
      <SvelteMarkdown source={$message.text} />
    {:else if $message?.type === "error"}
      <h2 class="text-2xl font-semibold">Error</h2>
      <p>{$message.text}</p>
    {:else}
      <p>Enter a GitHub username to get started.</p>
    {/if}
  </div>
</main>
