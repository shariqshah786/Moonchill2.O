import { useState, useEffect, useRef } from "react";
import { HiPlay, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { getTrendingVideos, getImageURL } from "../services/GlobalAPI";
import Link from "next/link";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [heroSlides, setHeroSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await getTrendingVideos();
        const trendingData = response.data.results.slice(0, 5); // Get first 5 trending items

        const slides = trendingData.map((item, index) => ({
          id: item.id,
          title: item.title || item.name,
          description: item.overview,
          image: getImageURL(item.backdrop_path),
          genre: item.media_type === "movie" ? "Movie" : "TV Series",
          rating: item.vote_average,
          releaseDate: item.release_date || item.first_air_date,
        }));

        setHeroSlides(slides);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hero data:", error);
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  const nextSlide = () => {
    if (heroSlides.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }
  };

  const prevSlide = () => {
    if (heroSlides.length > 0) {
      setCurrentSlide(
        (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
      );
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isAutoPlaying && heroSlides.length > 0) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 4000); // Change slide every 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, currentSlide, heroSlides.length]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  if (loading) {
    return (
      <div className="relative h-64 md:h-96 rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center">
        <div className="text-white text-lg">Loading featured content...</div>
      </div>
    );
  }

  if (heroSlides.length === 0) {
    return (
      <div className="relative h-64 md:h-96 rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center">
        <div className="text-white text-lg">No featured content available</div>
      </div>
    );
  }

  return (
    <div
      className="relative h-64 md:h-96 rounded-xl overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 hero-slide ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: slide.image
                ? `url('${slide.image}')`
                : "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center p-4 md:p-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  {slide.genre}
                </span>
                {slide.rating && (
                  <span className="text-yellow-400 text-xs">
                    ⭐ {slide.rating.toFixed(1)}
                  </span>
                )}
              </div>
              <h2 className="text-lg md:text-2xl lg:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight">
                {slide.title}
              </h2>
              <p className="text-gray-200 text-sm md:text-lg mb-4 md:mb-6 max-w-lg hidden md:block line-clamp-3">
                {slide.description.slice(0, 100) + "..."}
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/mainplans"
                  className="bg-white hover:bg-blue-700 hover:text-white  px-6 md:px-8 py-2 md:py-3 rounded-lg font-medium flex items-center gap-2 transition-colors duration-200 shadow-lg hover:shadow-xl text-sm md:text-base"
                >
                  <HiPlay className="w-4 h-4 md:w-5 md:h-5" />
                  Watch now
                </Link>
                {slide.releaseDate && (
                  <span className="text-gray-300 text-sm">
                    {new Date(slide.releaseDate).getFullYear()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {heroSlides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 nav-arrow"
          >
            <HiChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 nav-arrow"
          >
            <HiChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {/* {heroSlides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 dot-indicator ${
                index === currentSlide
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      )} */}

      {/* Thumbnail Previews - Hidden on mobile */}
      <div className="absolute bottom-4 right-4 flex gap-2 hidden md:flex">
        {heroSlides.slice(0, 4).map((slide, index) => (
          <div
            key={slide.id}
            className="w-16 h-20 bg-gray-700 rounded-md border-2 border-white/20 hover:border-white/40 transition-colors duration-200 cursor-pointer overflow-hidden"
            onClick={() => goToSlide(index)}
          >
            {slide.image ? (
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
