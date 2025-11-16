"use client";
import React, { useEffect, useState } from "react";
import Mainheader from "components/header/Mainheader";
import Footer from "components/Footer";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  // 🔥 STOP SSR — only run in browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const adminToken = localStorage.getItem("moonchillAdmin");

      console.log("Admin Token from browser:", adminToken);

      if (!adminToken) {
        console.warn("No admin token found → redirecting to login");
        window.location.href = "/admin/login";
        return;
      }

      setAuthChecked(true);
    }
  }, []);

  // Fetch users only after auth check
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      console.log("Admin API Response:", data); // 🔥 Debug

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
    if (authChecked) {
      fetchUsers();
      const interval = setInterval(fetchUsers, 10000);
      return () => clearInterval(interval);
    }
  }, [authChecked]);

  if (!authChecked) {
    return (
      <div className="text-white p-10 bg-gray-900 h-screen">
        Checking admin authentication...
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Mainheader />
      <main className="flex-grow px-4 sm:px-8 md:px-16 py-10 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
          Admin Dashboard — User Subscriptions
        </h1>

        {loading ? (
          <p className="text-gray-400 text-center">Loading user data...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-400 text-center">No users found.</p>
        ) : (
          <div className="overflow-x-auto bg-gray-800/60 rounded-lg shadow-lg p-4">
            <table className="min-w-full text-sm border-collapse">
              <thead className="bg-gray-700 text-gray-200">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Plan</th>
                  <th className="px-4 py-2">Billing Cycle</th>
                  <th className="px-4 py-2">Coupon</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Payment Status</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-700 hover:bg-gray-700/50"
                  >
                    <td className="px-4 py-2">{user.name || "—"}</td>
                    <td className="px-4 py-2">{user.phone || "—"}</td>
                    <td className="px-4 py-2">
                      {user.subscription?.plan || "—"}
                    </td>
                    <td className="px-4 py-2">
                      {user.subscription?.billingCycle || "—"}
                    </td>
                    <td className="px-4 py-2">
                      {user.subscription?.coupon || "—"}
                    </td>
                    <td className="px-4 py-2">
                      ₹{user.subscription?.amount || "—"}
                    </td>
                    <td className="px-4 py-2">
                      {user.subscription?.paymentStatus || "Pending"}
                    </td>
                    <td className="px-4 py-2 text-xs text-gray-400">
                      {new Date(user.createdAt).toLocaleString("en-IN")}
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
