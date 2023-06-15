import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const options = {
    method: "POST",
    headers: {
      "X-USER-ID": "qGXRmaQ7GiVJc574dooNLeNpZnf2",
      AUTHORIZATION: "Bearer 102bf4248fd649d2b237c6ecca03d738",
      accept: "text/event-stream",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      quality: "medium",
      output_format: "mp3",
      speed: 1,
      sample_rate: 24000,
      text: "hello there",
      voice: "larry",
    }),
  };

  // const a = await fetch("https://play.ht/api/v2/tts", options)
  //   .then((res) => res.json())
  //   .then((json) => console.log(json))
  //   .catch((err) => console.error("error:" + err));
  return NextResponse.json({});
};

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
