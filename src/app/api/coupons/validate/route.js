export async function POST(req) {
  try {
    const { coupon, planPrice } = await req.json();

    // fallback if frontend didn't send price
    const price = planPrice ?? 100; // change 100 to your actual plan price

    let response = { valid: false, finalPrice: price, discount: 0 };

    if (coupon?.toUpperCase() === "NEWUSER") {
      const discount = (price * 40) / 100;
      response = {
        valid: true,
        finalPrice: price - discount,
        discount: 40,
        type: "percent",
      };
    } else if (coupon?.toUpperCase() === "TESTUSER") {
      response = {
        valid: true,
        finalPrice: 1,
        discount: price - 1,
        type: "fixed",
      };
    } else if (coupon?.toUpperCase() === "RAVAN40") {
      const discount = (price * 40) / 100;
      response = {
        valid: true,
        finalPrice: price - discount,
        discount: 40,
        type: "percent",
      };
    } else if (coupon?.toUpperCase() === "MARKWAY40") {
      const discount = (price * 40) / 100;
      response = {
        valid: true,
        finalPrice: price - discount,
        discount: 40,
        type: "percent",
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
