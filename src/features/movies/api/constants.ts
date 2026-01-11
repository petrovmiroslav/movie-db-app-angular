import { MovieId } from '../types';

export const MoviesApiPaths = {
  fetchMovieApi: (movieId: MovieId | ':movieId') => `/movie/${movieId}` as const,
  fetchPopularMoviesApi: '/movie/popular' as const,
  fetchTopRatedMoviesApi: '/movie/top_rated' as const,
  fetchRecommendationsMoviesApi: (movieId: MovieId | ':movieId') =>
    `/movie/${movieId}/recommendations` as const,
  fetchSimilarMoviesApi: (movieId: MovieId | ':movieId') => `/movie/${movieId}/similar` as const,
  searchMoviesApi: '/search/movie' as const,
  discoverMovieApi: '/discover/movie' as const,
};
