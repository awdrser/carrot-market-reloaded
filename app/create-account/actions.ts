"use server";
import { z } from "zod";

const formSchema = z.object({
  userName: z.string().min(3).max(10),
  email: z.email(),
  password: z.string().min(10),
  confirmPassword: z.string().min(10),
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
    console.log(flatten);
    return { fieldErrors: flatten.fieldErrors };
  }
}
