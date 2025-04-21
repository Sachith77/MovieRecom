import axios from 'axios';
import { ENDPOINTS, DEFAULT_PARAMS, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE, API_KEY, BASE_URL } from './config';

// Debug logging
console.log('API Key status:', API_KEY ? 'API key is set' : 'API key is missing');
console.log('API Key length:', API_KEY ? API_KEY.length : 0);
console.log('Direct test URL:', `${BASE_URL}/movie/popular?api_key=${API_KEY}`);

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: DEFAULT_PARAMS,
});

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log(`API call successful: ${response.config.url}`);
    return response;
  },
  error => {
    console.error(`API call failed: ${error.config?.url}`, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Format image URLs
export const formatPosterPath = (path) => 
  path ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${path}` : '/images/placeholder-poster.jpg';

export const formatBackdropPath = (path) => 
  path ? `${IMAGE_BASE_URL}/${BACKDROP_SIZE}${path}` : '/images/placeholder-backdrop.jpg';

// Get trending movies
export const getTrendingMovies = async () => {
  try {
    const response = await api.get(ENDPOINTS.trending);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

// Get popular movies
export const getPopularMovies = async () => {
  try {
    const response = await api.get(ENDPOINTS.popular);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Get top rated movies
export const getTopRatedMovies = async () => {
  try {
    const response = await api.get(ENDPOINTS.topRated);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
};

// Get upcoming movies
export const getUpcomingMovies = async () => {
  try {
    const response = await api.get(ENDPOINTS.upcoming);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return [];
  }
};

// Get movie details
export const getMovieDetails = async (movieId) => {
  try {
    const [movieData, creditsData, recommendationsData] = await Promise.all([
      api.get(ENDPOINTS.movieDetails(movieId)),
      api.get(ENDPOINTS.movieCredits(movieId)),
      api.get(ENDPOINTS.movieRecommendations(movieId)),
    ]);

    return {
      ...movieData.data,
      credits: creditsData.data,
      recommendations: recommendationsData.data.results,
    };
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    return null;
  }
};

// Search movies
export const searchMovies = async (query, page = 1, additionalParams = {}) => {
  try {
    const response = await api.get(ENDPOINTS.search, {
      params: {
        query,
        page,
        ...additionalParams,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return { results: [], total_pages: 0 };
  }
};

// Get movie genres
export const getGenres = async () => {
  try {
    const response = await api.get(ENDPOINTS.genres);
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};

// Test function using direct fetch instead of axios
export const testFetchMovies = async () => {
  try {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    console.log('Testing direct fetch with URL:', url);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Direct fetch successful, found', data.results?.length, 'movies');
    return data.results;
  } catch (error) {
    console.error('Error in testFetchMovies:', error);
    return [];
  }
}; 