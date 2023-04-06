<script lang="ts">
  import { getFileName } from "@/main/main.svelte";
  import { writable } from "svelte/store";

  export let label: string;
  export let handleFileSelect: () => void;
  export let filePath = writable<string | undefined>(undefined);
  export let shouldOnlyShowFileName = true;
</script>

<div>
  <label class="label" for="mogrt-select">
    <span class="label-text">{label}</span>
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
          {#if shouldOnlyShowFileName}
            {#await getFileName($filePath)}
              <span>ファイルが選択されていません</span>
            {:then stem}
              <span>{stem}</span>
            {/await}
          {:else}
            <span>{$filePath}</span>
          {/if}
        {:else}
          <span>ファイルが選択されていません</span>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
</style>
