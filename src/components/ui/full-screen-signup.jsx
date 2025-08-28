"use client";

import { useState, useRef } from "react";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
// import firebaseApp from "@firebase";

import { SunIcon as Sunburst } from "lucide-react";

const OTPInput = ({ length, value, onChange }) => {
  const inputs = [];
  return (
    <div className="flex gap-2 justify-center my-4">
      {[...Array(length)].map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d?$/.test(val)) {
              let nextOtp = value.split("");
              nextOtp[i] = val;
              onChange(nextOtp.join(""));
              if (val && i < length - 1) {
                inputs[i + 1]?.focus();
              }
            }
          }}
          ref={(el) => (inputs[i] = el)}
          className="w-12 h-12 text-center border rounded-md text-lg"
        />
      ))}
    </div>
  );
};

export const LoginFrom = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const recaptchaContainer = useRef(null);

  // Send OTP
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setPhoneError("");
    setError("");
    setSuccess("");
    if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      return;
    }
    try {
      // Only set up once per session
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          recaptchaContainer.current,
          { size: "invisible" },
          auth
        );
      }
      const formattedPhone = "+91" + phone; // Change for other regions!
      const result = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      );
      setConfirmationResult(result);
      setOtpRequested(true);
      setSuccess("OTP sent to your phone. Please check your messages.");
    } catch (err) {
      setError(err.message || "Failed to send OTP.");
    }
  };

  // Verify OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setOtpError("");
    setError("");
    setSuccess("");
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setOtpError("Please enter a valid 6-digit OTP.");
      return;
    }
    try {
      await confirmationResult.confirm(otp);
      setSuccess(`${isLogin ? "Login" : "Signup"} successful!`);
      // You can redirect or update global state here if needed.
      setPhone("");
      setOtp("");
      setOtpRequested(false);
      setConfirmationResult(null);
    } catch (err) {
      setOtpError("OTP incorrect or expired. Try again.");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setOtpRequested(false);
    setPhone("");
    setOtp("");
    setConfirmationResult(null);
    setPhoneError("");
    setOtpError("");
    setSuccess("");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden p-4 bg-gray-800">
      <div className="w-full max-w-5xl flex flex-col md:flex-row shadow-xl">
        <div className="bg-black text-white p-8 md:p-12 md:w-1/2 rounded-bl-3xl flex items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-medium leading-tight tracking-tight">
            Choose the best Plan for Your Entertainment
          </h1>
        </div>
        <div className="p-8 md:p-12 md:w-1/2 flex flex-col bg-secondary text-secondary-foreground">
          <div className="flex flex-col items-start mb-8">
            <div className="text-orange-500 mb-4">
              <Sunburst className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-medium mb-2 tracking-tight">
              Get Started
            </h2>
            <p className="opacity-80">
              Welcome to Moonchill — Let's get started
            </p>
          </div>

          {!otpRequested ? (
            <form
              className="flex flex-col gap-4"
              onSubmit={handlePhoneSubmit}
              noValidate
            >
              <label htmlFor="phone" className="block text-sm mb-2">
                Your Number
              </label>
              <input
                type="text"
                id="phone"
                placeholder="9999999999"
                className={`text-sm w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-1 bg-white text-black focus:ring-orange-500 ${
                  phoneError ? "border-red-500" : "border-gray-300"
                }`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-invalid={!!phoneError}
                aria-describedby="phone-error"
                maxLength={10}
                required
              />
              {phoneError && (
                <p id="phone-error" className="text-red-500 text-xs mt-1">
                  {phoneError}
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {isLogin ? "Send OTP to Login" : "Send OTP to Signup"}
              </button>
              <div ref={recaptchaContainer}></div>
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              {success && (
                <p className="text-green-500 text-xs mt-2">{success}</p>
              )}
            </form>
          ) : (
            <form
              className="flex flex-col gap-4"
              onSubmit={handleOtpSubmit}
              noValidate
            >
              <label className="block text-sm mb-2">
                Enter the OTP sent to {phone}
              </label>
              <OTPInput length={6} value={otp} onChange={setOtp} />
              {otpError && (
                <p className="text-red-500 text-xs mt-1">{otpError}</p>
              )}
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Verify OTP & {isLogin ? "Login" : "Signup"}
              </button>
              {success && (
                <p className="text-green-500 text-xs mt-2">{success}</p>
              )}
            </form>
          )}

          <div className="text-center text-gray-600 text-sm mt-4">
            {isLogin ? (
              <>
                New user?{" "}
                <button
                  className="text-orange-500 font-medium underline hover:text-orange-600"
                  onClick={toggleForm}
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have account?{" "}
                <button
                  className="text-orange-500 font-medium underline hover:text-orange-600"
                  onClick={toggleForm}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginFrom;
