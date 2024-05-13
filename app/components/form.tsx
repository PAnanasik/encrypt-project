"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { useState } from "react";

const FormSchema = z.object({
  key: z.string({ required_error: "Это обязательное поле" }).min(2, {
    message: "Минимальная длина ключа 2 символа",
  }),
  key2: z.string({ required_error: "Это обязательное поле" }).min(2, {
    message: "Минимальная длина ключа 2 символа",
  }),
  key3: z.string().min(2, {
    message: "Минимальная длина ключа 2 символа",
  }),
  choice: z.string({ required_error: "Это обязательное поле" }),
  algorithm: z.string({ required_error: "Это обязательное поле" }),
  block: z.string({ required_error: "Это обязательное поле" }).min(2, {
    message: "Минимальная длина текста для шифрования 2 символа",
  }),
});

const FormMain = () => {
  const { setFormData } = useFormContext();
  const [algorithm, setAlgorithm] = useState("");
  const [choice, setChoice] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      key: "",
      key2: "",
      key3: "",
      block: "",
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full flex items-center justify-center pt-24 sm:pt-30"
    >
      <Form {...form}>
        <form
          action={async (formData) => {
            const response = await encryptTextDES(formData, choice, algorithm);
            if (response && "error" in response && response.error) {
              toast("Произошла ошибка", { description: response.error });
            } else {
              toast("Данные загружены", {
                description:
                  "Если данных не видно, отодвиньте шторку с данными влево",
              });
            }
            setFormData(response);
          }}
          className="sm:w-3/4 w-full min-w-[250px] h-[450px] overflow-y-auto space-y-3 px-4"
        >
          <FormField
            control={form.control}
            name="choice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Выбор метода</FormLabel>
                <Select
                  onValueChange={(currentValue) => {
                    field.onChange;
                    setChoice(currentValue);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Шифрование/дешифрация" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Шифрование">Шифрование</SelectItem>
                    <SelectItem value="Дешифрация">Дешифрация</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Выберите метод - шифрование или дешифрация
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="algorithm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Алгоритм</FormLabel>
                <Select
                  onValueChange={(currentValue) => {
                    field.onChange;
                    setAlgorithm(currentValue);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите алгоритм" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DES">DES</SelectItem>
                    <SelectItem value="TRIPLE-DES-EEE">
                      TRIPLE DES EEE
                    </SelectItem>
                    <SelectItem value="TRIPLE-DES-EDE">
                      TRIPLE DES EDE
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Выберите алгоритм - DES, TRIPLE DES EEE или TRIPLE DES EDE
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ключ</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Например, 5176F67A0DF673B4"
                    {...field}
                    required
                  />
                </FormControl>
                <FormDescription>
                  Текст ниже будет зашифрован/дешифрован с помощью этого ключа
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {(algorithm === "TRIPLE-DES-EEE" ||
            algorithm === "TRIPLE-DES-EDE") && (
            <FormField
              control={form.control}
              name="key2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ключ 2</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Еще, например, 4176F67A0DF673B4"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormDescription>И этого ключа</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {(algorithm === "TRIPLE-DES-EEE" ||
            algorithm === "TRIPLE-DES-EDE") && (
            <FormField
              control={form.control}
              name="key3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ключ 3</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="И еще, например, 3176F67A0DF673B4"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormDescription>И еще этого ключа</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="block"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Текст</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="1011001110110011011100101011101100000001011001101000111101100101"
                    {...field}
                    required
                  />
                </FormControl>
                <FormDescription>
                  Именно этот текст будет зашифрован/дешифрован выбранным вами
                  алгоритмом
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <EncryptButton />
        </form>
      </Form>
    </motion.div>
  );
};

export default FormMain;
