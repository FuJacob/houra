import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

export async function GET() {
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

    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ accounts: data });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to get accounts",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const account = await request.json();

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

    const { data, error } = await supabase.from("accounts").insert({
      user_id: user.id,
      ...account,
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ newAccount: data });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to add account",
      },
      { status: 500 }
    );
  }
}
