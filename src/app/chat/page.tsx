"use client";

import { useActor } from "@xstate/react";
import { useLayoutEffect, useRef, useState } from "react";
import { ActorRefFrom } from "xstate";
import { motion } from "framer-motion";
import { useMachineService } from "../../context/GlobalContext";
import { Prompt } from "../../components/Prompt";
import { ChatMessage, StateEventTypes, machine } from "../../state/machine";
import AudioRecorderDialog from "../../components/AudioRecorderDialog";
import TypingIndicator from "../../components/TypingIndicator";

interface Message extends ChatMessage {
  pending?: boolean;
}

const ChatPage = () => {
  const [state, send] = useActor(
    useMachineService().service as ActorRefFrom<typeof machine>
  );
  const bottomRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");

  const isRecording = state.matches("recording");
  const isLoading = state.matches("chatCompletionLoading");

  const onClickRecordStop = (blob: Blob) => {
    send({
      type: StateEventTypes.STOP_RECORDING,
      params: { blob, isChat: true },
    });
  };

  const messages = state.context.chat;

  useLayoutEffect(() => {
    bottomRef.current?.scrollBy(0, bottomRef.current.scrollHeight);
  }, [messages]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="dark:bg-slate-900 bg-slate-100 min-h-screen pb-16 flex justify-center"
    >
      <AudioRecorderDialog
        isRecording={isRecording}
        onStop={onClickRecordStop}
      />
      <motion.div className="h-full relative pb-80 w-full max-w-4xl">
        <motion.div
          ref={bottomRef}
          className="h-full no-scrollbar overflow-auto dark:bg-transparent my-6"
        >
          <div className="flex min-h-full flex-col justify-end text-slate-950 dark:text-white">
            {messages.map((message: Message, index) => (
              <motion.div
                key={`message-${index}`}
                className={`flex flex-row py-4 px-8 ${
                  message.source === "client"
                    ? "bg-transparent text-black dark:text-white my-8"
                    : "bg-slate-200 dark:bg-slate-800 dark:text-slate-100 text-slate-950"
                }`}
                initial={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
              >
                <p className="w-10 mr-8 text-right">
                  {message.source === "client" ? "You" : "AI"}:
                </p>
                <p>{message.text}</p>
              </motion.div>
            ))}
            {isLoading && (
              <div className="px-8">
                <TypingIndicator />
              </div>
            )}
          </div>
        </motion.div>
        <motion.div
          className="mt-10 px-10"
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Prompt
            key="chat-prompt"
            value={value}
            isLoading={isLoading}
            placeholder="Ask me anything"
            isRecording={isRecording}
            submitLabel="Send"
            onStartRecording={() => {
              send({
                type: StateEventTypes.START_RECORDING,
                params: { chat: true },
              });
            }}
            onChange={(v) => {
              setValue(v);
            }}
            handleSubmit={(e) => {
              e.preventDefault();
              send({
                type: StateEventTypes.SUBMIT_COMPLETION,
                params: { prompt: value },
              });
              setValue("");
            }}
          ></Prompt>
        </motion.div>
      </motion.div>
    </motion.main>
  );
};

export default ChatPage;
