// src/app/api/users/route.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();

    const { name, phone, plan, billingCycle, coupon, amount } =
      await req.json();

    if (!name || !phone) {
      return Response.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const user = await User.findOneAndUpdate(
      { phone },
      {
        name,
        phone,
        subscription: {
          plan,
          billingCycle,
          coupon: coupon || null,
          amount,
          paymentStatus: "pending",
        },
      },
      { upsert: true, new: true }
    );

    return Response.json({ success: true, user });
  } catch (error) {
    console.error("❌ API Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
