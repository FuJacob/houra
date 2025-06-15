import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    const supabase = await createClient();

    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name, // Store name in user_metadata
        },
      },
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 400 }
      );
    }

    // Optionally, create a record in your users table
    const { error: userError } = await supabase.from("users").insert([
      {
        id: authData.user.id,
        name,
        created_at: new Date().toISOString(),
      },
    ]);

    // Don't fail if user table insert fails, as the auth user was created successfully
    if (userError) {
      console.warn("Failed to create user record:", userError);
    }

    return NextResponse.json({
      message: "User created successfully",
      user: authData.user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
