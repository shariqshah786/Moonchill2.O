"use client";
import { useEffect } from "react";

export default function PaymentPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    // Create order on backend
    const orderRes = await fetch("/api/razorpay", {
      method: "POST",
    });
    const orderData = await orderRes.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // add this in .env.local
      amount: orderData.amount,
      currency: orderData.currency,
      name: "MoonChill",
      description: "Plan Subscription",
      order_id: orderData.id,
      handler: function (response) {
        alert("Payment successful 🎉: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Subscribe Plan</h1>
      <button
        onClick={handlePayment}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Pay with Razorpay
      </button>
    </div>
  );
}
