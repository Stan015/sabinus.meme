import { NextRequest } from "next/server";
import { supabase } from "./app/lib/supabaseClient";

export async function middleware(request: NextRequest) {
    const user = (await supabase.auth.getUser()).data.user;

    if (user) {
        console.log("logged in user: ", user)
    } else (
        console.log("no user logged in")
    )

    // console.log(request)
}