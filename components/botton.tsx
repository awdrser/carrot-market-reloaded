"use client";
import { useFormStatus } from "react-dom";

interface IButtonProps {
  text: string;
}

export default function Button({ text }: IButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn h-10 disabled:cursor-not-allowed disabled:bg-neutral-500"
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
