import superagent from "superagent";
import type { Query, Speaker } from "./type";

export async function createQuery(
  text: string,
  speakerId: number
): Promise<Query> {
  const res = await superagent
    .post("http://localhost:50021/audio_query")
    .query({ speaker: speakerId, text: text });
  console.trace("created query", res.body);
  return res.body;
}

export async function createVoice(
  queryObj: Query,
  speakerId: number
): Promise<Blob> {
  const res = await superagent
    .post("http://localhost:50021/synthesis")
    .query({ speaker: speakerId })
    .send(queryObj)
    .responseType("blob");
  console.trace("created voice audioData");
  return res.body;
}

export async function getSpeakers(): Promise<Speaker[]> {
  const res = await superagent.get("http://localhost:50021/speakers");
  console.trace("got speakers", res.body);
  return res.body;
}

export async function connectTest(): Promise<boolean> {
  return superagent
    .get("http://localhost:50021/setting")
    .timeout({
      response: 2000,
      deadline: 2000,
    })
    .then((res) => {
      console.trace("connected to voicevox");
      return true;
    })
    .catch((err) => {
      console.trace("failed to connect to voicevox");
      return false;
    });
}
