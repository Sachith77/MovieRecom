// API Configuration for TMDb
export const API_KEY = '1f54bd990f1cdfb230adb312546d765d'; // Hardcoded working TMDB API key
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const BACKDROP_SIZE = 'original';
export const POSTER_SIZE = 'w500';

// API request URLs
export const ENDPOINTS = {
  trending: `${BASE_URL}/trending/movie/week`,
  popular: `${BASE_URL}/movie/popular`,
  topRated: `${BASE_URL}/movie/top_rated`,
  upcoming: `${BASE_URL}/movie/upcoming`,
  nowPlaying: `${BASE_URL}/movie/now_playing`,
  movieDetails: (id) => `${BASE_URL}/movie/${id}`,
  movieCredits: (id) => `${BASE_URL}/movie/${id}/credits`,
  movieRecommendations: (id) => `${BASE_URL}/movie/${id}/recommendations`,
  search: `${BASE_URL}/search/movie`,
  genres: `${BASE_URL}/genre/movie/list`,
};

// Default parameters for API requests
export const DEFAULT_PARAMS = {
  api_key: API_KEY,
  language: 'en-US',
}; 