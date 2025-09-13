// src/app/thank-you/page.jsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    // Optional: redirect back to home after 5 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">🎉 Thank You!</h1>
      <p className="text-lg mb-6">
        Your subscription is successful. Enjoy streaming with Moonchill!
      </p>
      <p className="mb-6">Your subscription will be activate in few minutes </p>
      <button
        onClick={() => router.push("/")}
        className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700"
      >
        Go to Home
      </button>
    </div>
  );
}
