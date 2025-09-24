"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
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
      <Image
        src="/moonchill logo.svg"
        alt="Moonchill Logo"
        width={40}
        height={40}
        className="h-12 w-40 md:h-20 md:w-50 object-contain"
      />
    </div>
  );
};

export default SplashScreen;
