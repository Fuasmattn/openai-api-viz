import { OpenAIApi } from "openai";
import { configuration } from "../../../config/openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAIApi(configuration);

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { prompt } = await req.json();
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: "512x512",
  });

  const resUrl = response.data.data[0].url ?? "err";
  return NextResponse.json({ url: resUrl });
};
