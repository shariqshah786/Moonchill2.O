"use client";
import { useState } from "react";

export default function SubscribeForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState("basic");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/user/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, plan }),
    });

    const data = await res.json();
    if (data.success) {
      setMessage("✅ User saved! Proceed to payment...");
    } else {
      setMessage("❌ Error: " + data.error);
    }
  };

  return (
    <div className="p-6 border rounded-lg max-w-md mx-auto shadow-md">
      <h2 className="text-xl font-semibold mb-4">Subscribe to a Plan</h2>

      <input
        type="text"
        placeholder="Enter Name"
        className="w-full border p-2 mb-3 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Phone"
        className="w-full border p-2 mb-3 rounded"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <select
        className="w-full border p-2 mb-3 rounded"
        value={plan}
        onChange={(e) => setPlan(e.target.value)}
      >
        <option value="basic">Basic</option>
        <option value="pro">Pro</option>
      </select>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Save & Proceed
      </button>

      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  );
}
