"use server";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { z } from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "../lib/constants";
import db from "../lib/db";

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

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const formSchema = z
  .object({
    userName: z
      .string()
      .min(2, "너무 짧습니다.")
      .max(10, "너무 깁니다.")
      .refine(checkUniqueUsername, "이미 존재하는 이름입니다."),
    email: z
      .email()
      .toLowerCase()
      .trim()
      .toLowerCase()
      .refine(checkUniqueEmail, "이미 존재하는 이메일입니다."),
    password: z
      .string()
      .min(10, "10자 이상이어야 합니다.")
      .regex(PASSWORD_REGEX, { error: "특수기호가 포함되어야 합니다." }),
    confirmPassword: z.string().min(PASSWORD_MIN_LENGTH),
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
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    const flatten = z.flattenError(result.error);
    return { fieldErrors: flatten.fieldErrors };
  } else {
    const HashPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.userName,
        email: result.data.email,
        password: HashPassword,
      },
      select: {
        id: true,
      },
    });
    const cookie = await getIronSession(await cookies(), {
      cookieName: "carrot-market",
      password: process.env.COOKIE_PASSWORD!,
    });
    //@ts-ignore
    cookie.id = user.id;
    await cookie.save();
  }
}
