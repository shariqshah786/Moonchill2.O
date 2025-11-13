"use client";
import { useState } from "react";
import Footer from "components/Footer";
import Mainheader from "components/header/Mainheader";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.success) setSent(true);
    else alert(data.error);
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
            Forgot Password
          </h2>
          {sent ? (
            <p className="text-center text-green-400">
              Reset link sent to your email!
            </p>
          ) : (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mb-3 p-3 rounded bg-gray-700 border border-gray-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
              >
                Send Reset Link
              </button>
            </>
          )}
        </form>
      </main>
      <Footer />
    </div>
  );
}
