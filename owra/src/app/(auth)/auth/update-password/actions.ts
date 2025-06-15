"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { isValidPassword } from "@/utils/validate";

export async function updatePassword(formData: FormData) {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    throw new Error("Both password fields are required");
  }

  if (!isValidPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
    );
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect(`/home?message=Password updated successfully`);
}
