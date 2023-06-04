import { Configuration } from "openai";

export const configuration = new Configuration({
  organization: process.env.OPEN_AI_ORGANIZATION,
  apiKey: process.env.OPEN_AI_API_KEY,
});