"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { ActorRefFrom } from "xstate";
import { useActor } from "@xstate/react";
import { inspect } from "@xstate/inspect";
import { MwCheckbox } from "@maibornwolff/mwui-react";
import { useMachineService } from "../../context/GlobalContext";
import { machine } from "../../state/machine";
import Card, { CardContent } from "./Card";
import { uniqueId } from "xstate/lib/utils";
import { createCardForState } from ".";

const statecharts = "https://statecharts.io/inspect";
const stately = "https://stately.ai/viz?inspect";

const Sidepanel = () => {
  const [state, send] = useActor(
    useMachineService().service as ActorRefFrom<typeof machine>
  );

  const [showInspect, setShowInspect] = useState(false);
  const [useStately, setUseStately] = useState(false);
  const [history, setHistory] = useState<CardContent[]>([]);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentCard: CardContent = createCardForState(
    state.historyValue?.current
  );

  useEffect(() => {
    setHistory((history) => [...history, createCardForState(state.value)]);
  }, [state]);

  useEffect(() => {
    if (iframeRef.current && typeof window !== "undefined") {
      inspect({
        url: useStately ? stately : statecharts,
        iframe: iframeRef.current,
      });
    }
  }, [iframeRef, useStately]);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col bg-gradient-to-r dark:from-slate-900 dark:to-slate-800 from-slate-800 to-slate-800 h-full px-6 py-5 z-10 w-full text-sm">
        <div className="flex h-14 justify-between items-center mb-6">
          <h2 className="text-yellow-500 font-semibold text-2xl">
            Behind the Scenes
          </h2>

          <div className="flex gap-4 w-fit pl-4 py-1 pr-1 items-center text-xl">
            <button
              className="mr-8 flex gap-2 align-middle"
              title="Toggle xstate inspector"
              onClick={() => setShowInspect(!showInspect)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className={`${
                  showInspect ? "text-yellow-400" : "text-slate-300"
                } transition-all self-center  w-6 h-6`}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                />
              </svg>
            </button>

            <p className="text-slate-300">Tokens used</p>
            <motion.div
              className={`w-10 h-10 bg-yellow-400 bg-opacity-10 rounded-full border-4 items-center flex justify-center border-yellow-500 text-yellow-500`}
            >
              {state.context.tokens}
            </motion.div>
          </div>
        </div>
        <iframe
          className={`${!showInspect && "hidden"} h-full w-full`}
          ref={iframeRef}
        ></iframe>
        {!showInspect && (
          <div className="h-full grid grid-cols-2 grid-rows-3 pb-10">
            <motion.div className="pr-10 text-slate-500 pt-10 col-start-2 row-start-1 row-span-2 ">
              <p className="text-xl mb-4 font-semibold text-slate-300">
                {currentCard.title}
              </p>
              <p className="text-lg">type: API request to OpenAi</p>
              <p className="text-lg">
                This action has a total cost of{" "}
                <span className="text-slate-300">{currentCard.cost}</span>{" "}
                Tokens.
              </p>
              <p className="text-lg">
                context.message: {state.context.message}
              </p>
              {["imageGenerationLoading", "chatCompletionLoading"].includes(
                state.value.toString()
              ) && (
                <motion.div
                  transition={{ delay: 0.4, duration: 0.4 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="my-10 w-full justify-between flex gap-2"
                >
                  <div className="p-4 font-semibold rounded-lg border-2 border-slate-700">
                    Client
                  </div>
                  <div className="relative self-center w-full h-0.5 bg-slate-700">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                      HTTP <span className="font-bold">POST</span>
                    </div>
                  </div>
                  <div className="p-4 font-semibold rounded-lg border-2 border-slate-700">
                    OpenAI
                  </div>
                </motion.div>
              )}
              <p className="text-lg">context.prompt: {state.context.prompt}</p>
              <p className="text-lg">
                context.chatPrompt: {state.context.chatPrompt}
              </p>
            </motion.div>
            <div className="col-start-1 row-start-1 row-span-2 relative">
              <AnimatePresence>
                {currentCard && (
                  <motion.div
                    key={`${currentCard.title}-${uniqueId()}`}
                    initial={{ translateX: -500 }}
                    animate={{ translateX: 0 }}
                    exit={{ translateY: -500, rotateX: 180 }}
                    transition={{ duration: 1 }}
                  >
                    <motion.div
                      animate={{
                        translateY: [-8, 10],
                        translateX: [-5, 6],
                        rotateZ: [-1, 1],
                      }}
                      transition={{
                        times: [0, 1],
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                      className="w-[200px] h-[300px] lg:w-[300px] lg:h-[450px] absolute top-0 left-0"
                    >
                      <Card
                        style={{ perspective: "40rem" }}
                        className="w-full h-full"
                        cost={currentCard.cost}
                        title={currentCard.title}
                        url={currentCard.url}
                        description={currentCard.description}
                        hidden={false}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="col-start-1 row-start-3 col-span-3 relative">
              <AnimatePresence initial={false}>
                {history.slice(0, history.length - 1).map((card, index) => (
                  <motion.div
                    key={`${card.title}-${uniqueId()}`}
                    style={{ left: index * 30 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="w-[150px] h-[225px] absolute bottom-0"
                  >
                    <Card
                      style={{ perspective: "40rem" }}
                      className="w-full h-full"
                      cost={card.cost}
                      title={card.title}
                      url={card.url}
                      description={""}
                      hidden
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidepanel;
