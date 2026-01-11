import { z } from 'zod';
import { Genre, GenreDtoSchema, GenreId, GenreIdSchema } from '../genres/types';
import { StringDate, StringDateSchema } from '../../utils/types/types';
import { Image, ImageDtoSchema } from '../images/types';

export const MovieIdSchema = z.number().finite().brand<'MovieId'>();
export type MovieId = z.infer<typeof MovieIdSchema>;

const ImdbIdSchema = z.string().brand<'ImdbId'>();
export type ImdbId = z.infer<typeof ImdbIdSchema>;

export enum MovieStatuses {
  RUMORED = 'Rumored',
  PLANNED = 'Planned',
  IN_PRODUCTION = 'In Production',
  POST_PRODUCTION = 'Post Production',
  RELEASED = 'Released',
  CANCELED = 'Canceled',
}

export enum ImagesTypes {
  BACKDROPS = 'backdrops',
  POSTERS = 'posters',
}

export const ImagesOfTheMovieDtoSchema = z
  .object({
    id: MovieIdSchema,
    [ImagesTypes.BACKDROPS]: z.array(ImageDtoSchema),
    [ImagesTypes.POSTERS]: z.array(ImageDtoSchema),
  })
  .partial();

export type ImagesOfTheMovieDto = z.infer<typeof ImagesOfTheMovieDtoSchema>;

export type ImagesOfTheMovie = Partial<{
  id: MovieId;
  [ImagesTypes.BACKDROPS]: Image[];
  [ImagesTypes.POSTERS]: Image[];
}>;

export const MovieDtoSchema = z.object({ id: MovieIdSchema }).merge(
  z
    .object({
      adult: z.boolean(),
      backdrop_path: z.string().nullable(),
      budget: z.number().finite(),
      genres: z.array(GenreDtoSchema),
      genre_ids: z.array(GenreIdSchema),
      homepage: z.string().nullable(),
      images: ImagesOfTheMovieDtoSchema,
      imdb_id: ImdbIdSchema.nullable(),
      original_language: z.string(),
      original_title: z.string(),
      overview: z.string().nullable(),
      popularity: z.number().finite(),
      poster_path: z.string().nullable(),
      release_date: StringDateSchema,
      revenue: z.number().finite(),
      runtime: z.number().finite().nullable(),
      status: z.nativeEnum(MovieStatuses),
      tagline: z.string().nullable(),
      title: z.string(),
      video: z.boolean(),
      vote_average: z.number().finite(),
      vote_count: z.number().finite(),
    })
    .partial(),
);

export type MovieDto = z.infer<typeof MovieDtoSchema>;

export type Movie = { id: MovieId } & Partial<{
  adult: boolean;
  backdropPath: string | null;
  budget: number;
  genres: Genre[];
  genresIds: GenreId[];
  homepage: string | null;
  imdbId: ImdbId | null;
  images: ImagesOfTheMovie;
  originalLanguage: string;
  originalTitle: string;
  overview: string | null;
  popularity: number;
  posterPath: string | null;
  releaseDate: StringDate;
  revenue: number;
  runtime: number | null;
  status: MovieStatuses;
  tagline: string | null;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}>;
