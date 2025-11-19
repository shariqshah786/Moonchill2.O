import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const user = await User.findById(id);
    if (!user) {
      return Response.json({ success: false, error: "User not found" });
    }

    return Response.json({ success: true, user });
  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
}
