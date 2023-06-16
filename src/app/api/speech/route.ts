import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = "pNInz6obpgDQGcFmaJgB"; // The ID of the voice you want to get

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { text } = await req.json();

  const options = {
    method: "POST",
    headers: {
      accept: "audio/mpeg",
      "content-type": "application/json",
      "xi-api-key": `${API_KEY}`,
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v1",
      voice_settings: {
        stability: 1,
        similarity_boost: 0.5,
      },
    }),
  };

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    options
  );

  const audioBuffer = await response.arrayBuffer();
  const filePath = path.resolve(process.cwd(), "public/audio.mp3");
  await fs.writeFileSync(filePath, Buffer.from(audioBuffer));

  return NextResponse.json({ path: filePath });
};
