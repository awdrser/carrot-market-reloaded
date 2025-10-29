"use server";
import { z } from "zod";

const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

const crossCheckPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => {
  if (password === confirmPassword) {
    return true;
  } else return false;
};

const formSchema = z
  .object({
    userName: z.string().min(2, "너무 짧습니다.").max(10, "너무 깁니다."),
    email: z.email().toLowerCase().trim(),
    password: z
      .string()
      .min(10)
      .regex(specialCharRegex, { error: "특수기호가 들어가야 합니다." }),
    confirmPassword: z.string().min(10),
  })
  .refine(crossCheckPassword, {
    error: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export async function createAccount(prevItem: any, formData: FormData) {
  const data = {
    userName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    const flatten = z.flattenError(result.error);
    return { fieldErrors: flatten.fieldErrors };
  }
}
