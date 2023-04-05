import superagent from "superagent";
import type { Query } from "./type";

export async function createQuery(text: string): Promise<Query> {
  const res = await superagent
    .post("http://localhost:50021/audio_query")
    .query({ speaker: 1, text: text });
  if (!res) {
    throw new Error("Failed to create query");
  }
  console.info("created query", res.body);
  return res.body;
}

export async function createVoice(queryObj: Query): Promise<Blob> {
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
