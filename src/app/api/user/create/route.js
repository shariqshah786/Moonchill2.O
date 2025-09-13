import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  await dbConnect();
  const { name, phone, plan } = await req.json();

  try {
    // Upsert (if user exists, update; else create new)
    const user = await User.findOneAndUpdate(
      { phone },
      { name, phone, subscription: { plan, status: "pending" } },
      { upsert: true, new: true }
    );

    return Response.json({ success: true, user });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
