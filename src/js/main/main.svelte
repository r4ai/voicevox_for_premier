<script lang="ts" context="module">
</script>

<script lang="ts">
  import { createQuery, createVoice } from "@/lib/voicevox/api";

  let character = "";
  let inputText = "";
  let audioData: Blob | undefined = undefined;

  async function handleSubmit(e: Event) {
    e.preventDefault();
    const queryObj = await createQuery(inputText);
    audioData = await createVoice(queryObj);
    console.info("Audio generated!");
  }
</script>

<main data-theme="business">
  <form
    class="form-control w-full max-w-xs flex gap-4"
    on:submit|preventDefault={handleSubmit}
  >
    <div>
      <label class="label" for="character-select">
        <span class="label-text">キャラクターを選択</span>
      </label>
      <select
        class="select select-bordered select-sm"
        id="character-select"
        bind:value={character}
      >
        <option>Star Wars</option>
        <option>Harry Potter</option>
        <option>Lord of the Rings</option>
        <option>Planet of the Apes</option>
        <option>Star Trek</option>
      </select>
    </div>
    <div>
      <label class="label" for="input-text">
        <span class="label-text">読み上げる文章を入力</span>
      </label>
      <textarea
        class="textarea h-24 textarea-bordered textarea-sm"
        placeholder="読み上げる文章を入力"
        id="input-text"
        bind:value={inputText}
      />
    </div>
    <div class="w-full text-center">
      <input type="submit" class="btn btn-sm btn-primary" value="Generate" />
    </div>
    {#if audioData}
      <audio controls>
        <source
          src={audioData ? window.URL.createObjectURL(audioData) : undefined}
          type="audio/wav"
        />
      </audio>
    {/if}
  </form>
</main>

<style>
</style>
