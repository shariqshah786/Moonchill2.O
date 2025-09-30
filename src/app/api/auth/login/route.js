import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const client = await clientPromise;
    const db = client.db("moonchill");

    const user = await db.collection("users").findOne({ email });
    if (!user)
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 400,
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 400,
      });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return new Response(
      JSON.stringify({ token, name: user.name, email: user.email }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
