import { createClient } from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const supabase = createClient();
  const body = await request.json();

  const { username, email, password } = body;

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const { data, error } = await supabase.from("users").insert([
    {
      username: username,
      email: email,
      password: passwordHash,
    },
  ]);

  if (error) {
    console.error("Error inserting user:", error.message);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  console.log({ "sign-up-data": body, "users-table": data });
  return new NextResponse(JSON.stringify(data), { status: 201 });
}
