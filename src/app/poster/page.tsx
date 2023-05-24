"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// TODO: extract..
import { Configuration, OpenAIApi } from "openai";
import { useProcessVisualization } from "../../context/ProcessVisualizationContext";
const configuration = new Configuration({
  organization: "org-IbN8qtDM4FvS3IByygJnFQSO",
  apiKey: "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", // TODO: move to env
});
const openai = new OpenAIApi(configuration);

export default function Landing() {
  const { setIsLoading, isLoading, setMediaRequested, mediaRequested } =
    useProcessVisualization();
  const [prompt, setPrompt] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>();
  const [urlList, setUrlList] = useState<{ prompt: string; url: string }[]>([]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setError(null);
      setIsLoading(true);
      setMediaRequested(true);
      const response = await openai.createImage({
        prompt,
        n: 1,
        size: "512x512",
      });
      setImageUrl(response.data.data[0].url);
      setUrlList((urlList) =>
        urlList.concat([{ prompt, url: response.data.data[0].url ?? "" }])
      );
    } catch (e: any) {
      setError(
        "The artificial intelligence might be having a break. Please try again."
      );
    }
  };

  const onLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <main className="dark:bg-slate-900 bg-slate-100 min-h-screen p-24">
      <motion.div
        initial={{ translateY: "250px" }}
        transition={{
          ease: "easeInOut",
          duration: 1,
        }}
        animate={{
          translateY: mediaRequested ? 0 : "200px",
        }}
      >
        <h2 className="dark:text-white text-2xl mb-10">Create your poster</h2>
        <div className="relative flex flex-row">
          <form className="w-2/3 flex gap-2" onSubmit={handleSubmit}>
            <div className="w-[512px]">
              <div className="relative w-full">
                <input
                  type="text"
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="pr-24 h-14 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  placeholder="Colorful cartoon portrait of Stevie Wonder"
                  required
                  data-1p-ignore
                />
                <div className="absolute top-2 right-2">
                  <input
                    className="opacity-0 focus:bg-purple-500 bg-slate-200 py-2 px-3 rounded-lg"
                    type="submit"
                  ></input>
                </div>
              </div>
            </div>
          </form>
          <div className="w-1/3 self-center pl-4">
            <motion.div
              className="relative h-1 flex items-center"
              initial={{ width: "0px" }}
              animate={{ width: mediaRequested ? "300px" : "0px" }}
              transition={{ delay: 1.5, ease: "easeInOut" }}
            >
              <motion.div className="opacity-20 bg-gradient-to-r from-white dark:from-slate-900 dark:to-purple-700 to-purple-700 h-10 w-full absolute"></motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: mediaRequested ? [1, 1, 1, 1, 1] : [0, 0, 0, 0, 0],
                  scale: isLoading
                    ? [1.5, 2, 2, 2, 1.5]
                    : [1.5, 1.5, 1.5, 1.5, 1.5],
                  rotate: isLoading ? [0, 0, 270, 270, 0] : [0, 0, 0, 0, 0],
                  borderRadius: isLoading
                    ? ["20%", "20%", "50%", "50%", "20%"]
                    : ["50%", "50%", "50%", "50%", "50%"],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  delay: 2,
                  times: [0, 0.2, 0.5, 0.8, 1],
                  repeat: isLoading ? Infinity : 0,
                  repeatDelay: 1,
                }}
                className="absolute text-purple-900 right-0 flex justify-center items-center w-8 h-8 bg-purple-500"
              >
                {!isLoading && mediaRequested && (
                  <motion.svg
                    animate={{ scale: 0.5 }}
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    ></path>
                  </motion.svg>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="mt-10">
        {error && <p className="text-red-500">{error}</p>}
        {imageUrl && (
          <Image
            className="rounded-lg shadow-lg"
            src={imageUrl}
            width={512}
            height={512}
            onLoadingComplete={onLoadingComplete}
            alt={prompt ?? "generated poster image"}
          />
        )}
      </div>
      <div className="mt-10">
        {urlList.length !== 0 && (
          <p className="text-large dark:text-white">Your latest creations</p>
        )}
        <ul className="mt-5 w-[512px]">
          {urlList.map((item) => (
            <li
              onClick={() => {
                setImageUrl(item.url);
                setPrompt(item.prompt);
              }}
              className="hover:cursor-pointer rounded-lg flex gap-4 items-center p-2 dark:hover:bg-slate-700 hover:bg-slate-200 transition-all"
              key={item.url}
            >
              <Image
                src={item.url}
                width={32}
                height={32}
                alt={item.prompt ?? "generated poster image"}
              />
              <p className="dark:text-white text-sm italic">{item.prompt}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
