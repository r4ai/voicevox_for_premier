<script lang="ts" context="module">
  export async function getOs() {
    return await evalES(`Folder.fs`, true);
  }

  export function alertMsg(msg: string) {
    evalES(`alert("${msg}");`, true);
  }

  export async function getFileName(filePath: string) {
    const cloned = filePath.slice();
    const res = path.basename(cloned);
    return res;
  }
</script>

<script lang="ts">
  import { evalES } from "@/lib/utils/bolt";
  import path from "path";
  import { connectTest } from "@/lib/voicevox/api";
  import { onMount } from "svelte";
  import Loading from "@/lib/components/Loading.svelte";
  import Manual from "@/lib/components/mode/Manual.svelte";
  import Auto from "@/lib/components/mode/Auto.svelte";
  import Settings from "@/lib/components/mode/Settings.svelte";

  type ConnectingStatus = "connecting" | "connected" | "failed";
  let isConnected: ConnectingStatus = "connecting";

  type Mode = "auto" | "manual" | "settings";
  let mode: Mode = "manual";

  function connectToVoicevox() {
    isConnected = "connecting";
    connectTest()
      .then((res) => {
        isConnected = res ? "connected" : "failed";
      })
      .catch((e) => {
        isConnected = "failed";
        alertMsg((e as Error).message);
      });
  }

  onMount(() => {
    connectToVoicevox();
  });
</script>

<main data-theme="business" class="max-w-sm">
  <div class="tabs w-full px-2">
    <button
      class={`tab tab-bordered grow ${mode === "auto" ? "tab-active" : ""}`}
      on:click|preventDefault={() => (mode = "auto")}
    >
      自動生成
    </button>
    <button
      class={`tab tab-bordered grow ${mode === "manual" ? "tab-active" : ""}`}
      on:click|preventDefault={() => (mode = "manual")}
    >
      手動生成
    </button>
    <button
      class={`tab tab-bordered grow ${mode === "settings" ? "tab-active" : ""}`}
      on:click|preventDefault={() => (mode = "settings")}
    >
      設定
    </button>
  </div>
  {#if isConnected === "connecting"}
    <Loading msg="VOICEVOXへ接続中..." />
  {:else if isConnected === "connected"}
    {#if mode === "auto"}
      <Auto />
    {:else if mode === "manual"}
      <Manual />
    {:else if mode === "settings"}
      <Settings />
    {/if}
  {:else if isConnected === "failed"}
    <div class="flex flex-col gap-4 mx-2">
      <article class="mt-4">
        <p>
          VOICEVOXへの接続に失敗しました。 <br />
          VOICEVOXを起動してください。
        </p>
      </article>
      <button class="btn btn-sm btn-error" on:click={connectToVoicevox}>
        再度VOICEVOXへ接続する
      </button>
    </div>
  {/if}
</main>

<style>
</style>
