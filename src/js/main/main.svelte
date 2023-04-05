<script lang="ts" context="module">
</script>

<script lang="ts">
  import { createQuery, createVoice, getSpeakers } from "@/lib/voicevox/api";
  import { Speaker } from "@/lib/voicevox/type";
  import { onMount } from "svelte";
  import Option from "@/lib/components/Option.svelte";

  let speakers: Speaker[] = [];

  let speaker: Speaker | undefined = undefined;
  let speakerId: number | undefined = undefined;

  let inputText: string = "";
  let audioData: Blob | undefined = undefined;

  async function handleSubmit(e: Event) {
    e.preventDefault();
    try {
      if (!inputText || inputText.length === 0) {
        throw new Error("読み上げる文章が入力されていません。");
      }
      if (typeof speakerId === "undefined" || (speakerId as number) < 0) {
        throw new Error("キャラクターがもしくはスタイルが選択されていません。");
      }
      const queryObj = await createQuery(inputText, speakerId);
      audioData = await createVoice(queryObj, speakerId);
      console.info("Audio generated!");
    } catch (e) {
      console.error(e);
    }
  }

  $: handleSpeakerChange(speaker);

  function handleSpeakerChange(speaker: Speaker | undefined) {
    if (speaker) {
      if (speaker.styles.length === 1) {
        speakerId = speaker.styles[0].id;
      }
    }
  }

  onMount(() => {
    getSpeakers().then((res) => {
      speakers = res;
    });
  });
</script>

<main data-theme="business">
  <form
    class="form-control w-full max-w-xs flex gap-4 mx-2"
    on:submit|preventDefault={handleSubmit}
  >
    <div>
      <label class="label" for="character-select">
        <span class="label-text">キャラクターを選択</span>
      </label>
      <select
        class="select select-bordered select-sm"
        id="character-select"
        bind:value={speaker}
      >
        <option value="" disabled selected>キャラクターを選択</option>
        {#each speakers as speaker}
          <option value={speaker}>{speaker.name}</option>
        {/each}
      </select>
    </div>
    {#if speaker && speaker.styles.length > 0}
      <div>
        <label class="label" for="character-style-select">
          <span class="label-text">スタイルを選択</span>
        </label>
        <select
          class="select select-bordered select-sm"
          id="character-style-select"
          bind:value={speakerId}
        >
          <option value={undefined} disabled selected>スタイルを選択</option>
          {#each speaker.styles as style}
            <option value={style.id}>{style.name}</option>
          {/each}
        </select>
      </div>
    {/if}
    <div>
      <label class="label" for="input-text">
        <span class="label-text">読み上げる文章を入力</span>
      </label>
      <textarea
        class="textarea h-24 textarea-bordered textarea-sm w-full"
        placeholder="読み上げる文章を入力"
        id="input-text"
        bind:value={inputText}
      />
    </div>
    <Option />
    <div class="w-full text-center">
      <input type="submit" class="btn btn-md btn-primary" value="Generate" />
    </div>

    <!-- 開発時のテスト用 -->
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
