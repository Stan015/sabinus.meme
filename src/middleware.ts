import { NextRequest, NextResponse } from "next/server";
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from '@/utils/supabase/server'

export async function middleware(request: NextRequest) {
  const supabase = createClient()

  // console.log(updateSession(request))

  const user = (await supabase.auth.getUser()).data.user;
  const isLoggedIn = Boolean(user);

  const currentPath = request.nextUrl.pathname;
  const protectedPath = "/favourites";

  const response = NextResponse.next();
  response.cookies.set('isLoggedIn', isLoggedIn ? 'true' : 'false', { httpOnly: false });

  if (user) {
    console.log("logged in user: ", user);
  }

  if (!user) console.log("no user logged in");

  if (!user && currentPath === protectedPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}
