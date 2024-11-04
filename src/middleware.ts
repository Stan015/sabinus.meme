import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = await createClient();

  const user = (await supabase.auth.getUser()).data.user;
  const isLoggedIn = Boolean(user);

  response.cookies.set("isLoggedIn", isLoggedIn ? "true" : "false", {
    httpOnly: false,
  });

  if (user) {
    // console.log("logged in user: ", user);

    const userChecked = request.cookies.get("userChecked");

    if (userChecked?.value === "false") {
      const userEmail = user.email!;
      response.headers.set("x-user-email", userEmail);

      await fetch(`${request.nextUrl.origin}/api/check-user-on-db`, {
        method: "GET",
        headers: {
          "x-user-email": userEmail,
        },
      });

      response.cookies.set("userChecked", "true", { httpOnly: true });
    }
  } else {
    response.cookies.set("userChecked", "false", { httpOnly: true });
  }

  // if (!user) console.log("no user logged in");

  const currentPath = request.nextUrl.pathname;
  const protectedPath = "/favourites";

  if (!user && currentPath === protectedPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
