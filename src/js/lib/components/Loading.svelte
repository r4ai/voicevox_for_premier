<script lang="ts">
  import { Diamonds } from "svelte-loading-spinners";

  export let msg: string;
</script>

<div class="flex flex-col gap-4 mx-2 items-center">
  <p class="text-center mt-4">{msg}</p>
  <Diamonds />
</div>

<style>
</style>
