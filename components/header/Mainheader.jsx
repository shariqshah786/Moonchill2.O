import React from "react";
import Link from "next/link";
import Image from "next/image";
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
          <Link href="/home">
            <Image
              src="/moonchill logo.svg"
              alt="Moonchill Logo"
              width={40}
              height={40}
              className="h-12 w-40 md:h-20 md:w-50 object-contain"
            />
          </Link>
        </div>

        <button className=" text-white px-6 rounded-lg font-semibold h-10 text-sm md:text-base">
          <Link href="/mainplans" className="text-white">
            <div className="text-white font-bold items-center ">BUY NOW</div>
          </Link>
        </button>
      </header>
    </>
  );
};

export default Mainheader;
