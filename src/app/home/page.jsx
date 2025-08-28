"use client";
import Sidebar from "components/Sidebar";
import HeroSlider from "components/HeroSlider";
import ContentSlider from "components/ContentSlider";
import Footer from "components/Footer";
import MobileNav from "components/MobileNav";
import Link from "next/link";
import { useState } from "react";
import ProductionHouse from "components/ProductionHouse";
import Mainheader from "components/Mainheader";

const Home = () => {
  const [selectedGenre, setSelectedGenre] = useState("home");
  return (
    <>
      <div className="flex h-screen bg-gray-900">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
        </div>

        {/* Main content  */}
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <Mainheader />

          {/* main content area  */}
          <main className="p-4 md:p-6 pb-20 md:pb-6">
            <HeroSlider />
            {/* Logos  */}
            <ProductionHouse />
            {/* content slider  */}
            <div className="space-y-6 md:space-y-8 mt-6 md:mt-8">
              <ContentSlider title="Top movies" type="movies" />
              <ContentSlider title="Top series" type="tv" />
              <ContentSlider title="Top rated movies" type="topMovies" />
              <ContentSlider
                title="Top Upcoming movies"
                type="getUpcomingMovies"
              />
            </div>
            <div className="mt-10">{/* <ProductionHouse /> */}</div>
          </main>

          {/* footer  */}
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

export default Home;
