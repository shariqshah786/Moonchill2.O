"use client";

import { About3 } from "@/components/about-3";
import { TestimonialsColumn } from "@/components/testimonials-columns-1";
import Footer from "components/Footer";
import { useState } from "react";
import Sidebar from "components/Sidebar";
import MobileNav from "components/MobileNav";
import Mainheader from "components/Mainheader";

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
        <div className="ml-12">
          <Mainheader />
        </div>
        <About3 />

        <Footer />
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
