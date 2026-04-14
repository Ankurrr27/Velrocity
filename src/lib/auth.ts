import { cookies, headers } from 'next/headers';
import * as jose from 'jose';
import { getToken } from "next-auth/jwt";
import connectToDatabase from "@/lib/mongodb";

/**
 * Unified utility to retrieve the current user ID in server-side contexts.
 * Supports both custom JWT tokens and NextAuth sessions.
 */
export async function getUserId(): Promise<string> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('token')?.value;

  const headerStore = await headers();
  const authHeader = headerStore.get('authorization');
  const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
  
  const token = tokenFromHeader || tokenCookie;

  console.log("[Auth] Checking token existence:", !!token);

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_key');
      const { payload } = await jose.jwtVerify(token, secret);
      if (payload.id) {
        console.log("[Auth] Custom JWT verified for user ID:", payload.id);
        return payload.id as string;
      }
    } catch (error) {
      console.error("[Auth] Custom JWT Verification failed:", error);
    }
  }

  // 2. Check NextAuth via getToken (more reliable in server actions)
  try {
    const nextHeaders = await headers();
    const allCookies = cookieStore.getAll();
    console.log("[Auth] Available cookies count:", allCookies.length);
    allCookies.forEach(c => {
      if (c.name.includes('next-auth')) {
        console.log("[Auth] Found NextAuth cookie:", c.name);
      }
    });
    
    // Create a mock Request object that getToken expects
    const req = {
      headers: Object.fromEntries(nextHeaders.entries()),
      cookies: Object.fromEntries(allCookies.map(c => [c.name, c.value])),
    };

    const nextAuthToken = await getToken({
      req: req as any,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (nextAuthToken?.id) {
      console.log("[Auth] NextAuth session verified for user ID:", nextAuthToken.id);
      return nextAuthToken.id as string;
    } else if (nextAuthToken) {
       console.log("[Auth] NextAuth token found but NO ID. Email:", nextAuthToken.email, "Keys:", Object.keys(nextAuthToken));
       // If ID is missing, try to find user by email as a fallback
       if (nextAuthToken.email) {
          await connectToDatabase();
          const User = (await import('@/models/User')).default;
          const user = await User.findOne({ email: nextAuthToken.email });
          if (user) {
             console.log("[Auth] Fallback user lookup success for:", nextAuthToken.email);
             return user._id.toString();
          }
       }
    } else {
       console.log("[Auth] getToken returned NULL. Check NEXTAUTH_SECRET and NEXTAUTH_URL.");
    }
  } catch (error) {
    console.error("[Auth] Exception in getToken flow:", error);
  }

  throw new Error('Not authenticated');
}
