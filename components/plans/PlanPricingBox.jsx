"use client";
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
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const price =
    priceType === "month"
      ? typeof monthPrice === "number"
        ? monthPrice
        : 0
      : typeof yearlyPrice === "number"
      ? yearlyPrice
      : 0;

  const mrp =
    priceType === "month"
      ? typeof mrpmonth === "number"
        ? mrpmonth
        : 0
      : typeof mrpYearly === "number"
      ? mrpYearly
      : 0;

  const marketPrice =
    priceType === "month"
      ? typeof marketmonth === "number"
        ? marketmonth
        : 0
      : typeof marketYearly === "number"
      ? marketYearly
      : 0;

  const discountedPrice = discount ? price * (1 - discount / 100) : price;

  const savings = priceType === "month" ? 900 : 2000;

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
          ₹{Number.isFinite(discountedPrice) ? discountedPrice.toFixed(0) : "0"}{" "}
          {priceType === "month" ? "/Monthly" : "/Yearly"}
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
      <div className=" text-white text-center font-bold  ">
        Apply coupon before the payment{" "}
      </div>
    </div>
  );
};

export default PlanPricingBox;
