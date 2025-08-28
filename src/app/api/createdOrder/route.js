import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY, // Use the public key here
  key_secret: process.env.RAZORPAY_API_SECRET, // Use the secret key here
});

export async function POST(request) {
  const { amount } = await request.json();

  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "receipt_order_74394",
  };

  try {
    const order = await razorpay.orders.create(options);
    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
