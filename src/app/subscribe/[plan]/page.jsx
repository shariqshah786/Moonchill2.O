"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const plans = [
  { name: "Moonchill PowerPlay", monthPrice: 199, yearlyPrice: 1990 },
  { name: "Premium", monthPrice: 399, yearlyPrice: 3990 },
  { name: "Premium Pro", monthPrice: 599, yearlyPrice: 5990 },
];

export default function PlanPage() {
  const params = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [coupon, setCoupon] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  const plan = plans.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === params.plan
  );
  if (!plan) return <div>❌ Plan not found</div>;

  // 1️⃣ Function to validate coupon
  const applyCoupon = async () => {
    if (!coupon) return alert("Enter a coupon code");

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coupon, plan: plan.name }),
      });
      const data = await res.json();

      if (!data.valid) return alert("Invalid coupon");

      const price =
        billingCycle === "monthly" ? plan.monthPrice : plan.yearlyPrice;

      setDiscountedAmount(price - (price * data.discount) / 100);
      alert(`Coupon applied! You get ${data.discount}% off.`);
    } catch (err) {
      console.error("Coupon error:", err);
      alert("Something went wrong");
    }
  };

  const handleSubscribe = async () => {
    if (!name || !phone) return alert("Enter name & phone number");

    setLoading(true);

    try {
      const price =
        billingCycle === "monthly" ? plan.monthPrice : plan.yearlyPrice;

      const finalAmount = discountedAmount ?? price;

      // 2️⃣ Store user in MongoDB
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          plan: plan.name,
          billingCycle,
          coupon: coupon || null,
          amount: finalAmount,
        }),
      });

      // 3️⃣ Create Razorpay order
      const orderRes = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount * 100 }), // in paise
      });

      const orderData = await orderRes.json();
      if (orderData.error) {
        alert("Failed to create payment order: " + orderData.error);
        setLoading(false);
        return;
      }

      // 4️⃣ Load Razorpay SDK
      const res = await loadRazorpay();
      if (!res) return alert("Razorpay SDK failed to load");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Moonchill",
        description: `${plan.name} Subscription`,
        order_id: orderData.id,
        handler: async function (response) {
          // 1️⃣ Update DB with success
          await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone,
              plan: plan.name,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
            }),
          });

          // 2️⃣ Redirect to thank-you page
          router.push("/thankyou");
        },
        prefill: { name, contact: phone },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Subscribe error:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) return resolve(true);
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  return (
    <>
      <div className="bg-gray-800 min-h-screen flex items-center justify-center p-4">
        <div className="p-6 max-w-lg  bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-2">{plan.name}</h1>
          <p className="text-gray-600 mb-4">
            {billingCycle === "monthly"
              ? `₹${plan.monthPrice} / month`
              : `₹${plan.yearlyPrice} / year`}
          </p>

          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            className="w-full border p-2 rounded mb-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="text"
            placeholder="Coupon code"
            className="w-full border p-2 rounded mb-3"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button
            onClick={applyCoupon}
            className="mb-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Apply Coupon
          </button>

          <select
            className="w-full border p-2 rounded mb-3"
            value={billingCycle}
            onChange={(e) => setBillingCycle(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          <p className="mb-3 font-medium">
            Total: ₹
            {discountedAmount ??
              (billingCycle === "monthly" ? plan.monthPrice : plan.yearlyPrice)}
          </p>

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Processing..." : "Subscribe"}
          </button>
        </div>
      </div>
    </>
  );
}
