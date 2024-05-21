import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";

import React from "react";

type PopoverCardProps = {
  round: number;
  lefthalf: string;
  righthalf: string;
  subkey: string;
  index: number;
};

const PopoverCard = ({
  round,
  lefthalf,
  righthalf,
  subkey,
  index,
}: PopoverCardProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span
          className="p-2 aspect-square rounded-md bg-input/50 border border-white/5 cursor-pointer min-w-[2.5rem] 
          text-center flex items-center justify-center w-max hover:bg-white/10 ease transition-all text-sm"
        >
          {index + 1}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className={cn(`w-full`)}>
          <h3 className="text-md font-bold tracking-wider text-primary mb-2">
            Round {round}
          </h3>
          <p className="text-sm font-mono">Left Half: {lefthalf}</p>
          <p className="text-sm font-mono">Right Half: {righthalf}</p>
          <p className="text-sm font-mono">Subkey: {subkey}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverCard;
