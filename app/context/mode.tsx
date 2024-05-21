"use client";

import { useState, createContext, useContext } from "react";

type ModeType = {
  mode: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
  algorithmData: string;
  setAlgorithmData: React.Dispatch<React.SetStateAction<string>>;
};

export const ModeContext = createContext<ModeType | null>(null);

export default function ModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<boolean>(true);
  const [algorithmData, setAlgorithmData] = useState<string>("");

  return (
    <ModeContext.Provider
      value={{
        mode,
        setMode,
        algorithmData,
        setAlgorithmData,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
}

export const useModeContext = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
