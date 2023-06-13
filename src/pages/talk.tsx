"use client";

import { useActor } from "@xstate/react";
import { useState } from "react";
import { ActorRefFrom } from "xstate";
import { motion } from "framer-motion";
import { useMachineService } from "../context/GlobalContext";
import { ChatMessage, StateEventTypes, machine } from "../state/machine";
import AudioRecorderDialog from "../components/audiorecorder/AudioRecorderDialog";
import TypingIndicator from "../components/TypingIndicator";
import { useProcessVisualization } from "../context/ProcessVisualizationContext";

interface Message extends ChatMessage {
  pending?: boolean;
}

const TalkPage = () => {
  const [state, send] = useActor(
    useMachineService().service as ActorRefFrom<typeof machine>
  );
  const [value, setValue] = useState("");
  const [audioResponse, setAudioResponse] = useState<string>();
  const { audioClip } = useProcessVisualization();

  const isRecording = state.matches("recording");
  const isLoading = state.matches("chatCompletionLoading");

  const onClickRecordStop = (blob: Blob) => {
    send({
      type: StateEventTypes.STOP_RECORDING,
      params: { blob, isChat: true },
    });
  };

  const messages = state.context.chat;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=" flex flex-row justify-center items-center dark:bg-slate-900 bg-slate-100 min-h-screen pb-16"
    >
      <AudioRecorderDialog
        isRecording={isRecording}
        onStop={onClickRecordStop}
      />
      <motion.div className="relative px-10 max-w-4xl">
        {isLoading && <TypingIndicator />}
        <div>
          <button
            className="rounded-full p-4 flex justify-center text-slate-50 bg-pink-500"
            onClick={() => {
              send({
                type: StateEventTypes.START_RECORDING,
                params: { chat: true },
              });
            }}
          >
            <svg
              className="w-8"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z"></path>
              <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z"></path>
            </svg>
          </button>
          <div className="mt-10">
            input: {audioClip && <audio src={audioClip} controls></audio>}
          </div>
          <div className="mt-10">
            output/response: {state.context.chat[1]?.text}
          </div>
          <button
            onClick={async () => {
              let utterance = new SpeechSynthesisUtterance(messages[1]?.text);
              let voicesArray = speechSynthesis.getVoices();
              utterance.voice = voicesArray[2];
              speechSynthesis.speak(utterance);
              // const response = await fetch("/api/speech", {
              //   method: "POST",
              //   body: JSON.stringify({ text: "hello there!" }),
              // });
              // const data = await response.json();
              // console.log(data);
              // console.log("data", data);

              // const blob = await data.blob();
              // setAudioResponse(window.URL.createObjectURL(blob));
              // console.log(blob);
            }}
          >
            -> to speech pls
          </button>
          {audioResponse && <audio src={audioResponse} controls></audio>}
        </div>
      </motion.div>
    </motion.main>
  );
};

export default TalkPage;
