"use client";
// KinContext.tsx

import React, { createContext, useState, ReactNode } from "react";

interface KinContextProps {
  children: ReactNode;
}

interface KinContextValue {
  editorValue: string;
  updateEditorValue: (newEditorValue: string) => void;
  outputvalue: string;
  updateOutputValue: (newOutputValue: string) => void;
}

const KinContext = createContext<KinContextValue | undefined>(undefined);

function KinContextProvider({ children }: KinContextProps) {
  const [editorValue, setEditorValue] = useState<string>(
    `tangaza_amakuru("Muraho ", injiza_amakuru("Izina ryawe: "), "!")`
  );

  const [outputvalue, updateOutputValue] = useState<string>("");

  const updateEditorValue = (newEditorValue: string) => {
    setEditorValue(newEditorValue);
  };

  return (
    <KinContext.Provider
      value={{ editorValue, updateEditorValue, outputvalue, updateOutputValue }}
    >
      {children}
    </KinContext.Provider>
  );
}

export { KinContext, KinContextProvider };
