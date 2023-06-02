"use client";

import React, { createContext, useContext, useState } from "react";

export const ProcessVisualizationContext = createContext({
  mediaRequested: false,
  isLoading: false,
  isRecording: false,
  startRecording: false,
  audioClip: "",
  audioBlob: null,
  setStartRecording: (val: boolean) => {},
  setIsLoading: (val: boolean) => {},
  setIsRecording: (val: boolean) => {},
  setMediaRequested: (val: boolean) => {},
  setAudioClip: (val: string) => {},
  setAudioBlob: (val: any) => {},
});

export function useProcessVisualization() {
  return useContext(ProcessVisualizationContext);
}

export const ProcessVisualizationContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRequested, setMediaRequested] = useState(false);
  const [startRecording, setStartRecording] = useState(false);
  const [audioClip, setAudioClip] = useState<string>("");
  const [audioBlob, setAudioBlob] = useState(null);
  return (
    <ProcessVisualizationContext.Provider
      value={{
        isLoading,
        mediaRequested,
        setIsLoading,
        setMediaRequested,
        isRecording,
        startRecording,
        setIsRecording,
        setStartRecording,
        audioClip,
        setAudioClip,
        audioBlob,
        setAudioBlob,
      }}
    >
      {children}
    </ProcessVisualizationContext.Provider>
  );
};
