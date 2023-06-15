import { OpenAIApi } from "openai";
import { configuration } from "../../../config/openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAIApi(configuration);

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { prompt } = await req.json();

  const { data } = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 200,
    temperature: 0,
  });

  const text = data.choices[0].text;
  return NextResponse.json({ text });
};
