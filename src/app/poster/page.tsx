"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// TODO: extract..
import { Configuration, OpenAIApi } from "openai";
import { useProcessVisualization } from "../../context/ProcessVisualizationContext";
import { Skeleton } from "../../components/Skeleton";
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
    <main className="dark:bg-slate-900 bg-slate-100 min-h-screen py-24 flex justify-center">
      <div>
        <h2 className="dark:text-white text-2xl mb-10 text-center">
          Create your poster
        </h2>
        <div className="relative flex flex-row">
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <div className="w-[512px]">
              <div className="relative w-full">
                <input
                  type="text"
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="h-14 pr-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
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
        </div>

        <div className="relative mt-10 w-[512px] h-[512px]">
          {error && <p className="text-red-500">{error}</p>}
          {imageUrl && (
            <Image
              className="absolute rounded-lg shadow-lg"
              src={imageUrl}
              width={512}
              height={512}
              onLoadingComplete={onLoadingComplete}
              alt={prompt ?? "generated poster image"}
            />
          )}
          {isLoading && <Skeleton className="absolute" />}
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
      </div>
    </main>
  );
}
