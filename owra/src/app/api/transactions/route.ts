import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

export async function POST(request: NextRequest) {
  try {
    const { transaction, accountId } = await request.json();

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

    const { data: account, error: accountError } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", accountId)
      .eq("user_id", user.id)
      .single();

    if (accountError || !account) {
      throw new Error("Account does not belong to user");
    }

    const { data, error } = await supabase.from("transactions").insert({
      ...transaction,
      account_id: account.id,
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ result: data });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to add transaction",
      },
      { status: 500 }
    );
  }
}
