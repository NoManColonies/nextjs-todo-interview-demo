import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { sessions } from "../stores/session";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("uid");
  // const session = sessions.find((filter) => filter.sid === cookie);
  // console.log(session);
  // if (!session && request.nextUrl.pathname.startsWith("/api"))
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  console.log("cookie", cookie);
  if (
    !cookie &&
    request.nextUrl.pathname !== "/login" &&
    request.nextUrl.pathname !== "/register"
  )
    return NextResponse.rewrite(new URL("/login", request.url));
  if (
    cookie &&
    !request.nextUrl.pathname.startsWith("/todo") &&
    !request.nextUrl.pathname.startsWith("/user")
  )
    return NextResponse.rewrite(new URL("/todo", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // "/api/todo/:path*",
    // "/api/user/:path*",
    "/todo/:path*",
    "/user/:path*",
    "/",
    "/login",
    "/register",
  ],
};
