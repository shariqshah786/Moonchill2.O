"use client";
import { useState } from "react";

export default function PaymentButton() {
  const [loading, setLoading] = useState(false);

  const makePayment = async () => {
    setLoading(true);

    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load");
      setLoading(false);
      return;
    }

    try {
      // Call API to create Razorpay order
      const data = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 500, currency: "INR" }),
      })
        .then(async (res) => {
          const json = await res.json().catch(() => null); // fallback if invalid JSON
          if (!res.ok) {
            const message = json?.error || "Server Error";
            throw new Error(message);
          }
          return json;
        })
        .catch((err) => {
          console.error("API fetch error:", err);
          alert("Payment initialization failed: " + err.message);
          return null;
        });

      if (!data) return;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        name: "Moonchill Pvt Ltd",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Thank you for your payment",
        image: "https://manuarora.in/logo.png",
        handler: function (response) {
          alert("Payment Successful!");
          console.log("Payment Response:", response);
        },
        prefill: {
          name: "Shariq Shah",
          email: "shariqshah1235@gmail.com",
          contact: "9870465653",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while starting payment");
    } finally {
      setLoading(false);
    }
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100">
      <h1 className="text-3xl font-bold mb-8">Complete Your Payment</h1>

      <button
        onClick={makePayment}
        disabled={loading}
        className="bg-gradient-to-r from-[#2E3137] to-[#1D2328] rounded-md py-4 px-8 shadow-xl text-gray-300 font-bold hover:scale-105 transition-transform"
      >
        {loading ? "Processing..." : "Pay ₹500"}
      </button>
    </div>
  );
}
