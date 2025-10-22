"use client";

import { About3 } from "@/components/about-3";
import { TestimonialsColumn } from "@/components/testimonials-columns-1";
import Footer from "components/Footer";
import { useState } from "react";
import Sidebar from "components/Sidebar";
import MobileNav from "components/MobileNav";
import Mainheader from "components/header/Mainheader";

const About = () => {
  const [selectedGenre, setSelectedGenre] = useState("home");
  return (
    <>
      <div className="flex h-screen bg-gray-900 flex-col">
        {/* Desktop Sidebar */}
        <div className="hidden md:block fixed">
          <Sidebar
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <Mainheader />

          <main className="p-4 md:p-6 pb-20 md:pb-6 mt-16">
            <h1 className="text-white text-center font-bold ">Coming Soon... </h1>
            </main>

          <Footer />
        </div>
        <div className="md:hidden">
          <MobileNav
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
        </div>
      </div>
    </>
  );
};

export default About;
