import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        {
          success: true,
          message: "Login successful",
          token: "moonchill_admin_secret_token",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Invalid email or password" },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
