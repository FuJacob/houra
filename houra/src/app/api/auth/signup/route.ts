import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // TODO: Implement signup logic
  return NextResponse.json(
    { message: "Signup endpoint not implemented" },
    { status: 501 }
  );
}
