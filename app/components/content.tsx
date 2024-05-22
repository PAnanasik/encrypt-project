"use client";

import { useFormContext } from "../context/formdata";
import { motion } from "framer-motion";
import { useModeContext } from "../context/mode";
import { cn } from "@/lib/utils";
import DataCarousel from "./data-carousel";
import BigDataCarousel from "./big-data-carousel";

const ContentBlock = () => {
  const { formData } = useFormContext();
  const { mode, algorithmData } = useModeContext();

  console.log(algorithmData);

  return (
    <motion.div
      className="relative flex items-center justify-center h-full w-full"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="h-screen flex pt-24 w-full bg-[#151515] justify-center overflow-y-auto sm:min-w-[450px] min-w-[280px]">
        {formData && mode && (
          <div className="w-full pl-4">
            <BrowserOnlyReactJson data={formData} />
          </div>
        )}
        {formData && !mode && algorithmData === "DES" && (
          <div className="w-full h-full flex flex-col space-y-4 px-4">
            <div
              className="w-full max-w-3xl mx-auto p-4 space-y-4 flex flex-col items-center border
             border-input rounded-md bg-card"
            >
              <h2 className="text-md font-medium">Binary Text</h2>
              <p className="text-sm font-mono text-primary break-all">
                {formData && formData.binary_text}
              </p>
            </div>
            <DataCarousel data={formData} />
            <div
              className="w-full mx-auto p-4 space-y-4 flex flex-col items-center border
              border-input rounded-md bg-card max-w-3xl"
            >
              <h2 className="text-md font-medium">Final Result</h2>
              <p className="text-sm font-mono text-primary font-bold">
                {formData && formData.result}
              </p>
            </div>
          </div>
        )}
        {formData &&
          !mode &&
          (algorithmData === "TRIPLE-DES-EEE" ||
            algorithmData === "TRIPLE-DES-EDE") && (
            <div className="w-full h-full flex flex-col">
              <BigDataCarousel data={formData} />
            </div>
          )}
      </div>
    </motion.div>
  );
};

export const BrowserOnlyReactJson = (data: any) => {
  if (typeof window === "undefined") {
    return null;
  }
  const ReactJson = require("react-json-view").default;
  return <ReactJson src={data} theme="summerfruit" collapsed={false} />;
};

export default ContentBlock;
