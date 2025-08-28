import React, { useState, useRef } from "react";

export default function PhoneOtpFlow() {
  const [step, setStep] = useState("phone"); // 'phone' or 'otp'
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const otpInputs = useRef([]);

  // Fake/request your OTP here!
  const handleContinue = () => {
    if (!/^\d{10}$/.test(phone)) return;
    setStep("otp");
    // trigger OTP send logic here (e.g. firebase or API)
  };

  const handleOtpChange = (value, idx) => {
    if (!/^\d?$/.test(value)) return;
    const o = [...otp];
    o[idx] = value;
    setOtp(o);
    if (value && idx < 5) otpInputs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpInputs.current[idx - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    // Do OTP verification here!
    alert("OTP Submitted: " + otp.join(""));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#161848] to-[#1b204e]">
      <div className="bg-[#110e2e] rounded-xl p-8 w-full max-w-md shadow-2xl text-center border border-[#382eb1]">
        <div className="rounded-t-xl bg-gradient-to-r from-[#8760ff] to-[#48d2ff] py-4 mb-6 text-white text-xl font-bold">
          {step === "phone" ? "Subscribe 9MS Power (30D)" : "Verify OTP"}
        </div>

        {step === "phone" ? (
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
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9999999999"
              className="w-full px-4 py-2 rounded bg-transparent text-white border border-[#382eb1] mb-6 focus:outline-none focus:border-[#8760ff] placeholder:text-gray-400 text-lg"
              maxLength={10}
            />
            <button
              className="w-full py-3 rounded bg-gradient-to-r from-[#8760ff] to-[#48d2ff] text-white font-semibold text-lg tracking-wide hover:opacity-90 transition"
              disabled={!/^\d{10}$/.test(phone)}
              onClick={handleContinue}
            >
              CONTINUE
            </button>
          </>
        ) : (
          <>
            <div className="flex flex-col items-start mb-6">
              <span className="text-left text-gray-400 font-semibold">
                Mobile Number
              </span>
              <div className="relative w-full my-2">
                <input
                  type="text"
                  value={phone}
                  disabled
                  className="bg-[#19194b] text-gray-400 border border-[#382eb1] w-full rounded px-4 py-2 text-lg line-through"
                />
                <button
                  className="absolute right-2 top-2 text-white underline text-sm"
                  onClick={() => setStep("phone")}
                  type="button"
                >
                  Change Mobile Number
                </button>
              </div>
            </div>

            <div className="mb-6 text-left">
              <label className="text-gray-400 font-semibold mb-2 block">
                OTP Code
              </label>
              <div className="flex gap-2">
                {[...Array(6)].map((_, idx) => (
                  <input
                    key={idx}
                    maxLength={1}
                    value={otp[idx]}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    ref={(el) => (otpInputs.current[idx] = el)}
                    className="w-12 h-12 text-center text-white bg-[#19194b] border border-[#382eb1] rounded-lg text-2xl focus:border-[#48d2ff] focus:outline-none"
                  />
                ))}
              </div>
            </div>

            <button
              className="w-full py-3 rounded bg-gradient-to-r from-[#8760ff] to-[#48d2ff] text-white font-semibold text-lg tracking-wide hover:opacity-90 transition"
              disabled={otp.some((d) => d === "")}
              onClick={handleVerifyOtp}
            >
              VERIFY OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
