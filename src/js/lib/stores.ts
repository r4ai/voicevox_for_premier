import { Writable, writable } from "svelte/store";
import { Query } from "./voicevox/type";

export const text: Writable<string> = writable("");
export const speakerId: Writable<number | undefined> = writable(undefined);
export const queryObj: Writable<Query | undefined> = writable(undefined);
export const audioData: Writable<Blob | undefined> = writable(undefined);

export const speedScale: Writable<number> = writable(1);
export const pitchScale: Writable<number> = writable(0);
export const intonationScale: Writable<number> = writable(1);
export const volumeScale: Writable<number> = writable(1);
export const prePhonemeLength: Writable<number> = writable(0.1);
export const postPhonemeLength: Writable<number> = writable(0.1);
