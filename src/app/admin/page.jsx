"use client";

import React, { useEffect, useState, useMemo } from "react";
import Mainheader from "components/header/Mainheader";
import Footer from "components/Footer";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function AdminModernPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoading] = useState(true);

  // 🔍 Search & Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // 🔐 CHECK ADMIN LOGIN (client-only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("moonchillAdmin");

      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      setAuthChecked(true);
    }
  }, []);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
        setFiltered(data.users);
      }
    } catch (err) {
      console.error("Fetch error:", err);
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

  // 🔎 Apply search + filter
  useEffect(() => {
    let list = [...users];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) =>
          u.name?.toLowerCase().includes(q) ||
          u.phone?.includes(q) ||
          u.subscription?.plan?.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      list = list.filter(
        (u) => (u.subscription?.paymentStatus || "Pending") === statusFilter
      );
    }

    setFiltered(list);
  }, [search, statusFilter, users]);

  // 📊 Analytics — Plan Wise Revenue
  const planAnalytics = useMemo(() => {
    const map = {};
    users.forEach((u) => {
      const sub = u.subscription || {};
      const plan = sub.plan || "Unknown";

      if (!map[plan]) map[plan] = { count: 0, revenue: 0 };

      if (sub.paymentStatus === "success") {
        map[plan].count += 1;
        map[plan].revenue += Number(sub.amount || 0);
      }
    });
    return map;
  }, [users]);

  const barData = {
    labels: Object.keys(planAnalytics),
    datasets: [
      {
        label: "Revenue (₹)",
        data: Object.values(planAnalytics).map((x) => x.revenue),
        backgroundColor: "rgba(59,130,246,0.6)",
      },
    ],
  };

  if (!authChecked)
    return (
      <div className="text-white bg-gray-900 p-10 h-screen">
        Checking admin authentication…
      </div>
    );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Mainheader />

      <main className="max-w-7xl mx-auto p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
            Admin Dashboard — Modern View
          </h1>

          <div className="text-gray-300">
            Total Users:{" "}
            <span className="text-sky-400 font-bold">{users.length}</span>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("moonchillAdmin");
              window.location.href = "/admin/login";
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold mb-6"
          >
            Logout
          </button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <div className="text-sm text-gray-300">Successful Payments</div>
            <div className="text-3xl font-bold text-green-400">
              {
                users.filter((u) => u.subscription?.paymentStatus === "success")
                  .length
              }
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <div className="text-sm text-gray-300">Pending Payments</div>
            <div className="text-3xl font-bold text-yellow-400">
              {
                users.filter(
                  (u) =>
                    (u.subscription?.paymentStatus || "Pending") === "Pending"
                ).length
              }
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <div className="text-sm text-gray-300">Failed Payments</div>
            <div className="text-3xl font-bold text-red-400">
              {
                users.filter((u) => u.subscription?.paymentStatus === "failed")
                  .length
              }
            </div>
          </div>
        </div>

        {/* CHART */}
        <div className="bg-gray-800 p-4 mb-8 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Plan-wise Revenue</h2>
          <Bar data={barData} />
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <input
            className="p-2 rounded bg-gray-800 border border-gray-700"
            placeholder="Search by name, phone, plan"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="p-2 rounded bg-gray-800 border border-gray-700"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Filter: All</option>
            <option value="success">Success</option>
            <option value="Pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto bg-gray-800 p-4 rounded-xl shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Phone</th>
                <th className="px-3 py-2 text-left">Plan</th>
                <th className="px-3 py-2 text-left">Cycle</th>
                <th className="px-3 py-2 text-left">Coupon</th>
                <th className="px-3 py-2 text-left">Amount</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u) => {
                const s = u.subscription || {};
                return (
                  <tr key={u._id} className="border-b border-gray-700">
                    <td className="px-3 py-2">
                      <a
                        href={`/admin/users/${u._id}`}
                        className="text-sky-400 hover:underline"
                      >
                        {u.name || "—"}
                      </a>
                    </td>

                    <td className="px-3 py-2">{u.phone || "—"}</td>
                    <td className="px-3 py-2">{s.plan || "—"}</td>
                    <td className="px-3 py-2">{s.billingCycle || "—"}</td>
                    <td className="px-3 py-2">{s.coupon || "—"}</td>
                    <td className="px-3 py-2 text-green-400">
                      ₹{s.amount || "—"}
                    </td>
                    <td
                      className={`px-3 py-2 font-semibold ${
                        s.paymentStatus === "success"
                          ? "text-green-400"
                          : s.paymentStatus === "failed"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {s.paymentStatus || "Pending"}
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-400">
                      {new Date(s.updatedAt || u.createdAt).toLocaleString(
                        "en-IN"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
}
