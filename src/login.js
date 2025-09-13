"use client";
import { useState, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { app } from "../src/config";
import { useRouter } from "next/router";
export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {},
        "expired-callback": () => {},
      }
    );
  }, [auth]);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };
  const handleSendOtp = async (e) => {
    try {
      const formattedphoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedphoneNumber,
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setPhoneNumber("");
      alert("OTP has been sent");
    } catch (error) {
      console.error(error);
    }
  };
  const handleOtpSubmit = async () => {
    try {
      await confirmationResult.confirm(otp);
      setOtp("");
      router.push("/mainplans");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>{!otpSent ? <div id="recaptcha-container"></div> : null}</div>

      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="Enter the number with the country code"
        className="border border-gray-500 p-2 rounded-md "
      />
      <input
        type="text"
        value={otp}
        onChange={handleOtpChange}
        placeholder="Enter the OTP"
        className="border border-gray-500 p-2 rounded-md "
      />
      <button onClick={otpSent ? handleOtpSubmit : handleSendOtp}>
        {otpSent ? "submit OTP" : " Sent OTP"}
      </button>
    </>
  );
}
