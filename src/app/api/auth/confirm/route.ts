import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    console.error("Authorization code is missing.");
    return NextResponse.redirect(
      `${requestUrl.origin}/error?message=Missing authorization code`,
    );
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Failed to exchange code for session:", error.message);
      return NextResponse.redirect(
        `${requestUrl.origin}/error?message=${encodeURIComponent(error.message)}`,
      );
    }

    console.log("from API", requestUrl.origin);

    return NextResponse.redirect(requestUrl.origin);
  } catch (err) {
    console.error(
      "Unexpected error during code exchange:",
      (err as Error).message,
    );
    return NextResponse.redirect(
      `${requestUrl.origin}/error?message=Unexpected error occurred`,
    );
  }
}
