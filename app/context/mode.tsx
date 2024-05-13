"use client";

import { useState, createContext, useContext } from "react";

type ModeType = {
  mode: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModeContext = createContext<ModeType | null>(null);

export default function ModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<boolean>(true);

  return (
    <ModeContext.Provider
      value={{
        mode,
        setMode,
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
