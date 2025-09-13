import React from "react";

const OttLogos = [
  { name: "main", logo: "/amazonprime.png" },
  { name: "main", logo: "/ott_logos/JIOHOTSTAR_LOGO (1).jpg" },
  { name: "main", logo: "/ott_logos/sonyliv_logo.png" },
  { name: "main", logo: "/ott_logos/zee5logo.jpeg" },
];

export default function Ott() {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-default">
        Watch on:
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {OttLogos.map((logos) => (
          <div
            key={logos.name}
            className="p-3 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out flex items-center justify-center"
          >
            <img
              src={logos.logo || "/placeholder.svg"}
              alt={`${logos.name} logo`}
              className="object-contain max-h-[50px] w-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
