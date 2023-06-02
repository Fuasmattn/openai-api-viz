"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProcessVisualization } from "../../context/ProcessVisualizationContext";
import { AudioRecorder } from "../audiorecorder/AudioRecorder";

const Sidepanel = () => {
  const { isLoading, isRecording, setIsRecording, mediaRequested } =
    useProcessVisualization();

  return (
    <div className="bg-gradient-to-r dark:from-slate-900 dark:to-slate-800 from-slate-800 to-slate-800 h-full py-16 px-24 z-10 w-full max-w-5xlfont-mono text-sm">
      <p className="text-slate-50 text-2xl">What&#39;s happening?</p>
      <div className="mt-10">
        <>
          <motion.div
            className="text-slate-50 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            transition={{ duration: 1, delay: 0 }}
          >
            <AudioRecorder />
          </motion.div>
        </>

        <div className="flex gap-8">
          <AnimatePresence>
            {mediaRequested && (
              <>
                <motion.div
                  animate={{
                    boxShadow: "9px 9px 35px #0c1018,-9px -9px 35px #30425e",
                  }}
                  transition={{ duration: 1, delay: 1 }}
                  className="relative w-40 h-auto aspect-square p-6 border-0 border-white rounded-full"
                >
                  <motion.div className="absolute left-0 p-10 text-white top-0 bg-slate-800 w-full h-full rounded-full"></motion.div>
                </motion.div>
                <div className="text-slate-50">
                  <p className="text-lg font-bold">
                    lorem ipsum dolor sit amet
                  </p>
                  <p className="text-lg">
                    lorem ipsum dolor sit amet. loremasd asdiue caadx
                  </p>
                  <div className="relative mt-5 w-[200px]">
                    <motion.div
                      animate={{
                        width: 200,
                      }}
                      transition={{ duration: 1, delay: 2 }}
                      className="absolute h-2 bg-white w-0 rounded-full"
                    ></motion.div>
                    <motion.div
                      animate={{
                        height: 150,
                      }}
                      transition={{ duration: 1, delay: 3 }}
                      className="absolute right-0 h-0 bg-white w-2 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {mediaRequested && (
            <motion.div
              animate={{
                boxShadow: "9px 9px 35px #0c1018,-9px -9px 35px #30425e",
              }}
              transition={{ duration: 1, delay: 3.5 }}
              className="mt-20 px-10 py-6 rounded-full w-fit text-slate-50"
            >
              <div>
                <p className="text-sm font-bold">lorem ipsum dolor sit amet</p>
                <p className="text-base">
                  lorem ipsum dolor sit amet. loremasd asdiue caadx
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Sidepanel;
