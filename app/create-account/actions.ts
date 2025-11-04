"use server";
import bcrypt from "bcrypt";
import { z } from "zod";
import db from "../lib/db";
import getSession from "../lib/session";

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
    username: z.string().min(2, "너무 짧습니다.").max(10, "너무 깁니다."),
    email: z.email().toLowerCase().trim().toLowerCase(),
    password: z.string(),
    //.min(8, "8자 이상이어야 합니다.")
    //.regex(PASSWORD_REGEX, { error: "특수기호가 포함되어야 합니다." }),
    confirmPassword: z.string(), //.min(PASSWORD_MIN_LENGTH, "8자 이상이어야 합니다."),
  })
  .superRefine(async (data, ctx) => {
    const checkUniqueUsername = await db.user.findUnique({
      where: {
        username: data.username,
      },
      select: {
        id: true,
      },
    });

    const checkUniqueEmail = await db.user.findUnique({
      where: {
        email: data.email,
      },
      select: {
        id: true,
      },
    });

    if (checkUniqueUsername) {
      ctx.addIssue({
        code: "custom",
        message: "이름이 이미 존재합니다.",
        path: ["username"],
      });
      return;
    }

    if (checkUniqueEmail) {
      ctx.addIssue({
        code: "custom",
        message: "이메일이 이미 존재합니다.",
        path: ["email"],
      });
      return;
    }
  })
  .refine(crossCheckPassword, {
    error: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export async function createAccount(prevItem: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    const flatten = z.flattenError(result.error);
    return { fieldErrors: flatten.fieldErrors };
  } else {
    const HashPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: HashPassword,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    //@ts-ignore
    session.id = user.id;
    await session.save();
  }
}
