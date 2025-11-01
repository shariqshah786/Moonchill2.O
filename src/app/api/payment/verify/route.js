// src/app/api/payment/verify/route.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();
    const {
      phone,
      plan,
      razorpay_payment_id,
      razorpay_order_id,
      paymentStatus = "success",
    } = await req.json();

    if (!phone || !razorpay_payment_id) {
      return Response.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const user = await User.findOneAndUpdate(
      { phone },
      {
        $set: {
          "subscription.plan": plan,
          "subscription.paymentStatus": paymentStatus,
          "subscription.razorpay_payment_id": razorpay_payment_id,
          "subscription.razorpay_order_id": razorpay_order_id,
        },
      },
      { new: true }
    );

    if (!user)
      return Response.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );

    return Response.json({ success: true, user });
  } catch (err) {
    console.error("❌ Verify API error:", err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
