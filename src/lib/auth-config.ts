import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  debug: true,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return true;

      console.log("[Auth-SignIn] Handshaking Google account:", user.email);
      try {
        await connectToDatabase();
        const existingUser = await User.findOne({ email: user.email });
        
        if (!existingUser) {
          console.log("[Auth-SignIn] First-time login. Creating Elite profile...");
          const baseUsername = (user.email?.split("@")[0] || "user")
            .toLowerCase()
            .replace(/[^a-z0-9_]/g, '');
          
          let username = baseUsername;
          const isTaken = await User.findOne({ username });
          if (isTaken) {
            username = `${baseUsername}_${Math.floor(Math.random() * 9999)}`;
          }

          const newUser = await User.create({
            name: user.name || "User",
            email: user.email,
            username: username,
            provider: "google",
            avatar: user.image,
          });
          console.log("[Auth-SignIn] Elite profile created:", newUser._id);
        } else {
          console.log("[Auth-SignIn] Welcome back. Syncing profile data...");
          existingUser.name = user.name || existingUser.name;
          existingUser.avatar = user.image || existingUser.avatar;
          await existingUser.save();
        }
        return true;
      } catch (error: any) {
        console.error("[Auth-SignIn] SIGN-IN DENIED:", error.message);
        // We return true here AS A LAST RESORT if it's just a sync failure
        // so the user isn't locked out, but usually we want to return false if critical.
        // For now, let's keep it false to find the real error.
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        console.log("[Auth-JWT] Initial sign-in hydration...");
        try {
          await connectToDatabase();
          const dbUser = await User.findOne({ email: user.email });
          if (dbUser) {
            token.id = dbUser._id.toString();
            token.username = dbUser.username;
          }
        } catch (err) {
          console.error("[Auth-JWT] Sync failed:", err);
        }
      } else if (!token.id && token.email) {
        console.log("[Auth-JWT] Attempting session recovery...");
        try {
          await connectToDatabase();
          const dbUser = await User.findOne({ email: token.email });
          if (dbUser) {
            token.id = dbUser._id.toString();
            token.username = dbUser.username;
          }
        } catch (err) {
          console.error("[Auth-JWT] Recovery failed:", err);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id as string;
        (session.user as any).username = token.username as string;
        console.log("[Auth-Session] Hydrated for:", (session.user as any).id);
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
    error: '/api/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
