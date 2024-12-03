// @ts-nocheck

import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

type User = {
  id: string;
  email: string;
};

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const userEmail = request.headers.get("x-user-email");

  if (!userEmail) {
    return new NextResponse("User email not found", { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", userEmail)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Error fetching user:", error.message);
      return new NextResponse("Error fetching user from database", {
        status: 400,
      });
    }

    if (data) {
      return new NextResponse(JSON.stringify(data), { status: 200 });
    }

    const { data: insertData, error: insertError } = await supabase
      .from("users")
      .insert([{ email: userEmail }]);

    if (insertError) {
      console.error("Error inserting user:", insertError.message);
      return new NextResponse("Error inserting user", { status: 500 });
    }

    return new NextResponse(JSON.stringify(insertData[0]), { status: 201 });
  } catch (err) {
    console.error("Internal Server Error:", (err as Error).message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
