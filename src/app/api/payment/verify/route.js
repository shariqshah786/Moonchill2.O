import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  try {
    const { phone, plan, razorpay_payment_id, razorpay_order_id } =
      await req.json();

    if (!phone || !razorpay_payment_id) {
      return Response.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findOneAndUpdate(
      { phone },
      {
        $set: {
          "subscription.plan": plan,
          "subscription.status": "active",
          "subscription.paymentId": razorpay_payment_id,
          "subscription.orderId": razorpay_order_id,
        },
      },
      { new: true }
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
