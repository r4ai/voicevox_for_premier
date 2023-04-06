<script lang="ts">
  import Slider from "./Slider.svelte";
  import {
    speedScale,
    pitchScale,
    intonationScale,
    volumeScale,
    prePhonemeLength,
    postPhonemeLength,
  } from "../stores";
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  tabindex="0"
  class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-2"
>
  <input type="checkbox" />
  <div class="collapse-title text-md font-medium">Options</div>
  <div class="collapse-content flex flex-col gap-4">
    <Slider label="話速: " value={speedScale} min={0.5} max={2.0} step={0.01} />
    <Slider
      label="声高: "
      value={pitchScale}
      min={-0.15}
      max={0.15}
      step={0.01}
    />
    <Slider
      label="抑揚: "
      value={intonationScale}
      min={0}
      max={2}
      step={0.01}
    />
    <Slider label="音量: " value={volumeScale} min={0} max={2} step={0.01} />
    <Slider
      label="開始無音: "
      value={prePhonemeLength}
      min={0}
      max={1.5}
      step={0.01}
    />
    <Slider
      label="終了無音: "
      value={postPhonemeLength}
      min={0}
      max={1.5}
      step={0.01}
    />
  </div>
</div>

<style>
</style>
