"use client";
import React, { useState, useEffect } from "react";

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // 2 sec splash
    return () => clearTimeout(timer);
  }, []);

  if (!showSplash) return null;

  return (
    <div
      id="splash-screen"
      className="fixed z-50 w-full h-full flex justify-center items-center bg-gray-900"
    >
      <span className="text-lg md:text-2xl">🌙</span>
      <h2 className="text-lg md:text-2xl font-bold text-white">moonchill</h2>
    </div>
  );
};

export default SplashScreen;
