<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import type { PageData } from "./$types";
  import H1 from "$lib/components/heading/H1.svelte";
  import UsernameInput from "$lib/components/input/UsernameInput.svelte";
  import SubmitButton from "$lib/components/button/SubmitButton.svelte";
  import RoastOutput from "$lib/output/RoastOutput.svelte";
  import FooterLink from "$lib/components/anchor/FooterLink.svelte";
  import * as Dialog from "$lib/components/ui/dialog";
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
  <meta name="description" content="Roast your GitHub profile with AI" />
</svelte:head>

<main
  class="container mx-auto max-w-3xl py-8 md:py-16 font-sans min-h-dvh grid grid-rows-[1fr_auto] space-y-8"
>
  <div class="space-y-6">
    <H1>GitHub Profile Roasting 🔥🔥🔥</H1>
    <form method="post" use:enhance class="flex space-x-2 items-center">
      <UsernameInput
        value={$form.username}
        constraints={$constraints.username}
        errors={$errors.username}
      />
      <SubmitButton delayed={$delayed}>Roast 🔥</SubmitButton>
    </form>

    <RoastOutput
      delayed={$delayed}
      type={$message?.type}
      text={$message?.text}
      username={$form.username}
    />
  </div>

  <footer class="text-center text-sm text-slate-500">
    Forked by
    <FooterLink href="https://github.com/tfkhdyt" newTab>tfkhdyt</FooterLink>
    |
    <FooterLink href="https://github.com/tfkhdyt/roastgithub" newTab
      >Source Code</FooterLink
    > |
    <Dialog.Root>
      <Dialog.Trigger
        class="underline hover:text-slate-400 transition font-semibold"
        >Support Me</Dialog.Trigger
      >
      <Dialog.Content class="space-y-2">
        <Dialog.Header>
          <Dialog.Title>Donation</Dialog.Title>
          <Dialog.Description>
            If you like this project, please consider donating to support me.
          </Dialog.Description>
        </Dialog.Header>
        <a href="https://saweria.co/tfkhdyt" target="_blank">
          <enhanced:img
            src="../assets/images/saweria.png"
            alt="QRIS"
            class="w-72 h-auto mx-auto"
          />
        </a>
      </Dialog.Content>
    </Dialog.Root>
  </footer>
</main>
