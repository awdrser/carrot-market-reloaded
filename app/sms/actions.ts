"use server";

import { redirect } from "next/navigation";
import validator from "validator";
import z from "zod";

interface ActionState {
  token: boolean;
  formErrors?: string[];
}
const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "잘못된 번호 형식입니다."
  );
const tokenSchema = z.coerce.number().min(100000).max(999999);

export async function smsLogin(prevState: ActionState, formData: FormData) {
  const phone = formData.get("phone");
  const token = formData.get("token");

  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      const flatten = z.flattenError(result.error);
      console.log(flatten);
      return { token: false, formErrors: flatten.formErrors };
    } else {
      return { token: true };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      const flatten = z.flattenError(result.error);
      console.log(flatten);
      return { token: true, formErrors: flatten.formErrors };
    } else {
      redirect("/");
    }
  }
}
