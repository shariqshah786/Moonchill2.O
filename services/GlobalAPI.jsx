import axiosInstance from "./axiosInstance";

const apiKey = "87ac4ebc4205b3f3927f59e6ba0c32ff";
const imageBaseURL = "https://image.tmdb.org/t/p/original";

export const getTrendingVideos = () =>
  axiosInstance.get(`/trending/all/day?api_key=${apiKey}`);

export const getMovieByGenreId = (id) =>
  axiosInstance.get(`/discover/movie?api_key=${apiKey}&with_genres=${id}`);

export const getPopularMovies = () =>
  axiosInstance.get(`/movie/popular?api_key=${apiKey}&language=en-US&page=1`);

export const getPopularTVShows = () =>
  axiosInstance.get(`/tv/popular?api_key=${apiKey}&language=en-US&page=1`);

export const getTopRatedMovies = () =>
  axiosInstance.get(`/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`);

export const getNowPlayingMovies = () =>
  axiosInstance.get(
    `/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
  );

export const getUpcomingMovies = () =>
  axiosInstance.get(`/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`);

export const getMovieDetails = (movieId) =>
  axiosInstance.get(`/movie/${movieId}?api_key=${apiKey}&language=en-US`);

export const getTVShowDetails = (tvId) =>
  axiosInstance.get(`/tv/${tvId}?api_key=${apiKey}&language=en-US`);

export const getImageURL = (path) => (path ? `${imageBaseURL}${path}` : null);
