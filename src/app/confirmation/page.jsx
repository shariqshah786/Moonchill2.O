"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("razorpay_payment_id");
  const orderId = searchParams.get("razorpay_order_id");
  const signature = searchParams.get("razorpay_signature");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">🎉 Thank You!</h1>
        <p className="mb-2">Your payment was successful.</p>
        <p className="text-gray-600">Payment ID: {paymentId}</p>
        <p className="text-gray-600">Order ID: {orderId}</p>
        <p className="text-gray-600">Signature: {signature}</p>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading payment details...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
