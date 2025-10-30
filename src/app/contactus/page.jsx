"use client";
import React, { useState } from "react";
import Mainheader from "components/header/Mainheader";
import Footer from "components/Footer";

export const metadata = {
  title: "Contact MoonChill – Support & Partnership Inquiries",
  description:
    "Need help with your subscription or partnership queries? Contact the MoonChill support team for quick assistance.",
  robots: "index, follow",
  alternates: { canonical: "https://moonchill.in/contact" },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill out all fields.");
      return;
    }

    try {
      // Example — connect with your backend/email service if needed
      console.log("Contact Form Submitted:", formData);
      setStatus("Thank you for contacting us! We'll get back soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Mainheader />

      <main className="flex-grow px-6 md:px-16 py-10 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800/50 p-6 md:p-8 rounded-2xl shadow-lg w-full"
          >
            <h2 className="text-xl font-semibold mb-6 text-sky-400">
              Get in Touch
            </h2>

            <div className="mb-4">
              <label className="block mb-2 text-gray-300">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-sky-500 outline-none"
                placeholder="Your name"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-300">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-sky-500 outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-300">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-sky-500 outline-none min-h-[120px]"
                placeholder="Write your message..."
              />
            </div>

            {status && (
              <p className="text-sm text-gray-400 mb-3 text-center">{status}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center bg-gray-800/30 p-6 md:p-8 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-sky-400">
              Contact Information
            </h2>
            <p className="text-gray-300 mb-4">
              We're always here to help you! Reach out for support, feedback, or
              partnership opportunities.
            </p>

            <ul className="space-y-3 text-gray-300">
              <li>
                <span className="font-semibold text-sky-400">Email:</span>{" "}
                <a href="mailto:support@moonchill.in" className="underline">
                  support@moonchill.in
                </a>
              </li>
              <li>
                <span className="font-semibold text-sky-400">Phone:</span>{" "}
                <a href="tel:+919136653743" className="underline">
                  +91 91366 53743
                </a>
              </li>
              <li>
                <span className="font-semibold text-sky-400">Address:</span>{" "}
                Mumbai, Maharashtra, India
              </li>
            </ul>

            <div className="mt-6">
              <a
                href="https://wa.me/919136653743"
                target="_blank"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
