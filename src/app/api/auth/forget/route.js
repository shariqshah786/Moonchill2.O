export async function POST(req) {
  const { email } = await req.json();

  if (!email)
    return Response.json(
      { success: false, error: "Email required" },
      { status: 400 }
    );

  // Later: send reset link or OTP here
  return Response.json({ success: true, message: "Reset link sent (mock)" });
}
