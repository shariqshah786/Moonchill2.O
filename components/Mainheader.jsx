import React from "react";
import Link from "next/link";
const Mainheader = () => {
  return (
    <>
      <div className="bg-black text-white text-center py-2 px-4 text-sm rounded-lg ">
        <Link href="/mainplans">
          <span className="text-indigo-50">Claim your voucher here</span>
          <span className="ml-2 text-indigo-50">→</span>
        </Link>
      </div>
      <header className="flex items-center justify-between p-4 md:p-6 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/home" className="flex items-center gap-2">
            <span className="text-lg md:text-2xl">🌙</span>
            <h2 className="text-lg md:text-2xl font-bold text-white">
              moonchill
            </h2>
          </Link>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700  px-6 rounded-lg font-semibold h-10 text-sm md:text-base">
          <Link href="/mainplans" className="text-white">
            Buy Plans
          </Link>
        </button>
      </header>
    </>
  );
};

export default Mainheader;
