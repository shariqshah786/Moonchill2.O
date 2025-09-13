// src/app/api/coupons/validate/route.js
export async function POST(req) {
  try {
    const { coupon } = await req.json();

    // Example: only 'NEWUSER' is valid
    if (coupon?.toUpperCase() === "NEWUSER") {
      return new Response(JSON.stringify({ valid: true, discount: 40 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ valid: false, discount: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ valid: false, discount: 0, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
