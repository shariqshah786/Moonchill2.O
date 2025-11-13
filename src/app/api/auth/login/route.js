import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user)
      return Response.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return Response.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );

    return Response.json({ success: true, user });
  } catch (error) {
    console.error("Login Error:", error);
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
