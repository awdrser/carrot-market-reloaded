"use client";

import Button from "@/components/botton";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useActionState, useState } from "react";
import { createAccount } from "./actions";

export default function CreateAccount() {
  const [state, action] = useActionState(createAccount, null);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input
          required
          type="text"
          placeholder="User Name"
          name="username"
          value={form.username}
          onChange={onChange}
          errors={state?.fieldErrors.username}
          minLength={2}
          maxLength={10}
        />
        <Input
          required
          type="email"
          placeholder="email"
          name="email"
          value={form.email}
          onChange={onChange}
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          required
          type="password"
          placeholder="password"
          value={form.password}
          onChange={onChange}
          errors={state?.fieldErrors.password}
        />
        <Input
          name="confirmPassword"
          required
          type="password"
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChange={onChange}
          errors={state?.fieldErrors.confirmPassword}
        />
        <Button text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
}
