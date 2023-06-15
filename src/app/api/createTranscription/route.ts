/* eslint-disable import/no-anonymous-default-export */
import multer, { diskStorage } from "multer";
import type { NextApiRequest, NextApiResponse, PageConfig } from "next";
import fs from "fs";
import { OpenAIApi } from "openai";
import { configuration } from "../../../config/openai";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

const openai = new OpenAIApi(configuration);

const upload = multer({
  storage: diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./uploads");
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + ".mp3");
    },
  }),
});

const middleware = upload.single("audio");

// const fn = async (req: any, res: any) => {
//   const temp = await req.formData();
//   const file = temp.get("audio");

//   return new Promise((resolve) => {
//     middleware(req, res, async () => {
//       const response = await openai.createTranscription(file, "whisper-1");
//       resolve({ text: response.data.text });
//     });
//   });
// };

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const temp = await req.formData();
  const file = temp.get("audio");

  class RS extends Readable {
    count = 0;
    _read() {
      if (this.count === 0) {
        this.push(file);
      } else {
        this.push(null);
      }
    }
  }

  const response = await openai.createTranscription(
    new RS() as any,
    "whisper-1"
  );
  return NextResponse.json({ text: response.data.text });
};
