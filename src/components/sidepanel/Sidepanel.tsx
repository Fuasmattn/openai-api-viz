"use client";

import React from "react";
import { useProcessVisualization } from "../../context/ProcessVisualizationContext";

const Sidepanel = () => {
  const { isLoading, mediaRequested } = useProcessVisualization();
  return (
    <div className="bg-gradient-to-r dark:from-slate-900 dark:to-slate-800 from-slate-100 to-slate-300 h-full p-24 z-10 w-full max-w-5xlfont-mono text-sm">
      <p className="dark:text-slate-50 text-2xl mb-10">What's happening?</p>
      {isLoading && (
        <div className="p-4 text-slate-100 border-2 bg-slate-700 rounded-lg border-slate-600">
          Requesting image creation from OpenAI...
        </div>
      )}
      {!isLoading && mediaRequested && (
        <>
          <div className="p-4 text-slate-100 border-2 bg-slate-700 rounded-lg border-slate-600">
            Requesting image creation from OpenAI...
          </div>
          <div className="mt-4 p-4 text-slate-100 border-2 bg-slate-700 rounded-lg border-slate-600">
            OpenAi generated an image with the given prompt input.
          </div>
        </>
      )}
    </div>
  );
};

export default Sidepanel;
