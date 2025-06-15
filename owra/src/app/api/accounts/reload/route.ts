import { NextResponse } from "next/server";
import { reloadAccounts } from "@/actions";

export async function POST() {
  try {
    const accounts = await reloadAccounts();
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
