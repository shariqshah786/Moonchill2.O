import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();

    // Fetch all users sorted by LAST UPDATE
    const users = await User.find().sort({ updatedAt: -1 });

    return Response.json({ success: true, users });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
