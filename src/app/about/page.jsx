"use client";
import React from "react";
import Mainheader from "components/header/Mainheader";
import Footer from "components/Footer";

export const metadata = {
  title: "About MoonChill – Affordable OTT Subscription Platform",
  description:
    "Learn about MoonChill’s mission to make entertainment affordable for everyone. Discover how we simplify OTT subscriptions across platforms like Netflix, Prime Video, and Disney+ Hotstar.",
  robots: "index, follow",
  alternates: { canonical: "https://moonchill.in/about" },
};

export default function AboutPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Header */}
      <Mainheader />

      {/* Content Section */}
      <main className="flex-grow px-6 md:px-16 py-10 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent mb-8">
          About Moonchill
        </h1>

        <p className="text-gray-300 leading-relaxed mb-4">
          Welcome to{" "}
          <span className="text-sky-400 font-semibold">Moonchill</span>, your
          ultimate destination for affordable and convenient OTT subscriptions.
          We’re transforming the way India enjoys digital entertainment by
          bringing together all major streaming platforms under one roof — at
          prices everyone can afford.
        </p>

        <p className="text-gray-300 leading-relaxed mb-4">
          At Moonchill, our mission is simple — to make premium OTT content
          accessible to everyone. Whether you're into movies, sports, web
          series, or music, we provide the flexibility to subscribe and manage
          all your favorite services from a single dashboard.
        </p>

        <p className="text-gray-300 leading-relaxed mb-4">
          We understand how frustrating it can be to juggle multiple apps,
          logins, and payments. That’s why we’ve built Moonchill as an
          aggregator that simplifies your digital experience — fast, secure, and
          user-friendly. With Moonchill, you can enjoy seamless entertainment
          across all platforms without worrying about expensive renewals or
          hidden costs.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-sky-400">
          Why Choose Moonchill?
        </h2>

        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>✅ Access multiple OTT platforms at discounted rates.</li>
          <li>✅ 100% legal and secure streaming experience.</li>
          <li>✅ Monthly and yearly subscription options.</li>
          <li>✅ Simple dashboard to manage all your plans.</li>
          <li>✅ Excellent customer support — we’re always here to help.</li>
        </ul>

        <p className="text-gray-300 leading-relaxed mt-6">
          We believe entertainment should be fun, effortless, and affordable for
          everyone. With Moonchill, you’re not just subscribing to OTT platforms
          — you’re joining a growing community that values quality,
          transparency, and innovation.
        </p>

        <div className="mt-10 bg-gradient-to-r from-sky-500 to-indigo-500 p-[1px] rounded-xl">
          <div className="bg-gray-900 p-6 rounded-xl text-center">
            <h3 className="text-xl font-semibold text-sky-400 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-300">
              To become India’s most trusted OTT subscription hub — simplifying
              access to premium entertainment and empowering users with
              flexibility, transparency, and unbeatable value.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
