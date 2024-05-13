"use client";

import { useFormContext } from "../context/formdata";
import { motion } from "framer-motion";
import { useModeContext } from "../context/mode";
import { cn } from "@/lib/utils";

const ContentBlock = () => {
  const { formData } = useFormContext();
  const { mode } = useModeContext();

  const infoRounds: {
    [key: string]: {
      round: number;
      lefthalf: string;
      righthalf: string;
      subkey: string;
    };
  } = formData && formData.info_rounds;

  return (
    <motion.div
      className="relative flex items-center justify-center h-full w-full"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="h-screen flex pt-28 w-full bg-[#151515] justify-center overflow-y-auto">
        {formData && mode && (
          <div className="w-full pl-4">
            <BrowserOnlyReactJson />
          </div>
        )}
        {formData && !mode && (
          <div className="w-full px-4 flex flex-col gap-4 h-full group">
            {Object.values(infoRounds).map((roundInfo, index) => (
              <div
                key={index}
                className={cn(
                  `w-1/2 bg-input/40 p-4 rounded-md border border-input`,
                  (index & 1) === 0 ? "self-start text-left" : "self-end"
                )}
              >
                <h3 className="text-md font-bold tracking-wider text-primary mb-2">
                  Round {roundInfo.round}
                </h3>
                <p className="text-sm font-mono">
                  Left Half: {roundInfo.lefthalf}
                </p>
                <p className="text-sm font-mono">
                  Right Half: {roundInfo.righthalf}
                </p>
                <p className="text-sm font-mono">Subkey: {roundInfo.subkey}</p>
              </div>
            ))}
          </div>
        )}

        {!formData && (
          <div className="h-full w-full flex justify-center items-center flex-col p-4 text-center">
            <h2 className="font-bold text-md">Немного пустовато...</h2>
            <p className="text-sm text-muted-foreground">
              Зашифруйте или дешифруйте какой-нибудь текст, чтобы здесь не было
              так пусто :(
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const BrowserOnlyReactJson = () => {
  const { formData } = useFormContext();
  if (typeof window === "undefined") {
    return null;
  }
  const ReactJson = require("react-json-view").default;
  return <ReactJson src={formData} theme="summerfruit" collapsed={false} />;
};

export default ContentBlock;
