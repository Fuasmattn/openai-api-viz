import { OpenAIApi } from 'openai';
import { configuration } from '../../../config/openai';
import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';
import type { ReadableStream } from 'node:stream/web';

const openai = new OpenAIApi(configuration);

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const file = (await req.formData()).get('audio') as File;

  const response = openai.createTranscription(
    Readable.fromWeb(file!.stream() as ReadableStream) as unknown as File,
    'whisper-1'
  );

  return NextResponse.json({ text: (await response).data.text });
};
