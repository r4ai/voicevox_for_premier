<script lang="ts" context="module">
  type Mora = {
    text: string;
    consonant: string;
    consonant_length: number;
    vowel: string;
    vowel_length: number;
    pitch: number;
  };

  type Query = {
    accent_phrases: {
      moras: Mora[];
      accent: number;
      pause_mora: Mora;
    };
    speedScale: number;
    pitchScale: number;
    intonationScale: number;
    volumeScale: number;
    prePhonemeLength: number;
    postPhonemeLength: number;
    outputSamplingRate: number;
    outputStereo: boolean;
    kana: string;
  };

  async function createQuery(text: string): Promise<Query> {
    const res = await superagent
      .post("http://localhost:50021/audio_query")
      .query({ speaker: 1, text: text });
    if (!res) {
      throw new Error("Failed to create query");
    }
    console.info("created query", res.body);
    return res.body;
  }

  async function createVoice(queryObj: Query): Promise<Blob> {
    const res = await superagent
      .post("http://localhost:50021/synthesis")
      .query({ speaker: 1 })
      .send(queryObj)
      .responseType("blob");

    if (!res) {
      throw new Error("Failed to create voice");
    }
    console.info("created voice audioData");
    return res.body;
  }
</script>

<script lang="ts">
  import superagent from "superagent";

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
