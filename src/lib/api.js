import axios from "axios";

const movieURL = "https://api.themoviedb.org/3";
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const imageBaseURL = "https://image.tmdb.org/t/p/original";

// Helper function for GET requests
const fetchFromTMDB = async (endpoint) => {
  const url = `${movieURL}${endpoint}?api_key=${apiKey}&language=en-US`;
  const response = await axios.get(url);
  return response.data;
};

// ✅ Trending content
export const getTrendingVideos = async () => {
  const res = await axios.get(`${movieURL}/trending/all/day?api_key=${apiKey}`);
  return res.data;
};

// ✅ Movies by genre
export const getMovieByGenreId = async (id) => {
  const res = await axios.get(
    `${movieURL}/discover/movie?api_key=${apiKey}&with_genres=${id}`
  );
  return res.data;
};

// ✅ Popular movies
export const getPopularMovies = async () => {
  const res = await axios.get(
    `${movieURL}/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  return res.data;
};

// ✅ Popular TV shows
export const getPopularTVShows = async () => {
  const res = await axios.get(
    `${movieURL}/tv/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  return res.data;
};

// ✅ Top-rated movies
export const getTopRatedMovies = async () => {
  const res = await axios.get(
    `${movieURL}/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
  );
  return res.data;
};

// ✅ Now playing
export const getNowPlayingMovies = async () => {
  const res = await axios.get(
    `${movieURL}/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
  );
  return res.data;
};

// ✅ Upcoming
export const getUpcomingMovies = async () => {
  const res = await axios.get(
    `${movieURL}/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
  );
  return res.data;
};

// ✅ Movie details
export const getMovieDetails = async (movieId) => {
  const res = await axios.get(
    `${movieURL}/movie/${movieId}?api_key=${apiKey}&language=en-US`
  );
  return res.data;
};

// ✅ TV show details
export const getTVShowDetails = async (tvId) => {
  const res = await axios.get(
    `${movieURL}/tv/${tvId}?api_key=${apiKey}&language=en-US`
  );
  return res.data;
};

// ✅ Image helper
export const getImageURL = (path) => (path ? `${imageBaseURL}${path}` : null);
