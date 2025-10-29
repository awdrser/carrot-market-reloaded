"use server";

import z from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "../lib/constants";

const formSchema = z.object({
  email: z.email().toLowerCase().trim(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, "특수기호가 포함되어야 합니다."),
});

export default async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    const flatten = z.flattenError(result.error);
    return { fieldErrors: flatten.fieldErrors };
  }
}
