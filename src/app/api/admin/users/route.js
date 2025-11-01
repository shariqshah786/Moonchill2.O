// src/app/api/admin/users/route.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find().sort({ createdAt: -1 });
    return Response.json({ success: true, users });
  } catch (error) {
    console.error("❌ Admin Fetch Error:", error);
    return Response.json({ success: false, error: error.message });
  }
}
