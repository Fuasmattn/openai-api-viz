'use client';

import React, { createContext, useContext, useState } from "react";

export const ProcessVisualizationContext = createContext({
  mediaRequested: false,
  isLoading: false,
  setIsLoading: (val: boolean) => {},
  setMediaRequested: (val: boolean) => {},
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
  const [mediaRequested, setMediaRequested] = useState(false);
  return (
    <ProcessVisualizationContext.Provider
      value={{ isLoading, mediaRequested, setIsLoading, setMediaRequested }}
    >
      {children}
    </ProcessVisualizationContext.Provider>
  );
};
