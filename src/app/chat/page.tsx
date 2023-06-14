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
      <motion.div className="h-full relative pb-80 px-10 w-full max-w-4xl">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 0.5 }}
          ref={bottomRef}
          className="h-full mb-10 no-scrollbar overflow-auto rounded-xl px-8 bg-gradient-to-b from-transparent via-transparent to-white dark:to-slate-800"
        >
          <div className="flex min-h-full flex-col justify-end pb-8 text-slate-950 dark:text-white">
            {messages.map((message: Message, index) => (
              <motion.div
                key={`message-${index}`}
                className="flex flex-col my-1"
                initial={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
              >
                <motion.p
                  className={`p-4 shadow w-fit rounded-xl ${
                    message.source === "client"
                      ? "self-end bg-pink-500 text-white"
                      : "bg-white text-slate-950"
                  }`}
                >
                  {message.text}
                </motion.p>
              </motion.div>
            ))}
            {isLoading && <TypingIndicator />}
          </div>
        </motion.div>
        <motion.div
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
