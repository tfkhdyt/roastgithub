<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import type { PageData } from "./$types";
  import H1 from "$lib/components/heading/H1.svelte";
  import UsernameInput from "$lib/components/input/UsernameInput.svelte";
  import SubmitButton from "$lib/components/button/SubmitButton.svelte";
  import RoastOutput from "$lib/output/RoastOutput.svelte";
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
  <meta name="description" content="Roast your GitHub profile" />
</svelte:head>

<main class="container mx-auto max-w-3xl py-16 space-y-6 font-sans">
  <H1>GitHub Profile Roasting 🔥🔥🔥</H1>
  <form method="post" use:enhance class="flex space-x-2 items-center">
    <UsernameInput
      value={$form.username}
      constraints={$constraints.username}
      errors={$errors.username}
    />
    <SubmitButton delayed={$delayed}>Roast 🔥</SubmitButton>
  </form>

  <RoastOutput delayed={$delayed} type={$message?.type} text={$message?.text} />
</main>
