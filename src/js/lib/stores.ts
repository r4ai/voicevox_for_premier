import { Writable, writable } from "svelte/store";
import { Query } from "./voicevox/type";

// * Global states

type ConnectingStatus = "connecting" | "connected" | "failed";
export const isConnected: Writable<ConnectingStatus> = writable("connecting");

// * Manual mode states

export const text: Writable<string> = writable("");
export const speakerId: Writable<number | undefined> = writable(undefined);
export const queryObj: Writable<Query | undefined> = writable(undefined);
export const audioData: Writable<Blob | undefined> = writable(undefined);
export const mogrtFilePath: Writable<string | undefined> = writable(undefined);

export const speedScale: Writable<number> = writable(1);
export const pitchScale: Writable<number> = writable(0);
export const intonationScale: Writable<number> = writable(1);
export const volumeScale: Writable<number> = writable(1);
export const prePhonemeLength: Writable<number> = writable(0.1);
export const postPhonemeLength: Writable<number> = writable(0.1);

// * Settings

export const projectDir: Writable<string | undefined> = writable(undefined);
