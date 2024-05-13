"use client";

import { useFormContext } from "../context/formdata";
import { motion } from "framer-motion";

const ContentBlock = () => {
  const { formData } = useFormContext();
  return (
    <motion.div
      className="relative flex items-center justify-center h-full w-full"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="h-screen flex flex-wrap pt-28 w-full bg-[#151515] sm:pl-4 pl-36 justify-center overflow-y-auto">
        {formData && <BrowserOnlyReactJson />}

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
