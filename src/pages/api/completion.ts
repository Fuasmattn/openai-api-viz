/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatCompletionResponseMessage, OpenAIApi } from "openai";
import { configuration } from "../../config/openai";

const openai = new OpenAIApi(configuration);

type ResponseData =
  | { text: string | undefined }
  | string;

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
    console.log("api/completion", req.body);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.prompt,
      max_tokens: 200,
      temperature: 0,
    });

    const text = response.data.choices[0].text;
    res.status(200).json({ text });
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
