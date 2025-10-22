import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";

const OttCards = () => {
  const Otts = [
    {
      name: "Amazon Prime",
      price: 99,
      discount: 70,
      logo: "/amazonprime.png",
    },
    {
      name: "Jio Hotstar",
      price: 49,
      discount: 55,
      logo: "/ott_logos/JIOHOTSTAR_LOGO (1).jpg",
    },
    {
      name: "Sony LIV",
      price: 69,
      discount: 80,
      logo: "/ott_logos/sonyliv_logo.png",
    },
    {
      name: "ZEE5",
      price: 69,
      discount: 75,
      logo: "/ott_logos/zee5logo.jpeg",
    },
    {
      name: "Youtube",
      price: 89,
      discount: 70,
      logo: "/youtube_logo.png",
    },
    {
      name: "Sun next",
      price: 89,
      discount: 50,
      logo: "/ott_logos/sunnext logo.png",
    },
  ];
  return (
    <>
      <Carousel className="w-full max-w-4xl mx-auto my-10">
        <CarouselContent className="-ml-2 md:-ml-4">
          {Otts.map((ott, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/3"
            >
              <div className="p-4 bg-gray-800 rounded-lg ">
                <div className="text-center">
                  <Image
                    src={ott.logo}
                    alt={`${ott.name} Logo`}
                    width={60}
                    height={40}
                    className="mx-auto mb-4 object-contain rounded-3xl"
                  />
                  <p className="text-orange-400 text-center text-sm font-bold">
                    {ott.discount}% OFF
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <p className="text-xl font-extrabold mb-4 text-white text-center">
                    ₹{ott.price}/-Monthly
                  </p>
                  <Link
                    href={`/subscribe/${ott.name
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                  >
                    <button className="mx-auto px-6 py-2 rounded bg-gradient-to-r from-sky-500 to-indigo-500 font-medium text-white shadow hover:scale-105 transition">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="mx-12 mt-5" />
        <CarouselNext className="mx-12 mt-5" />
      </Carousel>
    </>
  );
};

export default OttCards;
