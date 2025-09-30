export async function POST(req) {
  try {
    const { coupon, planName, planPrice } = await req.json();

    // fallback price
    const price = planPrice ?? 100;

    // Coupon configuration: each coupon maps to plans + flat discount amount
    const coupons = {
      NEWUSER: { plans: ["Premium Pro"], discount: 100 }, // flat ₹100 off
      RAVAN40: { plans: ["Premium"], discount: 199 }, // flat ₹199 off
      MARKWAY40: { plans: ["Moonchill PowerPlay"], discount: 99 }, // flat ₹99 off
      TESTUSER: { plans: ["Moonchill Asia cup limited plan"], discount: 50 }, // flat ₹50 off
    };

    let response = {
      valid: false,
      finalPrice: price,
      discount: 0,
      type: "flat",
    };

    const couponKey = coupon?.toUpperCase();
    const couponConfig = coupons[couponKey];

    if (couponConfig && couponConfig.plans.includes(planName)) {
      const discount = couponConfig.discount;
      const finalPrice = Math.max(price - discount, 1); // never below ₹1

      response = {
        valid: true,
        finalPrice,
        discount,
        type: "flat",
      };
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        valid: false,
        finalPrice: 0,
        discount: 0,
        error: err.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
