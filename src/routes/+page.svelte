<script lang="ts">
  import "../app.css";
  import { superForm } from "sveltekit-superforms";
  import type { PageData } from "./$types";
  import SvelteMarkdown from "svelte-markdown";

  export let data: PageData;
  const { form, errors, constraints, message, enhance, delayed } = superForm(
    data.form
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
      bind:value={$form.username}
      {...$constraints.username}
      placeholder="Enter GitHub username"
    />
    {#if $errors.username}
      <p>{$errors.username}</p>
    {/if}
    <button>Submit</button>
  </form>

  {#if !!$message}
    <h2>Roasting Result</h2>
    <SvelteMarkdown source={$message} />
  {:else if $delayed}
    <p>Loading...</p>
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
  }
  input::placeholder {
    color: rgb(67, 79, 96);
  }
  button {
    padding: 0.5em;
    background-color: #8a99ae;
  }
</style>
