"use client";

import React, { createContext, useContext, useState } from "react";
// TODO: deprecate/remove
export const ProcessVisualizationContext = createContext({
  audioClip: "",
  setAudioClip: (val: string) => {},
});

export function useProcessVisualization() {
  return useContext(ProcessVisualizationContext);
}

export const ProcessVisualizationContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [audioClip, setAudioClip] = useState<string>("");
  return (
    <ProcessVisualizationContext.Provider
      value={{
        audioClip,
        setAudioClip,
      }}
    >
      {children}
    </ProcessVisualizationContext.Provider>
  );
};
