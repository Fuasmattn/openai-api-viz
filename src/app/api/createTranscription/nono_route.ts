/* eslint-disable import/no-anonymous-default-export */
import multer, { diskStorage } from "multer";
import type { NextApiRequest, NextApiResponse, PageConfig } from "next";
import fs from "fs";
import { OpenAIApi } from "openai";
import { configuration } from "../../../config/openai";

const openai = new OpenAIApi(configuration);

type ResponseData = { text: string } | string;

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const middleware = upload.single("audio");

    // @ts-ignore
    middleware(req, res, async () => {
      const response = await openai.createTranscription(
        // @ts-ignore
        fs.createReadStream(req.file.path) as any,
        "whisper-1"
      );
      res.status(200).json({ text: response.data.text });
    });
  } catch (e) {
    res.status(500);
  }
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
