"use client";

import { useActor } from "@xstate/react";
import { ActorRefFrom } from "xstate";
import { motion } from "framer-motion";
import Image from "next/image";
import { Prompt } from "../components/prompt/Prompt";
import { useMachineService } from "../context/GlobalContext";
import { StateEventTypes, machine } from "../state/machine";
import { Suspense } from "react";
import AudioRecorderDialog from "../components/audiorecorder/AudioRecorderDialog";

export default function Landing() {
  const [state, send] = useActor(
    useMachineService().service as ActorRefFrom<typeof machine>
  );

  const isLoading =
    state.matches("imageGenerationLoading") || state.matches("fetchImage");
  const isRecording = state.matches("recording");
  const { url, prompt, urlList } = state.context;

  // const thumbs = urlList.length === 1 ? [] : urlList;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    send({ type: StateEventTypes.SUBMIT });
  };

  const onChange = (value: string) => {
    send({ type: StateEventTypes.UPDATE_PROMPT, params: { prompt: value } });
  };

  const onClickRecordStart = () => {
    send({ type: StateEventTypes.START_RECORDING });
  };

  const onClickRecordStop = (blob: Blob) => {
    send({ type: StateEventTypes.STOP_RECORDING, params: { blob } });
  };

  const onLoadingComplete = () => {
    send({ type: StateEventTypes.FETCH_IMAGE_SUCCESS });
  };

  const onErrorLoadingImage = () => {
    send({ type: StateEventTypes.FETCH_IMAGE_FAILURE });
  };

  return (
    <main className="dark:bg-slate-900 bg-slate-100 min-h-screen py-16 flex justify-center">
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
              value={prompt}
              placeholder={urlList[0].prompt}
              onChange={onChange}
              handleSubmit={handleSubmit}
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
