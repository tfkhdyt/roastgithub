<script lang="ts">
  import "../app.css";
  import { superForm } from "sveltekit-superforms";
  import type { PageData } from "./$types";
  import SvelteMarkdown from "svelte-markdown";
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
<main>
  <h1>GitHub Profile Roasting 🔥🔥🔥</h1>
  <form method="post" use:enhance>
    <input
      type="text"
      name="username"
      tabindex={1}
      bind:value={$form.username}
      {...$constraints.username}
      placeholder="Enter GitHub username"
    />
    <button tabindex={3} disabled={$delayed} type="submit">
      {#if $delayed}
        Loading...
      {:else}
        Submit
      {/if}
    </button><br />
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

  {#if $message?.type === "success"}
    <h2>Roasting Result</h2>
    <SvelteMarkdown source={$message.text} />
  {:else if $message?.type === "error"}
    <h2>Error</h2>
    <p>{$message.text}</p>
  {:else if $delayed}
    <p>Please wait...</p>
  {:else}
    <p>Enter a GitHub username to get started.</p>
  {/if}
</main>

<style>
  main {
    padding: 1em;
    max-width: 800px;
    margin: 0 auto;
  }
  input {
    margin-right: 0.5em;
    padding: 0.5em;
    background-color: #8a99ae;
    width: 200px;
  }
  input::placeholder {
    color: rgb(67, 79, 96);
  }
  button {
    padding: 0.5em;
    background-color: #8a99ae;
  }
</style>
