/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAIApi } from "openai";
import { configuration } from "../../config/openai";

const openai = new OpenAIApi(configuration);

type ResponseData = { url: string } | string;

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (!configuration.apiKey) {
    res
      .status(500)
      .send(
        "OpenAI API key not configured, please follow instructions in README.md"
      );
    return;
  }
  try {
    const response = await openai.createImage({
      prompt: req.body.prompt,
      n: 1,
      size: "512x512",
    });

    const resUrl = response.data.data[0].url ?? "err";
    res.status(200).json({ url: resUrl });
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).send("An error occurred during your request.");
    }
  }
}
