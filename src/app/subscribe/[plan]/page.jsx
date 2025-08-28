"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../firebase"; // adjust path as needed

export default function SubscribePage() {
  const params = useParams();
  const plan = params.plan;

  const [step, setStep] = useState("phone"); // 'phone' or 'otp'
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  const recaptchaVerifier = useRef(null);

  // useEffect(() => {
  //   if (!recaptchaVerifier.current) {
  //     recaptchaVerifier.current = new RecaptchaVerifier(
  //       "recaptcha-container",
  //       { size: "invisible" },
  //       auth
  //     );
  //     recaptchaVerifier.current
  //       .render()
  //       .then(() => setRecaptchaReady(true))
  //       .catch((err) => {
  //         console.error("reCAPTCHA render failed", err);
  //         setError("Failed to load reCAPTCHA, please refresh");
  //       });
  //   }
  // }, []);

  const handleContinue = async () => {
    setError("");
    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    if (!recaptchaReady || !recaptchaVerifier.current) {
      setError("Recaptcha not loaded. Please wait a moment and try again.");
      return;
    }
    try {
      const formattedPhone = "+91" + phone; // Adjust country code
      const result = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        recaptchaVerifier.current
      );
      setConfirmationResult(result);
      setStep("otp");
    } catch (error) {
      setError(error.message || "Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    if (!otp || otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    try {
      await confirmationResult.confirm(otp);
      alert("OTP verified! Subscription started.");
      // Redirect or further steps here
    } catch {
      setError("OTP verification failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#161848] to-[#1b204e]">
      <div className="bg-[#110e2e] rounded-xl p-8 w-full max-w-md shadow-2xl text-center border border-[#382eb1]">
        <div className="rounded-t-xl bg-gradient-to-r from-[#8760ff] to-[#48d2ff] py-4 mb-6 text-white text-xl font-bold">
          Subscribe {plan ? plan.replace(/-/g, " ") : "Power"} (30D)
        </div>

        {step === "phone" && (
          <>
            <p className="text-white text-lg font-medium mb-4">
              Help us with a few details to start your entertainment journey.
            </p>
            <p className="text-gray-400 mb-6">
              Your number will act as the primary method for login.
            </p>
            <input
              type="text"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="9999999999"
              className="w-full px-4 py-2 rounded bg-transparent text-white border border-[#382eb1] mb-6 focus:outline-none focus:border-[#8760ff] placeholder:text-gray-400 text-lg"
              maxLength={10}
            />
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <button
              onClick={handleContinue}
              className="w-full py-3 rounded bg-gradient-to-r from-[#8760ff] to-[#48d2ff] text-white font-semibold text-lg tracking-wide hover:opacity-90 transition"
            >
              CONTINUE
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <p className="text-white text-lg font-medium mb-4">Verify OTP</p>
            <p className="text-gray-400 mb-6 text-left">
              Mobile Number
              <br />
              <span className="line-through block bg-[#19194b] border border-[#382eb1] rounded text-gray-400 px-2 py-1 text-lg mt-1">
                {phone}
              </span>
              <button
                onClick={() => {
                  setStep("phone");
                  setOtp("");
                  setError("");
                }}
                className="text-indigo-500 underline text-sm mt-1"
              >
                Change Mobile Number
              </button>
            </p>
            <input
              type="text"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              maxLength={6}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 rounded bg-transparent text-white border border-[#382eb1] mb-6 focus:outline-none focus:border-[#8760ff] placeholder:text-gray-400 text-lg tracking-widest"
            />
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <button
              onClick={handleVerifyOtp}
              className="w-full py-3 rounded bg-gradient-to-r from-[#8760ff] to-[#48d2ff] text-white font-semibold text-lg tracking-wide hover:opacity-90 transition"
            >
              VERIFY OTP
            </button>
          </>
        )}

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
