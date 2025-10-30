import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({}).sort({ createdAt: -1 }); // newest first
    return Response.json({ success: true, users });
  } catch (err) {
    console.error("Error fetching users:", err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
