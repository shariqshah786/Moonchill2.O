import { useEffect, useState } from "react";
import { getTrendingVideos } from "../services/GlobalAPI";

const ContentRow = ({ title }) => {
  const [movies, setMovies] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getTrendingVideos;
        setMovies(response.data.results.slice(0, 5)); // Show only 5 movies
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Mock movie data for demonstration
  const mockMovies = [
    {
      id: 1,
      title: "Barbie",
      date: "20 Julio",
      image: "https://via.placeholder.com/200x300/FF69B4/FFFFFF?text=Barbie",
    },
    {
      id: 2,
      title: "No Hard Feelings",
      status: "Coming Soon",
      image:
        "https://via.placeholder.com/200x300/FF6B6B/FFFFFF?text=No+Hard+Feelings",
    },
    {
      id: 3,
      title: "Love Again",
      image:
        "https://via.placeholder.com/200x300/FF8C42/FFFFFF?text=Love+Again",
    },
    {
      id: 4,
      title: "Plane",
      image: "https://via.placeholder.com/200x300/4ECDC4/FFFFFF?text=Plane",
    },
    {
      id: 5,
      title: "Citadel",
      image: "https://via.placeholder.com/200x300/45B7D1/FFFFFF?text=Citadel",
    },
  ];

  // Show fewer items on mobile
  const displayMovies = isMobile ? mockMovies.slice(0, 2) : mockMovies;

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
        {title}
      </h2>
      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {displayMovies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 group cursor-pointer">
            <div className="relative">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-36 md:w-48 h-52 md:h-72 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 md:p-3 rounded-b-lg">
                <h3 className="text-white font-semibold text-xs md:text-sm">
                  {movie.title}
                </h3>
                {movie.date && (
                  <p className="text-gray-300 text-xs">{movie.date}</p>
                )}
                {movie.status && (
                  <p className="text-yellow-400 text-xs font-medium">
                    {movie.status}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentRow;
