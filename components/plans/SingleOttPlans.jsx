import Image from "next/image";
import React from "react";
import Link from "next/link";

const SingleOttPlans = () => {
  const otts = [
    {
      name: "Amazon Prime",
      price: 199,
      discount: 33,
      logo: "/amazonprime.png",
    },
    {
      name: "Jio Hotstar",
      price: 199,
      discount: 33,
      logo: "/ott_logos/JIOHOTSTAR_LOGO (1).jpg",
    },
    {
      name: "Sony LIV",
      price: 199,
      discount: 33,
      logo: "/ott_logos/sonyliv_logo.png",
    },
    {
      name: "ZEE5",
      price: 199,
      discount: 33,
      logo: "/ott_logos/zee5logo.jpeg",
    },
    {
      name: "Youtube",
      price: 199,
      discount: 33,
      logo: "/youtube_logo.png",
    },
    {
      name: "Sun next",
      price: 199,
      discount: 33,
      logo: "/ott_logos/sunnext logo.png",
    },
  ];

  return (
    <div className="w-full px-2 py-8 max-w-screen-xl mx-auto">
      <h1 className="text-2xl md:text-3xl text-white font-bold text-center mb-8">
        Top Premium OTT Plans
      </h1>

      {/* Mobile: Horizontal scroll - Desktop: Grid */}
      <div
        className="
          grid grid-cols-2 
          md:grid gap-6
          md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6
           md:gap-6
          overflow-x-auto md:overflow-x-visible
          scrollbar-hide
          pb-4
        "
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {otts.map((ott, index) => (
          <div
            key={index}
            className="
              flex-shrink-0 w-35 ml-5 md:ml-0
              md:w-full
              p-4 rounded-lg shadow-lg
              hover:shadow-xl transition-shadow
            "
          >
            <div className="text-center">
              <Image
                src={ott.logo}
                alt={`${ott.name} Logo`}
                width={60}
                height={40}
                className="mx-auto mb-4 object-contain rounded-3xl"
              />
              <p className="text-orange-400 text-right text-sm font-semibold">
                {ott.discount}% OFF
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <p className="text-lg font-bold mb-4 text-white text-center">
                ₹{ott.price}/month
              </p>
              <Link
                href={`/subscribe/${ott.name
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
              >
                <button className=" mx-auto px-6 py-2 rounded bg-gradient-to-r from-sky-500 to-indigo-500 font-medium text-white shadow hover:scale-105 transition">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleOttPlans;
