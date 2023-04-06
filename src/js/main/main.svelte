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

  export function connectToVoicevox() {
    isConnected.set("connecting");
    connectTest()
      .then((res) => {
        isConnected.set(res ? "connected" : "failed");
      })
      .catch((e) => {
        isConnected.set("failed");
        alertMsg((e as Error).message);
      });
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
  import { isConnected, projectDir } from "@/lib/stores";
  import Error from "@/lib/components/Error.svelte";

  type Mode = "auto" | "manual" | "settings";
  let mode: Mode = "manual";

  function loadPreviousSettings() {
    const savedProjectDir = localStorage.getItem("projectDir");
    if (savedProjectDir) {
      $projectDir = savedProjectDir;
    }
  }

  async function setUp() {
    loadPreviousSettings();
    connectToVoicevox();
  }

  onMount(() => {
    setUp();
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
  {#if $isConnected === "connecting"}
    <Loading msg="VOICEVOXへ接続中..." />
  {:else if $isConnected === "connected"}
    {#if mode === "auto"}
      <Auto />
    {:else if mode === "manual"}
      <Manual />
    {:else if mode === "settings"}
      <Settings />
    {/if}
  {:else if $isConnected === "failed"}
    <Error>
      <p>
        VOICEVOXへの接続に失敗しました。 <br />
        VOICEVOXを起動してください。
      </p>
    </Error>
  {/if}
</main>

<style>
</style>
