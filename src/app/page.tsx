"use client";

import { useActor } from "@xstate/react";
import { ActorRefFrom } from "xstate";
import { motion } from "framer-motion";
import Image from "next/image";
import { Prompt } from "../components/Prompt";
import { useMachineService } from "../context/GlobalContext";
import { StateEventTypes, machine } from "../state/machine";
import { Suspense, useEffect, useState } from "react";
import AudioRecorderDialog from "../components/AudioRecorderDialog";

export default function Landing() {
  const [state, send] = useActor(
    useMachineService().service as ActorRefFrom<typeof machine>
  );

  const [value, setValue] = useState("");

  const isLoading =
    state.matches("imageGenerationLoading") || state.matches("fetchImage");
  const isRecording = state.matches("recording");
  const { url, prompt, urlList } = state.context;

  const handleSubmit = (event: any, value: string) => {
    event.preventDefault();
    send({ type: StateEventTypes.SUBMIT, params: { prompt: value } });
  };

  useEffect(() => {
    setValue(prompt);
  }, [prompt]);

  const onChange = (v: string) => {
    setValue(v);
  };

  const onClickRecordStart = () => {
    send({ type: StateEventTypes.START_RECORDING });
  };

  const onClickRecordStop = (blob: Blob) => {
    send({
      type: StateEventTypes.STOP_RECORDING,
      params: { blob, prompt: value },
    });
  };

  const onLoadingComplete = () => {
    send({ type: StateEventTypes.FETCH_IMAGE_SUCCESS });
  };

  const onErrorLoadingImage = () => {
    send({ type: StateEventTypes.FETCH_IMAGE_FAILURE });
  };

  return (
    <main className="dark:bg-slate-900 bg-slate-100 w-full min-h-screen py-16 flex justify-center">
      <div className="px-10 w-4/5 max-w-3xl">
        <Suspense>
          <AudioRecorderDialog
            isRecording={isRecording}
            onStop={onClickRecordStop}
          />
          <h2 className="dark:text-white text-2xl mb-6">Create your poster</h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-slate-500 mb-8"
          >
            Describe the image you want to create and press Enter. You can type
            a description or express yourself using your voice.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative flex flex-row"
          >
            <Prompt
              isLoading={isLoading}
              isRecording={isRecording}
              value={value}
              placeholder={urlList[0].prompt}
              onChange={onChange}
              handleSubmit={(e) => handleSubmit(e, value)}
              submitLabel="Create"
              onStartRecording={onClickRecordStart}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10"
          >
            {url && (
              <Image
                className={`col-span-5 row-span-5 col-start-3 row-start-2 rounded-lg ${
                  isLoading && "animate-pulse"
                }`}
                src={url}
                width={1000}
                height={1000}
                onError={onErrorLoadingImage}
                onLoadingComplete={onLoadingComplete}
                alt={prompt ?? "generated poster image"}
              />
            )}
          </motion.div>
        </Suspense>
      </div>
    </main>
  );
}
