import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

export async function POST() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      throw new Error(userError.message);
    }

    if (!user) {
      throw new Error("User not found");
    }

    const { data: accounts, error: accountsError } = await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", user.id);

    if (accountsError) {
      throw new Error(accountsError.message);
    }

    const currentTime = new Date().getTime();

    accounts.forEach(async (account) => {
      if (currentTime - account.last_reload >= account.reload_freq) {
        account.account_balance =
          account.account_balance + account.reloadAmount;
        account.last_reload = currentTime;
        await supabase
          .from("accounts")
          .update({
            account_balance: account.account_balance,
            last_reload: currentTime,
          })
          .eq("id", account.id);
      }
    });

    return NextResponse.json({ accounts });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to reload accounts",
      },
      { status: 500 }
    );
  }
}
