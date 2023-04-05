<script lang="ts">
  export let value: number;
  export let min: number;
  export let max: number;
  export let step: number;
  export let label: string;
</script>

<div class="w-full">
  <label class="label flex flex-row" for="speed-select">
    <span class="label-text text-base mr-3">{label}</span>
    <input
      type="number"
      class="input input-sm grow font-mono"
      {min}
      {max}
      {step}
      bind:value
    />
  </label>
  <input
    type="range"
    data-theme="dark"
    {min}
    {max}
    bind:value
    class="range range-xs"
    {step}
    id="speed-select"
  />
</div>

<style>
</style>
