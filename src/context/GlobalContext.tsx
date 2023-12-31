"use client";

import { useInterpret } from "@xstate/react";
import React, { createContext, useContext } from "react";
import { machine } from "../state/machine";
import { StateMachine } from "xstate";

export const GlobalContext = createContext<{
  // @ts-ignore
  service: StateMachine;
  // @ts-ignore
}>({});

export function useMachineService() {
  return useContext(GlobalContext);
}

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  // @ts-ignore
  const service = useInterpret(machine,  { devTools: true });
  return (
    <GlobalContext.Provider
      value={{
        // @ts-ignore
        service,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
