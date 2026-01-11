import { z } from 'zod';
import { Movie, MovieDtoSchema, MovieId } from '../../types';
import { moviesDtoMappers } from '../../mappers';

export enum AppendToResponse {
  IMAGES = 'images',
}

export type FetchMovieApiParams = {
  movieId: MovieId;
  includes?: AppendToResponse[];
};

export const fetchMovieApiDtoSchema = MovieDtoSchema.pick({
  id: true,
  backdrop_path: true,
  genres: true,
  genre_ids: true,
  images: true,
  original_title: true,
  overview: true,
  popularity: true,
  poster_path: true,
  release_date: true,
  runtime: true,
  tagline: true,
  title: true,
  vote_average: true,
  vote_count: true,
});

export type FetchMovieApiDto = z.infer<typeof fetchMovieApiDtoSchema>;

export const fetchMovieApiMapper = (dto: FetchMovieApiDto): FetchMovieApiResponse => ({
  ...moviesDtoMappers.id(dto),
  ...moviesDtoMappers.backdropPath(dto),
  ...moviesDtoMappers.genres(dto),
  ...moviesDtoMappers.genresIds(dto),
  ...moviesDtoMappers.images(dto),
  ...moviesDtoMappers.originalTitle(dto),
  ...moviesDtoMappers.overview(dto),
  ...moviesDtoMappers.popularity(dto),
  ...moviesDtoMappers.posterPath(dto),
  ...moviesDtoMappers.releaseDate(dto),
  ...moviesDtoMappers.runtime(dto),
  ...moviesDtoMappers.tagline(dto),
  ...moviesDtoMappers.title(dto),
  ...moviesDtoMappers.voteAverage(dto),
  ...moviesDtoMappers.voteCount(dto),
});

export type FetchMovieApiResponse = Pick<
  Movie,
  | 'id'
  | 'backdropPath'
  | 'genres'
  | 'genresIds'
  | 'images'
  | 'originalTitle'
  | 'overview'
  | 'popularity'
  | 'posterPath'
  | 'releaseDate'
  | 'runtime'
  | 'tagline'
  | 'title'
  | 'voteAverage'
  | 'voteCount'
>;
