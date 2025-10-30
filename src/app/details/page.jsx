"use client";
import React from "react";
import Mainheader from "components/header/Mainheader";
import Footer from "components/Footer";

export const metadata = {
  title: "MoonChill Plan Details – Compare OTT Subscriptions",
  description:
    "Compare pricing and benefits of MoonChill OTT subscription plans. Choose the best streaming deal for Netflix, Prime Video, Hotstar, and more.",
  robots: "index, follow",
  alternates: { canonical: "https://moonchill.in/details" },
};

export default function DetailPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Mainheader />

      <main className="flex-grow px-6 md:px-16 py-10 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
          Discover Moonchill
        </h1>

        <p className="text-gray-300 leading-relaxed mb-6 text-center">
          Moonchill is a smart OTT aggregator platform designed to simplify your
          entertainment experience. We bring together all your favorite
          streaming platforms under one unified, seamless subscription.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mt-10">
          <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg hover:shadow-sky-700/20 transition">
            <h2 className="text-xl font-semibold text-sky-400 mb-3">
              Unified Subscription Hub
            </h2>
            <p className="text-gray-300">
              Manage all your OTT subscriptions like Netflix, SonyLIV, Zee5, and
              more — directly from one dashboard without juggling multiple
              logins or payment dates.
            </p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg hover:shadow-sky-700/20 transition">
            <h2 className="text-xl font-semibold text-sky-400 mb-3">
              Affordable Plans
            </h2>
            <p className="text-gray-300">
              Access premium content at unbeatable prices. Moonchill provides
              flexible monthly and yearly plans that suit your entertainment
              needs and budget.
            </p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg hover:shadow-sky-700/20 transition">
            <h2 className="text-xl font-semibold text-sky-400 mb-3">
              Seamless User Experience
            </h2>
            <p className="text-gray-300">
              Enjoy a smooth, intuitive interface built to provide the best
              browsing experience on both mobile and desktop platforms.
            </p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg hover:shadow-sky-700/20 transition">
            <h2 className="text-xl font-semibold text-sky-400 mb-3">
              Secure & Reliable
            </h2>
            <p className="text-gray-300">
              All your transactions and user data are protected by advanced
              security measures and encrypted storage for total peace of mind.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-sky-500 to-indigo-500 p-[1px] rounded-xl">
          <div className="bg-gray-900 p-6 rounded-xl text-center">
            <h3 className="text-xl font-semibold text-sky-400 mb-2">
              Join the Entertainment Revolution
            </h3>
            <p className="text-gray-300">
              Moonchill is redefining how India watches entertainment. Sign up
              today to explore more and take control of your streaming
              experience.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
