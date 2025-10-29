"use client";
import Button from "@/components/botton";
import Input from "@/components/input";
import { useActionState } from "react";
import { smsVerification } from "./actions";

export default function SMSLogin() {
  const [state, dispatch] = useActionState(smsVerification, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Log in</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <Input
          type="number"
          placeholder="Phone number"
          required
          name="phoneNumber"
        />
        <Input
          type="number"
          placeholder="Verification code"
          required
          name="verifiCode"
        />
        <Button text="Verify" />
      </form>
    </div>
  );
}
