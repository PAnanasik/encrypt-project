"use client";

import { useFormContext } from "../context/formdata";
import { motion } from "framer-motion";
import { useModeContext } from "../context/mode";
import { cn } from "@/lib/utils";

type FormData = {
  data_being: string;
  after_initial_permutation: string;
  info_rounds: {
    [key: string]: {
      round: number;
      lefthalf: string;
      righthalf: string;
      subkey: string;
    };
  };
  result: string;
};

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
      <div className="h-screen flex pt-28 w-full bg-[#151515] justify-center overflow-y-auto min-w-[250px]">
        {formData &&
          (infoRounds || (formData[0] && formData[0].data_being)) &&
          mode && (
            <div className="w-full pl-4">
              <BrowserOnlyReactJson data={formData} />
            </div>
          )}
        {formData &&
          (infoRounds || (formData[0] && formData[0].data_being)) &&
          !mode && (
            <div className="w-full sm:px-8 px-4 flex flex-col space-y-2 items-center">
              <div className="flex flex-wrap gap-2 justify-center">
                {infoRounds
                  ? Object.values(infoRounds).map((roundInfo, index) => (
                      <div
                        key={index}
                        className={cn(
                          `sm:w-max w-full bg-input/40 p-4 rounded-md border border-input`
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
                        <p className="text-sm font-mono">
                          Subkey: {roundInfo.subkey}
                        </p>
                      </div>
                    ))
                  : formData.map((data: FormData, dataIndex: number) => (
                      <div
                        key={dataIndex}
                        className="w-full sm:px-8 px-4 flex flex-col space-y-8 items-center"
                      >
                        <h2 className="text-lg font-medium mt-4">
                          Dataset {dataIndex}
                        </h2>
                        <div className="w-full h-full flex flex-wrap gap-2 items-center justify-center">
                          {Object.values(data.info_rounds).map(
                            (roundInfo, roundIndex) => (
                              <div
                                key={roundIndex}
                                className={cn(
                                  `sm:w-max w-full bg-input/40 p-4 rounded-md border border-input`
                                )}
                              >
                                <h3 className="text-md font-bold tracking-wider text-primary mb-2">
                                  Round {roundInfo.round}
                                </h3>
                                <p className="text-sm font-mono">
                                  Left Half: {roundInfo.lefthalf}{" "}
                                  {typeof roundInfo.lefthalf}
                                </p>
                                <p className="text-sm font-mono">
                                  Right Half: {roundInfo.righthalf}{" "}
                                  {typeof roundInfo.righthalf}
                                </p>
                                <p className="text-sm font-mono">
                                  Subkey: {roundInfo.subkey}{" "}
                                  {typeof roundInfo.subkey}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          )}

        {!formData ||
          (formData.errors && Object.keys(formData.errors).length === 0 && (
            <div className="h-full w-full flex justify-center items-center flex-col p-4 text-center">
              <h2 className="font-bold text-md">Немного пустовато...</h2>
              <p className="text-sm text-muted-foreground">
                Зашифруйте или дешифруйте какой-нибудь текст, чтобы здесь не
                было так пусто :(
              </p>
            </div>
          ))}
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
