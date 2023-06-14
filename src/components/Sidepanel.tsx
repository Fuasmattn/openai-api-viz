"use client";

import React, { useEffect, useRef, useState } from "react";
import { ActorRefFrom } from "xstate";
import { useActor } from "@xstate/react";
import { inspect } from "@xstate/inspect";
import { AudioRecorder } from "./AudioRecorder";
import { useMachineService } from "../context/GlobalContext";
import { machine } from "../state/machine";

const statecharts = "https://statecharts.io/inspect";
const stately = "https://stately.ai/viz?inspect";

const Sidepanel = () => {
  const [state, send] = useActor(
    useMachineService().service as ActorRefFrom<typeof machine>
  );

  const [showInspect, setShowInspect] = useState(false);
  const [useStately, setUseStately] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && typeof window !== "undefined") {
      inspect({
        url: useStately ? stately : statecharts,
        iframe: iframeRef.current,
      });
    }
  }, [iframeRef, useStately]);

  return (
    <div className="flex flex-col bg-gradient-to-r dark:from-slate-900 dark:to-slate-800 from-slate-800 to-slate-800 h-screen px-6 py-5 z-10 w-full max-w-5xlfont-mono text-sm">
      <div>
        <p className="text-slate-50 text-2xl mb-6">Behind the Scenes</p>
        {/* @ts-ignore */}
        <p className="text-slate-50 text-base">Current state: {state.value}</p>
        <p className="text-slate-50">Message: {state.context.message}</p>
        <p className="text-slate-50">Event: {state.event.type}</p>

        {/* <div className="mt-6 grid grid-cols-3 grid-rows-3 gap-2">
          {Object.keys(state.configuration[0].machine.states).map((s) => {
            const active = s === state.value;
            return (
              <div
                key={s}
                className={`p-4 font-bold rounded ${active ? "bg-darkblue-900 text-white" : "bg-slate-700 text-slate-500"}`}
              >
                {s}
              </div>
            );
          })}
        </div> */}
      </div>
      <div className="mt-6 h-full">
        <iframe
          className={`w-full h-full ${!showInspect && "hidden"}`}
          ref={iframeRef}
          id="xstate"
        ></iframe>
      </div>

      <div className="flex gap-4">
        <div className="flex items-center mt-6 px-4 mb-4 border border-slate-700 rounded">
          <input
            id="bordered-checkbox-1"
            type="checkbox"
            checked={showInspect}
            onChange={() => setShowInspect(!showInspect)}
            name="bordered-checkbox"
            className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="bordered-checkbox-1"
            className="w-full py-4 ml-2 text-sm font-medium text-white"
          >
            Show xstate inspector
          </label>
        </div>
        <div className="flex items-center mt-6 px-4 mb-4 border border-slate-700 rounded">
          <input
            id="bordered-checkbox-1"
            type="checkbox"
            checked={useStately}
            onChange={() => setUseStately(!useStately)}
            name="bordered-checkbox"
            className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="bordered-checkbox-1"
            className="w-full py-4 ml-2 text-sm font-medium text-white"
          >
            Use stately.ai
          </label>
        </div>
      </div>
    </div>
  );
};

export default Sidepanel;
