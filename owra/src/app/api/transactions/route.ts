import { NextRequest, NextResponse } from "next/server";
import { addTransaction } from "@/actions";

export async function POST(request: NextRequest) {
  try {
    const { transaction, accountId } = await request.json();
    const result = await addTransaction(transaction, accountId);
    return NextResponse.json({ result });
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
