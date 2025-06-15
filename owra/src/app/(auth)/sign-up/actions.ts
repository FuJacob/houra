"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isValidEmail, isValidPassword } from "@/utils/validate";
import { createClient } from "@/utils/supabase/server";

export async function signin() {
  redirect("/sign-in");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  // Validate email format
  if (!email || !isValidEmail(email)) {
    throw new Error("Please enter a valid email address");
  }

  // Validate password
  if (!password || !isValidPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
    );
  }

  // Validate names
  if (!firstName || !lastName) {
    throw new Error("Please enter both first and last name");
  }

  // Sign up the user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
      },
    },
  });

  if (authError) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/sign-up/sent");
}
