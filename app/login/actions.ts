"use server";

export default async function handleForm(
  prevState: { errors: string[] } | null,
  formData: FormData
) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    errors: ["wrong password", "password too short"],
  };
}
