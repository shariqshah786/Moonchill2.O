import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, phone, password } = await req.json();

    if (!name || !email || !password)
      return Response.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return Response.json(
        { success: false, error: "Email already registered" },
        { status: 409 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    return Response.json({ success: true, user });
  } catch (error) {
    console.error("Signup Error:", error);
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
