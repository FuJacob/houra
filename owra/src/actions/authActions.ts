import { createClient } from "@/utils/supabase/client";

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
