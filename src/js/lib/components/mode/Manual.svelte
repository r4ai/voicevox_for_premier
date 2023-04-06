<script lang="ts">
  import {
    connectTest,
    createQuery,
    createVoice,
    getSpeakers,
  } from "@/lib/voicevox/api";
  import { Query, Speaker } from "@/lib/voicevox/type";
  import { onMount } from "svelte";
  import Option from "@/lib/components/Option.svelte";
  import {
    text,
    speakerId,
    audioData,
    queryObj,
    speedScale,
    pitchScale,
    intonationScale,
    volumeScale,
    prePhonemeLength,
    postPhonemeLength,
    mogrtFilePath,
  } from "@/lib/stores";
  import { evalES, evalTS, evalFile, csi } from "@/lib/utils/bolt";
  import Loading from "@/lib/components/Loading.svelte";
  import path from "path";
  import { alertMsg, getFileName } from "@/main/main.svelte";

  let isLoaded: boolean = false;

  let speakers: Speaker[] = [];
  let speaker: Speaker | undefined = undefined;

  let files: FileList;

  function updatedQueryObj(queryObj: Query, newQuery: Partial<Query>) {
    return {
      ...queryObj,
      ...newQuery,
    };
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    try {
      if (!$text || $text.length === 0) {
        throw new Error("読み上げる文章が入力されていません。");
      }
      if (typeof $speakerId === "undefined" || ($speakerId as number) < 0) {
        throw new Error("キャラクターがもしくはスタイルが選択されていません。");
      }
      const gotQueryObj = await createQuery($text, $speakerId);
      const custom: Partial<Query> = {
        speedScale: $speedScale,
        pitchScale: $pitchScale,
        volumeScale: $volumeScale,
        intonationScale: $intonationScale,
        prePhonemeLength: $prePhonemeLength,
        postPhonemeLength: $postPhonemeLength,
      };
      console.log("custom", custom);
      $queryObj = updatedQueryObj(gotQueryObj, custom);
      $audioData = await createVoice($queryObj, $speakerId);
      console.info("Audio generated!", $queryObj);

      // if ($mogrtFilePath) {
      //   await addText($mogrtFilePath, $text);
      // } else {
      //   throw new Error("MoGRTファイルが選択されていません。");
      // }
    } catch (e) {
      console.error(e);
      alertMsg((e as Error).message);
    }
  }

  async function handleFileSelect() {
    const res = await evalTS("importMogrt");
    if (res) {
      $mogrtFilePath = res;
    }
  }

  $: handleSpeakerChange(speaker);
  $: if ($mogrtFilePath) localStorage.setItem("mogrtFile", $mogrtFilePath);

  function handleSpeakerChange(speaker: Speaker | undefined) {
    if (speaker) {
      if (speaker.styles.length === 1) {
        $speakerId = speaker.styles[0].id;
      }
    }
  }

  function loadPreviousSettings() {
    const mogrtFile = localStorage.getItem("mogrtFile");
    if (mogrtFile) {
      $mogrtFilePath = mogrtFile;
    }
  }

  onMount(() => {
    getSpeakers().then((res) => {
      speakers = res;
    });
    loadPreviousSettings();
    isLoaded = true;
  });
</script>

{#if isLoaded}
  <form class="w-full max-w-sm" on:submit|preventDefault={handleSubmit}>
    <div class="mx-2 flex flex-col gap-2 mb-2">
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
            bind:value={$speakerId}
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
          class="textarea h-24 textarea-bordered textarea-sm w-full max-w-full"
          placeholder="読み上げる文章を入力"
          id="input-text"
          bind:value={$text}
        />
      </div>
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
              {#if $mogrtFilePath}
                {#await getFileName($mogrtFilePath)}
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
      <Option />
      <div class="w-full text-center">
        <input type="submit" class="btn btn-md btn-primary" value="Generate" />
      </div>

      <!-- 開発時のテスト用 -->
      {#if $audioData}
        <audio controls>
          <source
            src={window.URL.createObjectURL($audioData)}
            type="audio/wav"
          />
        </audio>
      {/if}
    </div>
  </form>
  <button
    on:click={() => {
      evalTS(
        "addCaption",
        "D:\\ProgrammingVideo\\Rust入門\\0\\001_四国めたん（ノーマル）_あいうえお.srt"
      );
    }}>TEST</button
  >
{/if}

<style></style>
