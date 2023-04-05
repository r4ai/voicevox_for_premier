<script lang="ts">
  import Slider from "./Slider.svelte";

  // * States
  let speedScale: number | undefined = undefined;
  let pitchScale: number | undefined = undefined;
  let intonationScale: number | undefined = undefined;
  let volumeScale: number | undefined = undefined;
  let prePhonemeLengthScale: number | undefined = undefined;
  let postPhonemeLengthScale: number | undefined = undefined;
  let outputSamplingRate: number | undefined = undefined;
  let outputStereo: boolean | undefined = undefined;
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  tabindex="0"
  class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
>
  <input type="checkbox" />
  <div class="collapse-title text-md font-medium">Options</div>
  <div class="collapse-content flex flex-col gap-4">
    <Slider
      label="話速: "
      value={speedScale ?? 1}
      min={0.5}
      max={2.0}
      step={0.01}
    />
    <Slider
      label="声高: "
      value={pitchScale ?? 0}
      min={-0.15}
      max={0.15}
      step={0.01}
    />
    <Slider
      label="抑揚: "
      value={intonationScale ?? 1}
      min={0}
      max={2}
      step={0.01}
    />
    <Slider
      label="音量: "
      value={volumeScale ?? 1}
      min={0}
      max={2}
      step={0.01}
    />
    <Slider
      label="開始無音: "
      value={prePhonemeLengthScale ?? 1}
      min={0}
      max={1.5}
      step={0.01}
    />
    <Slider
      label="終了無音: "
      value={postPhonemeLengthScale ?? 1}
      min={0}
      max={1.5}
      step={0.01}
    />
  </div>
</div>

<style>
</style>
