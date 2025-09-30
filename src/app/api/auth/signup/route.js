import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const client = await clientPromise;
    const db = client.db("moonchill");

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser)
      return new Response(JSON.stringify({ error: "User exists" }), {
        status: 400,
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    await db
      .collection("users")
      .insertOne({ name, email, password: hashedPassword });

    return new Response(JSON.stringify({ message: "Signup successful" }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
