"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Ott from "./ModalOtt";

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeenModal = localStorage.getItem("ottModalShown");

      if (!hasSeenModal) {
        const timer = setTimeout(() => {
          setShowModal(true);
          localStorage.setItem("ottModalShown", "true");
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleRedirect = () => {
    setShowModal(false);
    router.push("/mainplans");
  };

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center  bg-opacity-80 z-[9999]"
      onClick={() => setShowModal(false)} // close when clicking outside
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-[90%] text-gray-900 text-center z-[10000]"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        <h2 className="font-bold text-3xl text-primary mb-3">
          Unlock Premium Entertainment 🎬
        </h2>

        <p className="text-base text-gray-700 mb-5">
          Access exclusive movies, series, and shows from your favorite OTT
          platforms – all in one powerful subscription.
        </p>

        <Ott />

        <button
          className="w-full mt-6 bg-primary hover:bg-primary-700 text-white text-lg font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md shadow-primary-400/40 hover:scale-[1.02]"
          onClick={handleRedirect}
        >
          ✨ Subscribe & Start Watching
        </button>

        <button
          className="mt-4 text-white text-sm hover:underline"
          onClick={() => setShowModal(false)} // close on Maybe Later
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
}
