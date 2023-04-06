<script lang="ts" context="module">
  function updatedQueryObj(queryObj: Query, newQuery: Partial<Query>) {
    return {
      ...queryObj,
      ...newQuery,
    };
  }

  function alertMsg(msg: string) {
    evalTS("invokeAlert", msg);
  }
</script>

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
  import { evalTS } from "@/lib/utils/bolt";
  import { Diamonds } from "svelte-loading-spinners";
  import Loading from "@/lib/components/Loading.svelte";

  type ConnectingStatus = "connecting" | "connected" | "failed";
  let isConnected: ConnectingStatus = "connecting";

  let speakers: Speaker[] = [];
  let speaker: Speaker | undefined = undefined;

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
    } catch (e) {
      console.error(e);
      alertMsg((e as Error).message);
    }
  }

  $: handleSpeakerChange(speaker);

  function handleSpeakerChange(speaker: Speaker | undefined) {
    if (speaker) {
      if (speaker.styles.length === 1) {
        $speakerId = speaker.styles[0].id;
      }
    }
  }

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
    getSpeakers().then((res) => {
      speakers = res;
    });
    connectToVoicevox();
  });
</script>

<main data-theme="business">
  {#if isConnected === "connected"}
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
              <option value={undefined} disabled selected>スタイルを選択</option
              >
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
        <!-- <div>
        <label class="label" for="mogrt-select">
          <span class="label-text">字幕の生成に使うMoGRTファイルを選択</span>
        </label>
        {#if $mogrtFilePath}
          <span>{$mogrtFilePath}</span>
        {/if}
        <button
          class="btn btn-sm btn-primary"
          id="mogrt-select"
          on:click={() => evalTS("selectMogrt")}
          >{$mogrtFilePath ? $mogrtFilePath.toString() : "MoGRTファイルを選択"}
        </button>
      </div> -->
        <Option />
        <div class="w-full text-center">
          <input
            type="submit"
            class="btn btn-md btn-primary"
            value="Generate"
          />
        </div>

        <!-- <button on:click={() => evalTS("addTextLayer", "")}>GEN</button> -->

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
  {:else if isConnected === "connecting"}
    <Loading msg="VOICEVOXへ接続中..." />
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
