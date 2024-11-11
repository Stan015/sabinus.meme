import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  const userEmail = req.headers.get("x-user-email");

  if (!userEmail) {
    return NextResponse.json(
      { error: "User email not found" },
      { status: 400 },
    );
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("username")
      .eq("email", userEmail)
      .single();

    if (error) {
      console.error("Error fetching username from db: ", error.message);
      return NextResponse.json(
        { error: "Error fetching user from database" },
        { status: 500 },
      );
    }

    if (data) {
      console.log(data);
      return NextResponse.json(data, { status: 200 });
    }

    return NextResponse.json({ error: "User not found" }, { status: 404 });
  } catch (err) {
    console.error("Internal Server Error:", (err as Error).message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
