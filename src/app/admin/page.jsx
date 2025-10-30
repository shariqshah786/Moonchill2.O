"use client";
import React, { useEffect, useState } from "react";
import Mainheader from "components/header/Mainheader";
import Footer from "components/Footer";
export const metadata = {
  title: "MoonChill Admin Dashboard",
  description:
    "MoonChill Admin Dashboard for internal management of users, plans, and payments.",
  robots: "noindex, nofollow", // ❌ Prevents Google from indexing this page
};

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from your MongoDB via API route
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        console.error("Failed to fetch users:", data.error);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Mainheader />

      <main className="flex-grow px-6 md:px-16 py-10 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
          Admin Dashboard — User Subscriptions
        </h1>

        {loading ? (
          <p className="text-gray-400 text-center">Loading user data...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-400 text-center">No users found.</p>
        ) : (
          <div className="overflow-x-auto bg-gray-800/60 rounded-lg shadow-lg p-4">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Plan</th>
                  <th className="px-4 py-2 text-left">Cycle</th>
                  <th className="px-4 py-2 text-left">Coupon</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition"
                  >
                    <td className="px-4 py-2">{user.name || "—"}</td>
                    <td className="px-4 py-2">{user.phone}</td>
                    <td className="px-4 py-2">{user.plan || "—"}</td>
                    <td className="px-4 py-2">{user.billingCycle || "—"}</td>
                    <td className="px-4 py-2">
                      {user.coupon ? user.coupon : "—"}
                    </td>
                    <td className="px-4 py-2 text-sky-400 font-semibold">
                      ₹{user.amount}
                    </td>
                    <td
                      className={`px-4 py-2 ${
                        user.subscription?.status === "active"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {user.subscription?.status || "pending"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
