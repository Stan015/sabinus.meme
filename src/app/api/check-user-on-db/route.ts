import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const userEmail = request.headers.get("x-user-email");

  if (!userEmail) {
    return new NextResponse("User email not found", { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", userEmail)
      .single();

    if (data) {
      return new NextResponse(JSON.stringify(data), { status: 201 });
    }

    if (error) {
      console.error("Error selecting user:", error.message);
      const { data: insertData, error: insertError } = await supabase
        .from("users")
        .insert([{ email: userEmail }]);

      if (insertError) {
        console.error("Error inserting user:", insertError.message);
        return new NextResponse("Error inserting user", { status: 500 });
      }

      return new NextResponse(JSON.stringify(insertData), { status: 201 });
    }

    return new NextResponse(null, { status: 404 });
  } catch (err) {
    console.error("Internal Server Error:", (err as Error).message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
