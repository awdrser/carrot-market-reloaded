"use client";
import Button from "@/components/botton";
import Input from "@/components/input";
import { useActionState } from "react";
import { smsLogin } from "./actions";

const initialState = {
  token: false,
  formErrors: undefined,
};

export default function SMSLogin() {
  const [state, dispatch] = useActionState(smsLogin, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Log in</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state?.token ? (
          <Input
            type="text"
            placeholder="Verification code"
            required
            name="token"
            min={100000}
            max={999999}
            errors={state.formErrors}
          />
        ) : (
          <Input
            type="number"
            placeholder="Phone number"
            required
            name="phone"
            errors={state.formErrors}
          />
        )}
        <Button text={state.token ? "인증번호 확인" : "인증번호 받기"} />
      </form>
    </div>
  );
}
