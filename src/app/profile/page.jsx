"use client";
import { useEffect, useState } from "react";
import Mainheader from "components/header/Mainheader";
import Footer from "components/Footer";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const storedUser = localStorage.getItem("moonchillUser");
      if (!storedUser) {
        setLoading(false);
        return;
      }

      const { email } = JSON.parse(storedUser);
      if (!email) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        } else {
          console.error("Error fetching profile:", data.error);
        }
      } catch (err) {
        console.error("Profile fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
        <p className="text-gray-400">Loading profile...</p>
      </div>
    );

  if (!user)
    return (
      <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center flex-col">
        <p className="text-gray-400 mb-4">No profile found. Please log in.</p>
        <a
          href="/login"
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
        >
          Go to Login
        </a>
      </div>
    );

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Mainheader />
      <main className="flex-grow flex justify-center items-center px-4 py-10">
        <div className="bg-gray-800/70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
            My Profile
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-400">Name:</span>
              <span>{user.name}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-400">Email:</span>
              <span>{user.email}</span>
            </div>
            {user.phone && (
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Phone:</span>
                <span>{user.phone}</span>
              </div>
            )}

            <h3 className="text-xl mt-6 mb-2 font-semibold text-sky-400">
              Subscription Details
            </h3>

            {user.subscription?.plan ? (
              <>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Plan:</span>
                  <span>{user.subscription.plan}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Amount:</span>
                  <span>₹{user.subscription.amount}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Coupon:</span>
                  <span>{user.subscription.coupon || "—"}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Status:</span>
                  <span
                    className={`font-semibold ${
                      user.subscription.status === "success"
                        ? "text-green-400"
                        : user.subscription.status === "failed"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {user.subscription.status}
                  </span>
                </div>
              </>
            ) : (
              <p className="text-gray-400 text-center">
                No active subscription found.
              </p>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  localStorage.removeItem("moonchillUser");
                  window.location.href = "/login";
                }}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
