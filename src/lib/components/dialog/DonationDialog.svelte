<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
</script>

<Dialog.Root>
  <Dialog.Trigger
    class="underline hover:text-slate-400 transition font-semibold"
    ><slot /></Dialog.Trigger
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
        src="../../../assets/images/saweria.png"
        alt="QRIS"
        class="w-72 h-auto mx-auto"
      />
    </a>
  </Dialog.Content>
</Dialog.Root>
