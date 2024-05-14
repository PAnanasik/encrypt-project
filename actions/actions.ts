"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const encryptTextDES = async (prevState: any, formData: FormData) => {
  console.log(formData);

  const schema = z
    .object({
      block: z
        .string({
          invalid_type_error: "Поле текста не заполнено",
        })
        .min(1, { message: "Поле текста не заполнено" }),
      key: z
        .string({
          invalid_type_error: "Поле ключа не заполнено",
        })
        .min(1, { message: "Поле ключа не заполнено" }),
      key2: z.string().nullable(),
      key3: z.string().nullable(),
      algorithm: z
        .string({
          invalid_type_error: "Алгоритм не выбран",
        })
        .min(1, { message: "Алгоритм не выбран" }),
      choice: z
        .string({
          invalid_type_error: "Метод не выбран",
        })
        .min(1, { message: "Метод не выбран" }),
    })

    .refine(
      (data) => {
        if (
          (data.key2 === null || data.key3 === null) &&
          (data.algorithm === "TRIPLE-DES-EEE" ||
            data.algorithm === "TRIPLE-DES-EDE")
        ) {
          return false;
        }
        return true;
      },
      {
        message:
          "Поля key2 и key3 обязательны для алгоритмов TRIPLE-DES-EEE и TRIPLE-DES-EDE",
      }
    );

  const parse = schema.safeParse({
    block: formData.get("block"),
    key: formData.get("key"),
    key2: formData.get("key2"),
    key3: formData.get("key3"),
    algorithm: formData.get("algorithm"),
    choice: formData.get("choice"),
  });

  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors,
      message: "Пропущены некоторые поля",
    };
  }

  const { block, key, key2, key3, algorithm, choice } = parse.data;

  if (!algorithm || !choice) {
    return { message: "Не все поля заполнены" };
  }

  try {
    let url = "";
    if (algorithm === "DES" && choice === "Шифрование") {
      url = "http://localhost:8000/api/des/encrypt";
    } else if (algorithm === "TRIPLE-DES-EEE" && choice === "Шифрование") {
      url = "http://localhost:8000/api/triple_des_eee/encrypt";
    } else if (algorithm === "TRIPLE-DES-EDE" && choice === "Шифрование") {
      url = "http://localhost:8000/api/triple_des_ede/encrypt";
    } else if (algorithm === "DES" && choice === "Дешифрация") {
      url = "http://localhost:8000/api/des/decrypt";
    } else if (algorithm === "TRIPLE-DES-EEE" && choice === "Дешифрация") {
      url = "http://localhost:8000/api/triple_des_eee/decrypt";
    } else if (algorithm === "TRIPLE-DES-EDE" && choice === "Дешифрация") {
      url = "http://localhost:8000/api/triple_des_ede/decrypt";
    } else {
      return { message: "Неправильный выбор алгоритма или метода" };
    }

    let postData = {};

    if (algorithm === "DES") {
      postData = {
        block: block,
        key: key,
      } as { block: string; key: string };
    } else if (
      algorithm === "TRIPLE-DES-EEE" ||
      algorithm === "TRIPLE-DES-EDE"
    ) {
      postData = {
        block: block,
        key1: key,
        key2: key2,
        key3: key3,
      } as { block: string; key1: string; key2: string; key3: string };
    }

    const response = await axios.post(url, postData);

    revalidatePath("/", "page");

    return response.data;
  } catch (error) {
    return { message: "Что-то пошло не так" };
  }
};
