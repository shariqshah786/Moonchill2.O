"use client";
import React from "react";
import Mainheader from "components/header/Mainheader";
import Footer from "components/Footer";

export default function TermsPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Mainheader />

      <main className="flex-grow px-6 md:px-16 py-10 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
          Terms & Conditions
        </h1>

        <p className="text-gray-300 leading-relaxed mb-6">
          Welcome to{" "}
          <span className="text-sky-400 font-semibold">Moonchill</span>. By
          accessing or using our services, you agree to comply with and be bound
          by the following terms and conditions. Please read them carefully
          before using our platform.
        </p>

        <h2 className="text-2xl font-bold text-sky-400 mt-8 mb-3">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-300 mb-4">
          By creating an account or subscribing to any plan, you acknowledge
          that you have read, understood, and agree to be bound by these terms.
          If you do not agree, you may not use the services.
        </p>

        <h2 className="text-2xl font-bold text-sky-400 mt-8 mb-3">
          2. Subscription and Payments
        </h2>
        <p className="text-gray-300 mb-4">
          All payments made through Moonchill are non-refundable once the
          subscription is activated. You are responsible for ensuring your
          payment details are accurate. Prices may change, but you will be
          notified prior to renewal.
        </p>

        <h2 className="text-2xl font-bold text-sky-400 mt-8 mb-3">
          3. Account Responsibilities
        </h2>
        <p className="text-gray-300 mb-4">
          You are responsible for maintaining the confidentiality of your
          account credentials. Any misuse or unauthorized activity from your
          account will be your responsibility.
        </p>

        <h2 className="text-2xl font-bold text-sky-400 mt-8 mb-3">
          4. Service Usage
        </h2>
        <p className="text-gray-300 mb-4">
          Moonchill acts as an OTT subscription management service. We do not
          host or stream content ourselves. All content belongs to their
          respective OTT platforms and is governed by their usage policies.
        </p>

        <h2 className="text-2xl font-bold text-sky-400 mt-8 mb-3">
          5. Termination
        </h2>
        <p className="text-gray-300 mb-4">
          Moonchill reserves the right to suspend or terminate any account that
          violates these terms or attempts to misuse our services.
        </p>

        <h2 className="text-2xl font-bold text-sky-400 mt-8 mb-3">
          6. Contact Us
        </h2>
        <p className="text-gray-300 mb-4">
          For any questions or concerns about these terms, please reach out to
          our support team at{" "}
          <a
            href="mailto:support@moonchill.in"
            className="text-sky-400 underline"
          >
            support@moonchill.in
          </a>
          .
        </p>

        <div className="mt-10 text-gray-400 text-sm text-center">
          © {new Date().getFullYear()} Moonchill. All rights reserved.
        </div>
      </main>

      <Footer />
    </div>
  );
}
