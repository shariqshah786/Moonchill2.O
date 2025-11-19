"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "components/Footer";
import Mainheader from "components/header/Mainheader";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
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
      alert("Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Mainheader />
      <main className="flex-grow flex justify-center items-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-md w-full"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-sky-400">
            Create Your Account
          </h2>
          <input
            name="name"
            placeholder="Full Name"
            className="w-full mb-3 p-3 rounded bg-gray-700 border border-gray-600"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-3 rounded bg-gray-700 border border-gray-600"
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            className="w-full mb-3 p-3 rounded bg-gray-700 border border-gray-600"
            onChange={handleChange}
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <p className="text-center text-gray-400 text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-sky-400 hover:underline">
              Login
            </a>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
}
