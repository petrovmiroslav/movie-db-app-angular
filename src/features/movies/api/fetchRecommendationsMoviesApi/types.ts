import { z } from 'zod';
import { Movie, MovieDtoSchema, MovieId } from '../../types';
import { moviesDtoMappers } from '../../mappers';
import { PaginationApiParams } from '../../../../utils/pagination/pagination';

export type FetchRecommendationsMoviesApiParams = {
  movieId: MovieId;
} & PaginationApiParams;

export const fetchRecommendationsMoviesApiDtoSchema = z.array(
  MovieDtoSchema.pick({
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
  }),
);

export type FetchRecommendationsMoviesApiDto = z.infer<
  typeof fetchRecommendationsMoviesApiDtoSchema
>;

export const fetchRecommendationsMoviesApiMapper = (
  dto: FetchRecommendationsMoviesApiDto | undefined,
): FetchRecommendationsMoviesApiResponse =>
  dto?.map((movieDto) => ({
    ...moviesDtoMappers.id(movieDto),
    ...moviesDtoMappers.backdropPath(movieDto),
    ...moviesDtoMappers.genres(movieDto),
    ...moviesDtoMappers.genresIds(movieDto),
    ...moviesDtoMappers.images(movieDto),
    ...moviesDtoMappers.originalTitle(movieDto),
    ...moviesDtoMappers.overview(movieDto),
    ...moviesDtoMappers.popularity(movieDto),
    ...moviesDtoMappers.posterPath(movieDto),
    ...moviesDtoMappers.releaseDate(movieDto),
    ...moviesDtoMappers.runtime(movieDto),
    ...moviesDtoMappers.tagline(movieDto),
    ...moviesDtoMappers.title(movieDto),
    ...moviesDtoMappers.voteAverage(movieDto),
    ...moviesDtoMappers.voteCount(movieDto),
  }));

export type FetchRecommendationsMoviesApiResponse =
  | Array<
      Pick<
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
      >
    >
  | undefined;
