import axios from "axios";

const movieURL = "https://api.themoviedb.org/3";
const apiKey = "87ac4ebc4205b3f3927f59e6ba0c32ff";
const imageBaseURL = "https://image.tmdb.org/t/p/original";

// Trending content
export const getTrendingVideos = axios.get(
  `${movieURL}/trending/all/day?api_key=${apiKey}`
);

// Movies by genre
const movieByGenreBaseURL =
  "https://api.themoviedb.org/3/discover/movie?api_key=87ac4ebc4205b3f3927f59e6ba0c32ff";
export const getMovieByGenreId = (id) =>
  axios.get(movieByGenreBaseURL + "&with_genres=" + id);

// Popular movies
export const getPopularMovies = axios.get(
  `${movieURL}/movie/popular?api_key=${apiKey}&language=en-US&page=1`
);

// Popular TV series
export const getPopularTVShows = axios.get(
  `${movieURL}/tv/popular?api_key=${apiKey}&language=en-US&page=1`
);

// Top rated movies
export const getTopRatedMovies = axios.get(
  `${movieURL}/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
);

// Now playing movies
export const getNowPlayingMovies = axios.get(
  `${movieURL}/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
);

// Upcoming movies
export const getUpcomingMovies = axios.get(
  `${movieURL}/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
);

// Image URL helper
export const getImageURL = (path) => {
  return path ? `${imageBaseURL}${path}` : null;
};

// Movie details
export const getMovieDetails = (movieId) =>
  axios.get(`${movieURL}/movie/${movieId}?api_key=${apiKey}&language=en-US`);

// TV show details
export const getTVShowDetails = (tvId) =>
  axios.get(`${movieURL}/tv/${tvId}?api_key=${apiKey}&language=en-US`);
