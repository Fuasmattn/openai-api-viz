"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Prompt } from "../components/prompt/Prompt";
import { useActor } from "@xstate/react";
import { useMachineService } from "../context/GlobalContext";
import { ActorRefFrom } from "xstate";
import { EventTypes, machine } from "../machine";

export default function Landing() {
  const [state, send] = useActor(
    useMachineService().service as ActorRefFrom<typeof machine>
  );

  const isLoading = state.matches("imageGenerationLoading");
  const isRecording = state.matches("recording");
  const { url, prompt } = state.context;

  // const thumbs = urlList.length === 1 ? [] : urlList;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    send({ type: EventTypes.SUBMIT });
  };

  const onChange = (value: string) => {
    send({ type: EventTypes.UPDATE_PROMPT, params: { prompt: value } });
  };

  const onClickRecordStart = () => {
    send({ type: EventTypes.START_RECORDING });
  };

  return (
    <main className="dark:bg-slate-900 bg-slate-100 min-h-screen py-16 flex justify-center">
      <div className="px-10 w-4/5 max-w-3xl">
        <h2 className="dark:text-white text-2xl mb-6">Create your poster</h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-slate-500 mb-8"
        >
          Describe the image you want to create and press Enter. You can type a
          description or express yourself using your voice.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative flex flex-row"
        >
          <Prompt
            isLoading={isLoading}
            isRecording={isRecording}
            value={prompt}
            onChange={onChange}
            handleSubmit={handleSubmit}
            onStartRecording={onClickRecordStart}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10"
          // className={`relative mt-10 grid grid-cols-8 gap-2 justfy-center`}
        >
          {/* {thumbs.map((item) => (
            <Image
              key={item.url + "thumb"}
              className="rounded-lg hover:cursor-pointer hover:shadow-lg brightness-75 hover:brightness-100 transition-all"
              src={item.url}
              title={item.prompt}
              width={1000}
              height={1000}
              alt={item.prompt}
              onClick={() => {
                // setImageUrl(item.url);
                setValue(item.prompt);
              }}
            />
          ))}
          {Array.from(Array(100 - thumbs.length)).map((p, i) => (
            <div
              key={`placeholder-${i}`}
              className="rounded-lg dark:bg-slate-800 bg-slate-200 h-[80px] w-auto"
            />
          ))} */}

          {url && (
            <Image
              className={`col-span-5 row-span-5 col-start-3 row-start-2 rounded-lg ${
                isLoading && "animate-pulse"
              }`}
              src={url}
              width={1000}
              height={1000}
              // onLoadingComplete={}
              alt={prompt ?? "generated poster image"}
            />
          )}
        </motion.div>
      </div>
    </main>
  );
}
