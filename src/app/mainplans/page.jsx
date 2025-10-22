"use client";
import Footer from "components/Footer";
import React, { useState } from "react";
import Sidebar from "components/Sidebar";
import MobileNav from "components/MobileNav";
import Mainheader from "components/header/Mainheader";
import Link from "next/link";
import PlanList from "components/plans/PlanList";
import PlanPricingBox from "components/plans/PlanPricingBox";
import Image from "next/image";

import OttCards from "components/plans/OttCards";
const OttLogos = () => {
  const [selectedGenre, setSelectedGenre] = useState("home");
  const [priceType, setPriceType] = useState("month");
  const platforms = [
    { name: "main", logo: "/amazonprime.png" },
    { name: "main", logo: "/ott_logos/JIOHOTSTAR_LOGO (1).jpg" },
    { name: "main", logo: "/ott_logos/sonyliv_logo.png" },
    { name: "main", logo: "/ott_logos/zee5logo.jpeg" },
    { name: "shemaroo", logo: "/ott_logos/Shemaroo_NEW_Logo.png" },
    { name: "AHA", logo: "/ott_logos/aha.png" },
    { name: "Aao", logo: "/ott_logos/aao.jpeg" },
    { name: "chaupal", logo: "/ott_logos/chaupal-logo.png" },
    { name: "discovery", logo: "/ott_logos/discovery+-logo-6000x600.jpg" },
    { name: "fancode", logo: "/ott_logos/fancode_logo.jpg" },
    { name: "DangalPlay", logo: "/ott_logos/DANGAL_PLAY.jpeg" },
    { name: "travelxp", logo: "/ott_logos/TRAVELXP.jpg" },
    { name: "shotstv", logo: "/ott_logos/SHORT.png" },
    { name: "omtv", logo: "/ott_logos/OM TV.png" },
    { name: "stage", logo: "/ott_logos/stage_logo.png" },
    { name: "distrotv", logo: "/ott_logos/distrotv_logo.jpg" },
    { name: "hubhopper", logo: "/ott_logos/Hub_Hopper.png" },
    { name: "Itap", logo: "/ott_logos/Itap_Logo.png" },
    { name: "jiosavan", logo: "/ott_logos/JioSaavn Logo on White.png" },
    { name: "etv", logo: "/ott_logos/etv win-01.png" },
    { name: "shucaeltv", logo: "/ott_logos/shucaeLogo.png" },
    { name: "ottplus", logo: "/ott_logos/Ott Plus - logo.png" },
    { name: "runntv", logo: "/ott_logos/RunnTV.png" },
    { name: "rajtv", logo: "/ott_logos/rajtv-01.png" },
    { name: "chanajor", logo: "/ott_logos/channa_jor.png" },
    { name: "nammaflix", logo: "/ott_logos/NammaFlix.png" },
  ];
  const plans = [
    {
      name: "Moonchill Starter Plan",
      monthPrice: 99,
      yearlyPrice: 599,
      mrpmonth: 999,
      mrpYearly: 1599,
      marketmonth: 999,
      marketYearly: 24030,
      features: ["2 Device", "Full HD Streaming", "Popular Content"],
      logos: [
        // platforms[0],
        // platforms[1],
        platforms[2],
        // platforms[3],
        platforms[4],
        // platforms[5],
        // platforms[6],
        platforms[7],
        // platforms[8],
        platforms[9],
        platforms[10],
        platforms[11],
        platforms[12],
        platforms[13],
        platforms[14],
        // platforms[15],
        // platforms[16],
        // platforms[17],
        // platforms[18],
        // platforms[19],
        // platforms[20],
        // platforms[21],
        // platforms[22],
        // platforms[23],
        // platforms[24],
        // platforms[25],
      ],
    },
    {
      name: "Moonchill PowerPlay",
      monthPrice: 199,
      yearlyPrice: 1299,
      mrpmonth: 1999,
      mrpYearly: 8990,
      marketmonth: 1999,
      marketYearly: 24030,
      features: ["2 Device", "HD Streaming", "Limited Content"],
      logos: [
        // platforms[0],
        platforms[1],
        platforms[2],
        // platforms[3],
        platforms[4],
        // platforms[5],
        platforms[6],
        platforms[7],
        // platforms[8],
        platforms[9],
        platforms[10],
        platforms[11],
        platforms[12],
        platforms[13],
        platforms[14],
        platforms[15],
        platforms[16],
        platforms[17],
        platforms[18],
        platforms[19],
        platforms[20],
        platforms[21],
        platforms[22],
        platforms[23],
        platforms[24],
        platforms[25],
      ],
    },
    {
      name: "Premium",
      monthPrice: 299,
      yearlyPrice: 1999,
      mrpmonth: 2999,
      mrpYearly: 10990,
      marketmonth: 2999,
      marketYearly: 32030,
      features: ["3 Devices", "Full HD Streaming", "Popular Content"],
      logos: [
        // platforms[0],
        platforms[1],
        platforms[2],
        platforms[3],
        platforms[4],
        // platforms[5],
        platforms[6],
        platforms[7],
        // platforms[8],
        platforms[9],
        platforms[10],
        platforms[11],
        platforms[12],
        platforms[13],
        platforms[14],
        platforms[15],
        platforms[16],
        platforms[17],
        platforms[18],
        platforms[19],
        platforms[20],
        platforms[21],
        platforms[22],
        platforms[23],
        platforms[24],
        platforms[25],
      ],
    },
    {
      name: "Premium Pro",
      monthPrice: 399,
      yearlyPrice: 2999,
      mrpmonth: 4999,
      mrpYearly: 13990,
      marketmonth: 4999,
      marketYearly: 42030,
      features: ["5 Devices", "4K Streaming", "All Content Access"],
      logos: platforms, // All platforms
    },
  ];
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed">
        <Sidebar
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      </div>
      <div className="flex-1 overflow-y-auto pl-0 md:pl-10">
        <Mainheader />
        <div className=" bg-gray-900 flex flex-col items-center px-4 py-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-gray-300">
            Choose the Best Ott Plans for Your Entertainment
          </h2>

          <OttCards />

          <PlanList priceType={priceType} setPriceType={setPriceType} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div
                className={`rounded-2xl cursor-pointer shadow-lg p-7 flex flex-col items-center bg-gray-700 border-none
                ${
                  plan.name === "Moonchill Asia cup limited plan"
                    ? "border-4 border-s-black "
                    : "border border-gray-200"
                } 
                hover:shadow-2xl transition-all duration-300`}
                key={index}
              >
                <h2 className="text-xl font-bold mb-2 text-chart-2 ">
                  {plan.name}
                </h2>

                <div className=" flex justify-center gap-2 mb-4 flex-wrap">
                  {plan.logos.map((platform, idx) => (
                    <Image
                      key={idx}
                      src={platform.logo}
                      alt={`${platform.name} logo`}
                      width={80} // instead of 14
                      height={80} // instead of 14
                      className={`object-contain rounded bg-gray-50 border hover:scale-110 transition-all duration-300 ease-in-out 
    ${platform.name === "main" ? "w-20 h-20" : "w-16 h-16"}`}
                      quality={100} // ensure high clarity
                    />
                  ))}
                </div>
                {/* <ul className="mb-4 text-gray-700 text-sm w-full list-disc pl-5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul> */}
                <div className="flex flex-col  items-center w-full mt-auto">
                  <PlanPricingBox
                    priceType={priceType}
                    monthPrice={plan.monthPrice}
                    yearlyPrice={plan.yearlyPrice}
                    mrpmonth={plan.mrpmonth}
                    mrpYearly={plan.mrpYearly}
                    marketmonth={plan.marketmonth}
                    marketYearly={plan.marketYearly}
                    features={plan.features}
                  />
                  <Link
                    href={`/subscribe/${plan.name
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                  >
                    <button className="mt-auto px-6 py-2 rounded bg-gradient-to-r from-sky-500 to-indigo-500 font-medium text-white shadow hover:scale-105 transition">
                      Subscribe
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
        <div className="md:hidden fixed">
          <MobileNav
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
        </div>
      </div>
    </div>
  );
};

export default OttLogos;
