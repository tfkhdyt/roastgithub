<script lang="ts">
  import { Input } from "../ui/input";

  export let value: string;
  export let constraints:
    | Partial<{
        pattern: string;
        min: number | string;
        max: number | string;
        required: boolean;
        step: number | "any";
        minlength: number;
        maxlength: number;
      }>
    | undefined;
  export let errors: string[] | undefined;
</script>

<div>
  <Input
    type="text"
    name="username"
    tabindex={1}
    bind:value
    {...constraints}
    placeholder="Enter GitHub username"
    class="max-w-md"
  />
  {#if errors}
    <p class="text-red-500 text-sm">{errors}</p>
  {/if}
</div>
