"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EncryptButton from "@/components/ui/encryptbutton";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { encryptTextDES } from "@/actions/actions";
import { useFormContext } from "../context/formdata";
import { useEffect, useState } from "react";
import Label from "./label";
import Description from "./description";
import { FormItem } from "./formitem";
import { useFormState } from "react-dom";

const initialState = { message: null, errors: {} };

const FormMain = () => {
  const [formState, formAction] = useFormState(encryptTextDES, initialState);

  const { setFormData } = useFormContext();
  const [algorithm, setAlgorithm] = useState("");

  useEffect(() => {
    setFormData(formState);
    toast(`${formState.message || "Данные загружены"}`, {
      description:
        "Если данные не отображаются, отодвиньте шторку с ними влево",
    });
    console.log(formState);
  }, [formState, setFormData]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full flex items-center justify-center pt-24 sm:pt-30"
    >
      <form
        action={formAction}
        className="sm:w-3/4 w-full min-w-[250px] h-[450px] overflow-y-auto space-y-3 px-4"
      >
        <FormItem>
          <Label htmlFor="choice">Выбор метода</Label>
          <Select name="choice" aria-describedby="choice-error">
            <SelectTrigger>
              <SelectValue placeholder="Шифрование/дешифрация" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Шифрование">Шифрование</SelectItem>
              <SelectItem value="Дешифрация">Дешифрация</SelectItem>
            </SelectContent>
          </Select>
          <Description>Выберите метод - шифрование или дешифрация</Description>
        </FormItem>

        <div id="choice-error" aria-live="polite" aria-atomic="true">
          {formState.errors?.choice &&
            formState.errors.choice.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

        <FormItem>
          <Label htmlFor="algorithm">Алгоритм</Label>
          <Select
            name="algorithm"
            onValueChange={(value) => setAlgorithm(value)}
            aria-describedby="algorithm-error"
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите алгоритм" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DES">DES</SelectItem>
              <SelectItem value="TRIPLE-DES-EEE">TRIPLE DES EEE</SelectItem>
              <SelectItem value="TRIPLE-DES-EDE">TRIPLE DES EDE</SelectItem>
            </SelectContent>
          </Select>
          <Description>
            Выберите алгоритм - DES, TRIPLE DES EEE или TRIPLE DES EDE
          </Description>
        </FormItem>

        <div id="algorithm-error" aria-live="polite" aria-atomic="true">
          {formState.errors?.algorithm &&
            formState.errors.algorithm.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

        <FormItem>
          <Label htmlFor="key">Ключ</Label>
          <Input
            placeholder="Например, 5176F67A0DF673B4"
            name="key"
            aria-describedby="key-error"
            defaultValue=""
          />
          <Description>
            Текст ниже будет зашифрован/дешифрован с помощью этого ключа
          </Description>
        </FormItem>

        <div id="key-error" aria-live="polite" aria-atomic="true">
          {formState.errors?.key &&
            formState.errors.key.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

        {(algorithm === "TRIPLE-DES-EEE" || algorithm === "TRIPLE-DES-EDE") && (
          <FormItem>
            <Label htmlFor="key2">Ключ 2</Label>
            <Input placeholder="Еще, например, 4176F67A0DF673B4" name="key2" />
            <Description>И этого ключа</Description>
          </FormItem>
        )}

        {(algorithm === "TRIPLE-DES-EEE" || algorithm === "TRIPLE-DES-EDE") && (
          <FormItem>
            <Label htmlFor="key3">Ключ 3</Label>
            <Input
              placeholder="И еще, например, 3176F67A0DF673B4"
              name="key3"
            />
            <Description>И еще этого ключа</Description>
          </FormItem>
        )}

        <FormItem>
          <Label htmlFor="block">Текст</Label>
          <Textarea
            name="block"
            placeholder="1011001110110011011100101011101100000001011001101000111101100101"
            aria-describedby="block-error"
            defaultValue=""
          />
          <Description>
            Именно этот текст будет зашифрован/дешифрован выбранным вами
            алгоритмом
          </Description>
        </FormItem>

        <div id="block-error" aria-live="polite" aria-atomic="true">
          {formState.errors?.block &&
            formState.errors.block.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

        <EncryptButton />
      </form>
    </motion.div>
  );
};

export default FormMain;
