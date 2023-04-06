<script lang="ts">
  import { connectToVoicevox } from "@/main/main.svelte";
</script>

<div class="flex flex-col gap-4 mx-2">
  <article class="mt-4">
    <slot />
  </article>
  <button class="btn btn-sm btn-error" on:click={connectToVoicevox}>
    再度VOICEVOXへ接続する
  </button>
</div>

<style>
</style>
