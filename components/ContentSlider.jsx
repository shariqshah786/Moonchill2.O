import { useRef, useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import {
  getPopularMovies,
  getPopularTVShows,
  getTopRatedMovies,
  getImageURL,
  getUpcomingMovies,
} from "../services/GlobalAPI";
import Link from "next/link";

const ContentSlider = ({ title, type = "movies" }) => {
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (type === "movies") {
          response = await getPopularMovies;
        } else if (type === "tv") {
          response = await getPopularTVShows;
        } else if (type === "topMovies") {
          response = await getTopRatedMovies;
        } else if (type === "UpcomingMovies") {
          response = await getUpcomingMovies;
        } else {
          response = await getPopularMovies; // Default to movies
        }

        const data = response.data.results.map((item) => ({
          id: item.id,
          title: item.title || item.name,
          image: getImageURL(item.poster_path),
          backdrop: getImageURL(item.backdrop_path),
          rating: item.vote_average,
          releaseDate: item.release_date || item.first_air_date,
          overview: item.overview,
          mediaType: type,
        }));

        setMovies(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  const scroll = (direction) => {
    const container = sliderRef.current;
    const scrollAmount = 300; // Adjust scroll amount as needed

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    const container = sliderRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  // Show fewer items on mobile
  const displayMovies = isMobile ? movies.slice(0, 10) : movies;

  if (loading) {
    return (
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
          {title}
        </h2>
        <div className="flex gap-3 md:gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex-shrink-0">
              <div className="w-36 md:w-48 h-52 md:h-72 bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
        {title}
      </h2>

      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 nav-arrow"
        >
          <HiChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute mt-4 right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 nav-arrow"
        >
          <HiChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Content Container */}
      <Link href="/mainplans">
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex gap-5 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth slider-container"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayMovies.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0 group cursor-pointer content-card"
            >
              <div className="relative">
                {movie.image ? (
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-40 md:w-63 h-52 md:h-90 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-36 md:w-48 h-52 md:h-72 bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No Image</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 md:p-3 rounded-b-lg">
                  <h3 className="text-white font-semibold text-xs md:text-sm line-clamp-1">
                    {movie.title}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    {movie.rating && (
                      <span className="text-yellow-400 text-xs">
                        ⭐ {movie.rating.toFixed(1)}
                      </span>
                    )}
                    {movie.releaseDate && (
                      <span className="text-gray-300 text-xs">
                        {new Date(movie.releaseDate).getFullYear()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default ContentSlider;
