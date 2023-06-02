"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useProcessVisualization } from "../context/ProcessVisualizationContext";
import { Prompt } from "../components/prompt/Prompt";
import { PromptHistoryItem } from "../components/prompt/PromptHistory";

export default function Landing() {
  const {
    setIsLoading,
    isLoading,
    setMediaRequested,
    mediaRequested,
    setStartRecording,
    startRecording,
    isRecording,
    setIsRecording,
    audioBlob,
  } = useProcessVisualization();
  const [prompt, setPrompt] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("/default.jpg");
  const [urlList, setUrlList] = useState<PromptHistoryItem[]>([
    {
      url: "/default.jpg",
      prompt: "Colorful cartoon portrait of stevie wonder",
    },
    {
      url: "/default.jpg",
      prompt: "Colorful cartoon portrait of stevie wonder",
    },
    {
      url: "/default.jpg",
      prompt: "Colorful cartoon portrait of stevie wonder",
    },
    {
      url: "/default.jpg",
      prompt: "Colorful cartoon portrait of stevie wonder",
    },
  ]);

  const thumbs = urlList.length === 1 ? [] : urlList;
  const gridCols = urlList.length;
  const gridRows = (urlList.length % 5) * gridCols;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    createImageFromPrompt(prompt);
  };

  const createImageFromPrompt = async (inputPrompt: string) => {
    try {
      setError(null);
      setIsLoading(true);
      setMediaRequested(true);
      const response = await fetch("/api/generateImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputPrompt }),
      });
      const data = await response.json();
      setImageUrl(data.url);
      setUrlList((urlList) =>
        urlList.concat([{ prompt: inputPrompt, url: data.url }])
      );
    } catch (e: any) {
      setIsLoading(false);
      setError(
        "The artificial intelligence might be having a break. Please try again."
      );
    }
  };

  const handleAudioClipCreated = async (blob: Blob) => {
    try {
      setError(null);
      setIsLoading(true);
      const formData = new FormData();
      formData.append("audio", blob, "audio.mp3");

      const res = await fetch("/api/createTranscription", {
        method: "POST",
        body: formData,
      });

      const { text } = await res.json();

      setPrompt(text);
      await createImageFromPrompt(text);
    } catch (e: any) {
      setIsLoading(false);
      setError("Error uploading audio file.");
      console.error("the error", e);
    }
  };

  const onLoadingComplete = () => {
    setIsLoading(false);
  };

  const onClickRecordStart = () => {
    setIsRecording(true);
    setStartRecording(true);
  };

  useEffect(() => {
    if (audioBlob) {
      handleAudioClipCreated(audioBlob);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioBlob]);

  return (
    <main className="dark:bg-slate-900 bg-slate-100 min-h-screen py-16 flex justify-center">
      <div className="px-10">
        <h2 className="dark:text-white text-2xl mb-10 text-center">
          Create your poster
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative flex flex-row"
        >
          <Prompt
            isLoading={isLoading}
            isRecording={isRecording}
            value={prompt}
            onChange={setPrompt}
            handleSubmit={handleSubmit}
            onStartRecording={onClickRecordStart}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`relative mt-10 grid grid-cols-${gridCols} grid-rows-${gridRows} gap-2 justfy-center`}
        >
          {thumbs.map((item) => (
            <Image
              key={item.url + "thumb"}
              className="rounded-lg hover:cursor-pointer hover:shadow-lg brightness-75 hover:brightness-100 transition-all"
              src={item.url}
              width={128}
              height={128}
              alt={item.prompt}
              onClick={() => {
                setImageUrl(item.url);
                setPrompt(item.prompt);
              }}
            />
          ))}

          {imageUrl && (
            <Image
              className={`col-span-${Math.max(
                1,
                gridCols - 2
              )} row-span-${Math.max(0, gridRows - 2)} col-start-${Math.max(
                1,
                gridCols - 2
              )} row-start-${Math.max(0, gridRows - 2)} rounded-lg ${
                isLoading && "animate-pulse"
              }`}
              src={imageUrl}
              width={400}
              height={512}
              onLoadingComplete={onLoadingComplete}
              alt={prompt ?? "generated poster image"}
            />
          )}
        </motion.div>
      </div>
    </main>
  );
}
