import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("Missing JWT_SECRET");
      
      const secretKey = new TextEncoder().encode(secret);
      await jwtVerify(token, secretKey);
      
      return NextResponse.next();
    } catch (err) {
      // Token is invalid or expired
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If a logged-in user tries to access /login, redirect them to /admin
  if (request.nextUrl.pathname.startsWith("/login") && token) {
    try {
      const secret = process.env.JWT_SECRET;
      if (secret) {
        const secretKey = new TextEncoder().encode(secret);
        await jwtVerify(token, secretKey);
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } catch (err) {
      // Invalid token, allow access to login page
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
