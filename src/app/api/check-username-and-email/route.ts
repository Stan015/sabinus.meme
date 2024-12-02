import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const username = req.headers.get("x-username");
  const email = req.headers.get("x-email");

  if (!username || !email) {
    return NextResponse.json(
      {
        error: "Missing headers",
        details: {
          username: !username ? "Username header is missing" : null,
          email: !email ? "Email header is missing" : null,
        },
      },
      { status: 400 },
    );
  }

  try {
    // Check username and email existence
    const { data: usernameData, error: usernameError } = await supabase
      .from("users")
      .select("username")
      .eq("username", username)
      .single();

    const { data: emailData, error: emailError } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (usernameError && usernameError.code !== "PGRST116") {
      console.error("Error checking username:", usernameError.message);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }

    if (emailError && emailError.code !== "PGRST116") {
      console.error("Error checking email:", emailError.message);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }

    // Return specific error messages
    const errors: { username?: string; email?: string } = {};
    if (usernameData) errors.username = "Username already exists";
    if (emailData) errors.email = "Email already exists";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 },
      );
    }

    // Both are available
    return NextResponse.json({ message: "Username and email are available" });
  } catch (error) {
    console.error(
      "Unexpected error during validation:",
      (error as Error).message,
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
