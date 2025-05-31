import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // TODO: Implement login logic
  return NextResponse.json(
    { message: "Login endpoint not implemented" },
    { status: 501 }
  );
}
