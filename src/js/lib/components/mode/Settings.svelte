<script lang="ts">
  import { projectDir } from "@/lib/stores";
  import InputFile from "../InputFile.svelte";
  import { evalTS } from "@/lib/utils/bolt";
  import { alertMsg } from "@/main/main.svelte";

  async function handleFileSelect() {
    const res = await evalTS("selectProjectDir");
    $projectDir = res;
  }

  $: {
    if ($projectDir) {
      localStorage.setItem("projectDir", $projectDir);
    }
  }
</script>

<div class="m-2 flex flex-col gap-2">
  <InputFile
    label="プロジェクトフォルダを選択"
    {handleFileSelect}
    filePath={projectDir}
    shouldOnlyShowFileName={false}
  />
</div>

<style>
</style>
