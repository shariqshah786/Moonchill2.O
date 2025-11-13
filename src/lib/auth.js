import jwt from "jsonwebtoken";

export function generateToken(user) {
  // Create a JWT with user ID and role (optional)
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Middleware-style helper
 * Example usage in API routes:
 * const user = authenticateRequest(req);
 * if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
 */
export function authenticateRequest(req) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) return null;
    return verifyToken(token);
  } catch (error) {
    console.error("Auth check failed:", error);
    return null;
  }
}
