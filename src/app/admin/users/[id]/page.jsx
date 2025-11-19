"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Mainheader from "components/header/Mainheader";
import Footer from "components/Footer";

export default function UserDetailsPage() {
  const params = useParams();
  const userId = params.id;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch selected user
  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`);
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      }
    } catch (err) {
      console.error("Error loading user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading)
    return (
      <div className="bg-gray-900 text-white p-10 min-h-screen">
        Loading user details…
      </div>
    );

  if (!user)
    return (
      <div className="bg-gray-900 text-white p-10 min-h-screen">
        User not found.
      </div>
    );

  const s = user.subscription || {};

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Mainheader />

      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
          User Details
        </h1>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-gray-400">Name</p>
              <p className="text-xl font-semibold">{user.name}</p>
            </div>

            <div>
              <p className="text-gray-400">Phone</p>
              <p className="text-xl font-semibold">{user.phone}</p>
            </div>

            <div>
              <p className="text-gray-400">Selected Plan</p>
              <p className="text-lg text-sky-400 font-semibold">
                {s.plan || "—"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Billing Cycle</p>
              <p className="text-lg">{s.billingCycle || "—"}</p>
            </div>

            <div>
              <p className="text-gray-400">Coupon Applied</p>
              <p className="text-lg text-yellow-300">{s.coupon || "—"}</p>
            </div>

            <div>
              <p className="text-gray-400">Amount Paid</p>
              <p className="text-lg text-green-400 font-semibold">
                ₹{s.amount || "—"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Payment Status</p>
              <p
                className={`text-lg font-bold ${
                  s.paymentStatus === "success"
                    ? "text-green-400"
                    : s.paymentStatus === "failed"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {s.paymentStatus || "Pending"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Account Created</p>
              <p>{new Date(user.createdAt).toLocaleString("en-IN")}</p>
            </div>

            <div>
              <p className="text-gray-400">Last Updated</p>
              <p>{new Date(user.updatedAt).toLocaleString("en-IN")}</p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => history.back()}
          className="mt-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
        >
          ← Back
        </button>
      </main>

      <Footer />
    </div>
  );
}
