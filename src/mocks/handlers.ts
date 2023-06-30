import { rest } from "msw";

const throttle = () =>
  new Promise((resolve) => setTimeout(() => resolve(""), 2000));

export const handlers = [
  rest.post("http://localhost:3003/api/completion", async (req, res, ctx) => {
    await throttle();
    return res(ctx.json({ text: "[mock] chat completion response (openai)" }));
  }),
  rest.post(
    "http://localhost:3003/api/generateImage",
    async (req, res, ctx) => {
      await throttle();
      return res(ctx.json({ url: "http://localhost:3003/idle.jpg" }));
    }
  ),
  rest.post(
    "http://localhost:3003/api/createTranscription",
    async (req, res, ctx) => {
      await throttle();
      return res(ctx.json({ text: "[mock] transcription response (openai)" }));
    }
  ),
  rest.post("http://localhost:3003/api/speech", async (req, res, ctx) => {
    await throttle();
    return res(ctx.json({ path: "http://localhost:3003/mock-speech.mp3" }));
  }),
];
