"use client";

import { useSearchParams } from "next/navigation";

export default function Confirmation() {
  const params = useSearchParams();
  const plan = params.get("plan");

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-green-600">
        🎉 Payment Successful!
      </h1>
      <p className="mt-4 text-lg">
        Your subscription for <b>{plan}</b> is now active.
      </p>
    </div>
  );
}
