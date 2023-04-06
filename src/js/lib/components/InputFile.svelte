<script lang="ts">
  import { getFileName } from "@/main/main.svelte";
  import { writable } from "svelte/store";

  export let handleFileSelect: () => void;
  export let filePath = writable<string | undefined>(undefined);
</script>

<div>
  <label class="label" for="mogrt-select">
    <span class="label-text">字幕の生成に使うMoGRTファイルを選択</span>
  </label>
  <div
    class="flex flex-row rounded-sm border border-neutral-700 overflow-hidden"
  >
    <button
      class="btn btn-sm btn-secondary"
      on:click|preventDefault={handleFileSelect}
    >
      参照
    </button>
    <div class="bg-base-100 grow flex overflow-auto">
      <div class="m-auto">
        {#if $filePath}
          {#await getFileName($filePath)}
            <span>ファイルが選択されていません</span>
          {:then stem}
            <span>{stem}</span>
          {/await}
        {:else}
          <span>ファイルが選択されていません</span>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
</style>
