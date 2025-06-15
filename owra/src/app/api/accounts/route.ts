import { NextRequest, NextResponse } from "next/server";
import { getAccounts, addAccount } from "@/actions/accountsActions";

export async function GET() {
  try {
    const accounts = await getAccounts();
    return NextResponse.json({ accounts });
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
    const result = await addAccount(account);
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to add account",
      },
      { status: 500 }
    );
  }
}
