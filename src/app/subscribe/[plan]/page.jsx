"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Footer from "components/Footer";
import Mainheader from "components/header/Mainheader";

const plans = [
  { name: "Moonchill Starter Plan", monthPrice: 99, yearlyPrice: 599 },
  { name: "Moonchill PowerPlay", monthPrice: 199, yearlyPrice: 1299 },
  { name: "Amazon Prime", monthPrice: 99, yearlyPrice: 799 },
  { name: "Jio Hotstar", monthPrice: 49, yearlyPrice: 499 },
  { name: "Sony LIV", monthPrice: 69, yearlyPrice: 499 },
  { name: "ZEE5", monthPrice: 69, yearlyPrice: 499 },
  { name: "Youtube", monthPrice: 89, yearlyPrice: 599 },
  { name: "Sun next", monthPrice: 99, yearlyPrice: 799 },
  { name: "Premium", monthPrice: 299, yearlyPrice: 1999 },
  { name: "Premium Pro", monthPrice: 399, yearlyPrice: 2999 },
];

export default function PlanPage() {
  const params = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountedAmount, setDiscountedAmount] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [loading, setLoading] = useState(false);

  const plan = plans.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === params.plan
  );
  if (!plan) return <div>❌ Plan not found</div>;

  // ✅ Apply Coupon
  const applyCoupon = async () => {
    if (!coupon) return alert("Enter a coupon code");
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coupon,
          planName: plan.name,
          planPrice:
            billingCycle === "monthly" ? plan.monthPrice : plan.yearlyPrice,
        }),
      });
      const data = await res.json();

      if (!data.valid) return alert("Invalid coupon");

      setDiscountedAmount(data.finalPrice);
      setCouponApplied(true);
      alert(
        data.type === "flat"
          ? `Coupon applied! You saved ₹${data.discount}.`
          : `Coupon applied! You get ${data.discount}% off.`
      );
    } catch (err) {
      console.error("Coupon Error:", err);
      alert("Something went wrong applying coupon");
    }
  };

  // ✅ Remove Coupon
  const removeCoupon = () => {
    setCoupon("");
    setCouponApplied(false);
    setDiscountedAmount(null);
  };

  // ✅ Handle Payment
  const handleSubscribe = async () => {
    if (!name || !phone) return alert("Enter name & phone number");

    setLoading(true);
    try {
      const price =
        billingCycle === "monthly" ? plan.monthPrice : plan.yearlyPrice;
      const finalAmount = discountedAmount ?? price;

      // 🟢 Store user
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          plan: plan.name,
          coupon: coupon || null,
          amount: finalAmount,
          billingCycle,
          paymentStatus: "pending",
        }),
      });

      // 🟢 Create Razorpay order
      const orderRes = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount * 100 }),
      });

      const orderData = await orderRes.json();
      if (orderData.error) {
        alert("Payment order creation failed: " + orderData.error);
        setLoading(false);
        return;
      }

      const sdkLoaded = await loadRazorpay();
      if (!sdkLoaded) return alert("Razorpay SDK failed to load");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Moonchill",
        description: `${plan.name} Subscription`,
        order_id: orderData.id,
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                phone,
                plan: plan.name,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                coupon,
                amount: finalAmount,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) router.push("/thankyou");
            else alert("Payment verification failed: " + verifyData.error);
          } catch (err) {
            console.error("Verify Error:", err);
            alert("Something went wrong verifying payment.");
          }
        },
        prefill: { name, contact: phone },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Subscribe Error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load Razorpay
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
      <div className="bg-gray-900">
        <Mainheader />
        <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center px-4 py-10 text-white">
          <div className="max-w-lg w-full bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700">
            <h1 className="text-2xl font-bold mb-3 text-center text-sky-400">
              {plan.name}
            </h1>

            <p className="text-center text-gray-300 mb-5">
              {billingCycle === "monthly"
                ? `₹${plan.monthPrice} / month`
                : `₹${plan.yearlyPrice} / year`}
            </p>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mb-3 p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-sky-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter phone number"
              className="w-full mb-3 p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-sky-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Coupon code"
                className="flex-1 p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-500"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                disabled={couponApplied}
              />
              {!couponApplied ? (
                <button
                  onClick={applyCoupon}
                  className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Apply
                </button>
              ) : (
                <button
                  onClick={removeCoupon}
                  className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Remove
                </button>
              )}
            </div>

            {couponApplied && (
              <p className="text-green-400 text-sm mb-3">
                ✅ Coupon applied successfully!
              </p>
            )}

            <select
              value={billingCycle}
              onChange={(e) => setBillingCycle(e.target.value)}
              className="w-full mb-3 p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-sky-500"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>

            <div className="flex justify-between items-center mb-5">
              <span className="text-lg font-semibold text-gray-300">
                Total:
              </span>
              <span className="text-xl font-bold text-green-400">
                ₹
                {discountedAmount ??
                  (billingCycle === "monthly"
                    ? plan.monthPrice
                    : plan.yearlyPrice)}
              </span>
            </div>

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-semibold transition-all"
            >
              {loading ? "Processing..." : "Proceed to Pay"}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
