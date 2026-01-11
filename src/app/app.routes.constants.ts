import { MovieId } from '../features/movies/types';

export const APP_PATHS = {
  main: () => '' as const,
  movie: (movieId: MovieId | ':movieId') => `movie/${movieId}` as const,
  discover: () => 'discover' as const,
  search: () => 'search' as const,
  favorites: () => 'favorites' as const,
};
