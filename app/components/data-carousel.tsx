import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PopoverCard from "./popover-card";

interface RoundInfo {
  round: number;
  lefthalf: string;
  righthalf: string;
  subkey: string;
}

interface InfoRounds {
  [key: string]: RoundInfo;
}

interface BlockData {
  block: string;
  data_being: string;
  after_initial_permutation: string;
  info_rounds: InfoRounds;
  result: string;
}

type DataCarouselProps = {
  data: { binary_text: string; steps: BlockData[]; result: string };
};

const DataCarousel = ({ data }: DataCarouselProps) => {
  return (
    <Carousel
      className="w-full max-w-3xl mx-auto sm:p-0 p-2 flex items-center justify-center h-full"
      orientation="horizontal"
    >
      <CarouselContent>
        {data &&
          data.steps &&
          data.steps.map((step, stepIndex) => (
            <CarouselItem key={stepIndex}>
              <Card>
                <CardContent className="flex sm:aspect-square sm:min-w-[550px] items-center justify-center sm:p-6 w-full">
                  <div
                    key={stepIndex}
                    className="w-full h-full flex flex-col space-y-8 items-center"
                  >
                    <h2 className="text-lg font-medium mt-4">
                      Step {stepIndex + 1}
                    </h2>
                    <div className="w-full h-full flex flex-wrap gap-2 items-center justify-center">
                      <div className={cn(`w-full sm:p-4 space-y-4`)}>
                        <h3 className="text-md font-bold tracking-wider text-primary mb-2 break-all">
                          Block: {step.block}
                        </h3>
                        <p className="text-sm font-mono">
                          Data Being: {step.data_being}
                        </p>
                        <p className="text-sm font-mono">
                          After Initial Permutation:{" "}
                          {step.after_initial_permutation}
                        </p>
                        <div className="w-full flex flex-wrap gap-2">
                          {Object.values(step.info_rounds).map(
                            (roundInfo, roundIndex) => (
                              <PopoverCard
                                key={roundIndex}
                                round={roundInfo.round}
                                lefthalf={roundInfo.lefthalf}
                                righthalf={roundInfo.righthalf}
                                subkey={roundInfo.subkey}
                                index={roundIndex}
                              />
                            )
                          )}
                        </div>
                        <p className="text-sm font-mono break-all">
                          Result: {step.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default DataCarousel;
