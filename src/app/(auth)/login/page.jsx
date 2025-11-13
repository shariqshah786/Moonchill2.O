"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "components/Footer";
import Mainheader from "components/header/Mainheader";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.error);
      } else {
        localStorage.setItem("moonchillUser", JSON.stringify(data.user));
        router.push("/profile");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Mainheader />
      <main className="flex-grow flex justify-center items-center px-4">
        <form
          onSubmit={handleLogin}
          className="bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-md w-full"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-sky-400">
            Welcome Back
          </h2>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-3 rounded bg-gray-700 border border-gray-600"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-3 rounded bg-gray-700 border border-gray-600"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-center text-gray-400 text-sm mt-4">
            Forgot your password?{" "}
            <a href="/forgot" className="text-sky-400 hover:underline">
              Reset here
            </a>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
}
