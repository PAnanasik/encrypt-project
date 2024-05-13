"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const encryptTextDES = async (
  formData: FormData,
  choice: string,
  algorithm: string
) => {
  const schema = z
    .object({
      block: z.string({
        invalid_type_error: "Поле текста не заполнено",
      }),
      key: z.string({
        invalid_type_error: "Поле ключа не заполнено",
      }),
      key2: z.string().nullable(),
      key3: z.string().nullable(),
    })
    .refine(
      (data) => {
        if (
          (data.key2 === null || data.key3 === null) &&
          (algorithm === "TRIPLE-DES-EEE" || algorithm === "TRIPLE-DES-EDE")
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
  });

  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors,
      message: "Пропущены некоторые поля",
    };
  }

  if (!algorithm || !choice) {
    return { error: "Не все поля заполнены" };
  }

  const { block, key, key2, key3 } = parse.data;

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
      return { error: "Неправильный выбор алгоритма или метода" };
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
    return { error: "Что-то пошло не так" };
  }
};
