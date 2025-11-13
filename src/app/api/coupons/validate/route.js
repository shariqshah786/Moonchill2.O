import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { coupon, planName, planPrice } = await req.json();

    if (!coupon || !planName || !planPrice) {
      return NextResponse.json(
        { valid: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    const coupons = {
      NEWUSER: {
        plans: ["Premium Pro", "Premium"],
        discount: 50,
        type: "flat",
      },

      RAVAN50: {
        plans: [
          "Premium",
          "Premium Pro",
          "Moonchill Starter Plan",
          "Moonchill PowerPlay",
        ],
        discount: 50, // 50%
        type: "percent",
      },

      MARKWAY50: { plans: ["Premium"], discount: 50, type: "flat" },

      MC40: { plans: ["Moonchill Starter Plan"], discount: 40, type: "flat" },
    };

    const couponKey = coupon.toUpperCase();
    const couponData = coupons[couponKey];

    if (!couponData) {
      return NextResponse.json({ valid: false, message: "Invalid coupon" });
    }

    if (!couponData.plans.includes(planName)) {
      return NextResponse.json({
        valid: false,
        message: "Coupon not allowed for selected plan",
      });
    }

    // Apply discount
    let finalPrice = planPrice;

    if (couponData.type === "flat") {
      finalPrice = planPrice - couponData.discount;
    }

    if (couponData.type === "percent") {
      finalPrice = planPrice - (planPrice * couponData.discount) / 100;
    }

    if (finalPrice < 1) finalPrice = 1; // Minimum price safeguard

    return NextResponse.json({
      valid: true,
      discount: couponData.discount,
      type: couponData.type,
      finalPrice,
    });
  } catch (err) {
    return NextResponse.json(
      { valid: false, error: err.message },
      { status: 500 }
    );
  }
}
