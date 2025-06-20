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
      redirectTo: `https://oowra.vercel.app/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  //http://localhost:3000/?code=3d5419ca-1879-4b16-863f-761da80e0eb6
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
