import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectForm = () => {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Выберите алгоритм" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Алгоритм</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectForm;
