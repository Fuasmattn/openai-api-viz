import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import multer, { diskStorage } from "multer";

export const runtime = "nodejs";

export function middleware(req: NextRequest, res: NextResponse) {
  // const upload = multer({
  //   storage: diskStorage({
  //     destination: function (req, file, callback) {
  //       callback(null, "./uploads");
  //     },
  //     filename: function (req, file, callback) {
  //       callback(null, file.fieldname + ".mp3");
  //     },
  //   }),
  // });
  // upload.single("audio");
  // // NextResponse.next();
  // return NextResponse.json({ a: 1 });
}

export const config = {
  // matcher: "/api/createTranscription",
};
