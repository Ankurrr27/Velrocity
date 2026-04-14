'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getUserId } from '@/lib/auth';
import * as jose from 'jose';

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
}

export async function getExtensionToken() {
  try {
    const userId = await getUserId();
    const cookieStore = await cookies();
    const existingToken = cookieStore.get('token')?.value;

    if (existingToken) return existingToken;

    // Generate a secure token if it's missing (e.g. user logged in via Google)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_key');
    const token = await new jose.SignJWT({ id: userId })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(secret);

    return token;
  } catch (error) {
    console.error("[Auth] getExtensionToken error:", error);
    return null;
  }
}
