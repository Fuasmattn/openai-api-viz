"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useProcessVisualization } from "../context/ProcessVisualizationContext";
import { Frame } from "../components/Frame";
import { Prompt } from "../components/prompt/Prompt";
import {
  PromptHistory,
  PromptHistoryItem,
} from "../components/prompt/PromptHistory";

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
  ]);

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
      <div>
        <h2 className="dark:text-white text-2xl mb-10 text-center">
          Create your poster
        </h2>
        <div className="relative flex flex-row">
          <Prompt
            isLoading={isLoading}
            isRecording={isRecording}
            value={prompt}
            onChange={setPrompt}
            handleSubmit={handleSubmit}
            onStartRecording={onClickRecordStart}
          />
        </div>

        <div className="relative mt-10 w-[512px] h-[512px]">
          <Frame isLoading={isLoading}>
            <div className="w-full h-full border-2 border-b-gray-200 border-r-gray-200 border-t-gray-400 border-l-gray-400">
              {imageUrl && (
                <Image
                  className="border-2 border-b-gray-200 border-r-gray-200 border-t-gray-400 border-l-gray-400"
                  src={imageUrl}
                  width={512}
                  height={512}
                  onLoadingComplete={onLoadingComplete}
                  alt={prompt ?? "generated poster image"}
                />
              )}
            </div>
          </Frame>
        </div>
        <div className="mt-10">
          <PromptHistory
            items={urlList}
            onSelect={(item: PromptHistoryItem) => {
              setImageUrl(item.url);
              setPrompt(item.prompt);
            }}
          />
        </div>
      </div>
    </main>
  );
}
