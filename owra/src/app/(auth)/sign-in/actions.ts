"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signup() {
  redirect("/sign-up");
}

export async function loginWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  if (error) {
    console.error("Google OAuth error:", error);
    redirect("/error");
  }

  if (!data?.url) {
    console.error("No OAuth URL returned");
    redirect("/auth/auth-error");
  }

  redirect(data.url);
}
