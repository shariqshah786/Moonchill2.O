"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.error);
        setLoading(false);
        return;
      }

      // Store admin token
      localStorage.setItem("moonchillAdmin", data.token);

      router.push("/admin");
    } catch (err) {
      alert("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center px-4">
      <form
        className="bg-gray-800 p-8 rounded-xl w-full max-w-md"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl text-white font-bold mb-4 text-center">
          Admin Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          className="w-full p-3 rounded mb-3 bg-gray-700 text-white"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Admin Password"
          className="w-full p-3 rounded mb-4 bg-gray-700 text-white"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>
    </div>
  );
}
