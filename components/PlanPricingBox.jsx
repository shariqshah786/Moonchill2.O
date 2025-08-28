import React, { useState } from "react";

const PlanPricingBox = ({
  priceType,
  monthPrice,
  yearlyPrice,
  mrpmonth,
  mrpYearly,
  marketmonth,
  marketYearly,
  features = [],
}) => {
  const [couponInputVisible, setCouponInputVisible] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  // For month, override prices with 0
  const price =
    priceType === "month"
      ? 0
      : typeof yearlyPrice === "number"
      ? yearlyPrice
      : 0;
  const mrp =
    priceType === "month" ? 0 : typeof mrpYearly === "number" ? mrpYearly : 0;
  const marketPrice =
    priceType === "month"
      ? 0
      : typeof marketYearly === "number"
      ? marketYearly
      : 0;

  // Calculate discounted price accordingly
  const discountedPrice = discount ? price * (1 - discount / 100) : price;

  // Coupon savings to show only for yearly plans if needed
  const savings = priceType === "month" ? 0 : 2000;

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "NEWUSER") {
      setDiscount(40);
      setCouponError("");
      setIsCouponApplied(true);
      setCouponInputVisible(false);
    } else {
      setCouponError("Invalid coupon code");
      setDiscount(0);
      setIsCouponApplied(false);
    }
  };

  const resetCoupon = () => {
    setDiscount(0);
    setCouponCode("");
    setCouponError("");
    setCouponInputVisible(false);
    setIsCouponApplied(false);
  };

  return (
    <div className="relative bg-[#161848] rounded-xl p-4 sm:p-6 shadow-md mb-6 w-full max-w-xs sm:max-w-sm mx-auto flex flex-col">
      {!isCouponApplied && savings > 0 && (
        <div className="absolute top-0 left-0 bg-gradient-to-r from-[#8760ff] to-[#48d2ff] px-3 py-1 sm:px-4 sm:py-2 rounded-br-xl text-white font-bold text-sm sm:text-base z-20">
          Save ₹{savings}
        </div>
      )}
      {isCouponApplied && (
        <div className="absolute top-0 left-0 bg-gradient-to-r from-green-400 to-blue-400 px-3 py-1 sm:px-4 sm:py-2 rounded-br-xl text-white font-bold text-sm sm:text-base z-20">
          Coupon applied: 40% off!
        </div>
      )}

      <div className="flex items-baseline space-x-2 mt-8">
        <span className="font-semibold text-base sm:text-lg text-gray-300">
          M.R.P
        </span>
        <span className="font-bold text-lg sm:text-2xl text-red-500 line-through">
          ₹{mrp}
        </span>
        <span className="font-bold text-2xl sm:text-3xl text-white ml-2">
          ₹{Number.isFinite(discountedPrice) ? discountedPrice.toFixed(0) : "0"}
        </span>
      </div>

      <div className="text-gray-400 text-xs sm:text-sm mt-2 mb-4">
        Market Price <span className="font-medium">₹{marketPrice}</span> per{" "}
        {priceType}
      </div>

      <ul className="list-disc list-inside text-gray-400 mb-4 text-xs sm:text-base">
        {features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>

      {couponInputVisible ? (
        <div className="flex flex-col sm:flex-row w-full gap-2">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            className="w-full bg-transparent border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            onClick={applyCoupon}
            className="w-full sm:w-auto bg-gradient-to-r from-[#8760ff] to-[#48d2ff] px-4 py-2 rounded text-white font-semibold"
          >
            APPLY
          </button>
          <button
            onClick={resetCoupon}
            className="w-full sm:w-auto text-white font-bold text-lg px-2"
            aria-label="Close coupon input"
          >
            ×
          </button>
        </div>
      ) : !isCouponApplied ? (
        <button
          onClick={() => setCouponInputVisible(true)}
          className="mt-2 w-full sm:w-auto bg-transparent border border-[#5427f0] px-4 py-2 rounded text-white font-semibold hover:bg-[#350491] transition-colors"
        >
          Apply coupon
        </button>
      ) : (
        <button
          type="reset"
          onClick={resetCoupon}
          className="mt-2 w-full sm:w-auto px-4 py-2 rounded bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold"
        >
          Remove Coupon
        </button>
      )}

      {couponError && <p className="text-red-500 mt-2">{couponError}</p>}
    </div>
  );
};

export default PlanPricingBox;
