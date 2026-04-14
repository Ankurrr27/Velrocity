import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Please provide email/username and password." },
        { status: 400 }
      );
    }

    // Support login by email OR username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("+password");

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { error: "This account uses OAuth. Please login with Google." },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT Payload
    const payload = {
      id: user._id,
      username: user.username,
      role: user.role,
    };

    const secret = process.env.JWT_SECRET || "fallback_secret_key";
    const token = jwt.sign(payload, secret, { expiresIn: "7d" });

    // Set cookie
    const response = NextResponse.json(
      { message: "Login successful", user: { id: user._id, username: user.username, email: user.email, name: user.name, avatar: user.avatar } },
      { status: 200 }
    );

    console.log("[Login] Setting token cookie. Environment:", process.env.NODE_ENV);

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // Changed from strict to lax for better session persistence
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
