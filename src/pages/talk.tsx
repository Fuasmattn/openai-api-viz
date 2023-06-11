"use client";

import { useActor } from "@xstate/react";
import { Prompt } from "../components/prompt/Prompt";
import { useMachineService } from "../context/GlobalContext";
import { ActorRefFrom } from "xstate";
import { StateEventTypes, machine } from "../state/machine";
import AudioRecorderDialog from "../components/audiorecorder/AudioRecorderDialog";
import { useState } from "react";

const TalkPage = () => {
  const [state, send] = useActor(
    useMachineService().service as ActorRefFrom<typeof machine>
  );

  const [value, setValue] = useState("");

  const isRecording = state.matches("recording");
  const isLoading = false;

  const onClickRecordStop = (blob: Blob) => {
    send({ type: StateEventTypes.STOP_RECORDING, params: { blob } });
  };

  return (
    <main className="dark:bg-slate-900 bg-slate-100 min-h-screen py-16 flex justify-center">
      <AudioRecorderDialog
        isRecording={isRecording}
        onStop={onClickRecordStop}
      />
      <div className="h-full relative pb-10 px-10 w-full max-w-4xl">
        <div className="h-full flex flex-col justify-end rounded p-8 bg-slate-50 dark:bg-slate-800">
          <div className="mb-10 text-slate-950 dark:text-white">
            <p>answer</p>
            <p>answer</p>
            <p>answer</p>
          </div>
          <Prompt
            value={value}
            isLoading={isLoading}
            placeholder="Ask me anything"
            isRecording={isRecording}
            submitLabel="Send"
            onStartRecording={() => {
              // send({ type: StateEventTypes.START_RECORDING });
            }}
            onChange={(v) => {
              setValue(v);
            }}
            handleSubmit={() => {
              console.log("submit", value);
            }}
          ></Prompt>
        </div>
      </div>
    </main>
  );
};

export default TalkPage;
