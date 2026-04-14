import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // 1. ABSOLUTE BYPASS: Never touch API, Next.js internals, or static assets
  if (
    pathname.startsWith("/api") || 
    pathname.startsWith("/_next") || 
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;
  const nextAuthSession = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  const isAuthenticated = !!token || !!nextAuthSession;

  // 2. PATH CATEGORIES
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isLandingPage = pathname === "/";
  const isProtectedRoute = pathname.startsWith("/dashboard") || 
                           pathname.startsWith("/profile") ||
                           pathname.startsWith("/users");

  // 3. REDIRECT LOGIC
  
  // If authenticated and trying to hit Login or Landing -> Go to Dashboard
  if (isAuthenticated && (isAuthPage || isLandingPage)) {
    console.log(`[Middleware] Authenticated: Redirecting ${pathname} -> /dashboard`);
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If NOT authenticated and trying to hit Protected areas -> Go to Login
  if (!isAuthenticated && isProtectedRoute) {
    console.log(`[Middleware] Unauthenticated: Redirecting ${pathname} -> /login`);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 4. CATCH-ALL: Allow the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
