// src/app/api/profile/route.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();
    const { email } = await req.json();

    if (!email) {
      return Response.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, user });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
