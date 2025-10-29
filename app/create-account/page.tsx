"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { useActionState } from "react";
import { createAccount } from "./actions";

export default function CreateAccount() {
  const [state, action] = useActionState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          required
          type="text"
          placeholder="User Name"
          name="userName"
          errors={state?.fieldErrors.userName}
        />
        <FormInput
          required
          type="email"
          placeholder="email"
          name="email"
          errors={state?.fieldErrors.email}
        />
        <FormInput
          name="password"
          required
          type="password"
          placeholder="password"
          errors={state?.fieldErrors.password}
        />
        <FormInput
          name="confirmPassword"
          required
          type="password"
          placeholder="Confirm password"
          errors={state?.fieldErrors.confirmPassword}
        />
        <FormButton text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
}
