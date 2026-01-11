import { ImagesOfTheMovieDto, ImagesTypes, MovieDto } from './types';
import { imagesDtoMappers } from '../images/mappers';
import { genresDtoMappers } from '../genres/mappers';

export const imagesOfTheMovieDtoMappers = {
  id: (dto: Pick<ImagesOfTheMovieDto, 'id'>) => ({
    id: dto.id,
  }),
  [ImagesTypes.BACKDROPS]: (dto: Pick<ImagesOfTheMovieDto, ImagesTypes.BACKDROPS>) => ({
    [ImagesTypes.BACKDROPS]: dto[ImagesTypes.BACKDROPS]?.map((imageDto) => ({
      ...imagesDtoMappers.id(imageDto),
      ...imagesDtoMappers.filePath(imageDto),
      ...imagesDtoMappers.aspectRatio(imageDto),
      ...imagesDtoMappers.width(imageDto),
      ...imagesDtoMappers.height(imageDto),
      ...imagesDtoMappers.voteCount(imageDto),
      ...imagesDtoMappers.voteAverage(imageDto),
    })),
  }),
  [ImagesTypes.POSTERS]: (dto: Pick<ImagesOfTheMovieDto, ImagesTypes.POSTERS>) => ({
    [ImagesTypes.POSTERS]: dto[ImagesTypes.POSTERS]?.map((imageDto) => ({
      ...imagesDtoMappers.id(imageDto),
      ...imagesDtoMappers.filePath(imageDto),
      ...imagesDtoMappers.aspectRatio(imageDto),
      ...imagesDtoMappers.width(imageDto),
      ...imagesDtoMappers.height(imageDto),
      ...imagesDtoMappers.voteCount(imageDto),
      ...imagesDtoMappers.voteAverage(imageDto),
    })),
  }),
};

export const moviesDtoMappers = {
  id: (dto: Pick<MovieDto, 'id'>) => ({
    id: dto.id,
  }),
  adult: (dto: Pick<MovieDto, 'adult'>) => ({
    adult: dto.adult,
  }),
  backdropPath: (dto: Pick<MovieDto, 'backdrop_path'>) => ({
    backdropPath: dto.backdrop_path,
  }),
  budget: (dto: Pick<MovieDto, 'budget'>) => ({
    budget: dto.budget,
  }),
  genresIds: (dto: Pick<MovieDto, 'genre_ids'>) => ({
    genresIds: dto.genre_ids,
  }),
  genres: (dto: Pick<MovieDto, 'genres'>) => ({
    genres: dto.genres?.map((genreDto) => ({
      ...genresDtoMappers.id(genreDto),
      ...genresDtoMappers.name(genreDto),
    })),
  }),
  homepage: (dto: Pick<MovieDto, 'homepage'>) => ({
    homepage: dto.homepage,
  }),
  imdbId: (dto: Pick<MovieDto, 'imdb_id'>) => ({
    imdbId: dto.imdb_id,
  }),
  images: (dto: Pick<MovieDto, 'images'>) => ({
    images: dto.images && {
      ...imagesOfTheMovieDtoMappers.id(dto.images),
      ...imagesOfTheMovieDtoMappers[ImagesTypes.BACKDROPS](dto.images),
      ...imagesOfTheMovieDtoMappers[ImagesTypes.POSTERS](dto.images),
    },
  }),
  originalLanguage: (dto: Pick<MovieDto, 'original_language'>) => ({
    originalLanguage: dto.original_language,
  }),
  originalTitle: (dto: Pick<MovieDto, 'original_title'>) => ({
    originalTitle: dto.original_title,
  }),
  overview: (dto: Pick<MovieDto, 'overview'>) => ({
    overview: dto.overview,
  }),
  popularity: (dto: Pick<MovieDto, 'popularity'>) => ({
    popularity: dto.popularity,
  }),
  posterPath: (dto: Pick<MovieDto, 'poster_path'>) => ({
    posterPath: dto.poster_path,
  }),
  releaseDate: (dto: Pick<MovieDto, 'release_date'>) => ({
    releaseDate: dto.release_date,
  }),
  revenue: (dto: Pick<MovieDto, 'revenue'>) => ({
    revenue: dto.revenue,
  }),
  runtime: (dto: Pick<MovieDto, 'runtime'>) => ({
    runtime: dto.runtime,
  }),
  status: (dto: Pick<MovieDto, 'status'>) => ({
    status: dto.status,
  }),
  tagline: (dto: Pick<MovieDto, 'tagline'>) => ({
    tagline: dto.tagline,
  }),
  title: (dto: Pick<MovieDto, 'title'>) => ({
    title: dto.title,
  }),
  video: (dto: Pick<MovieDto, 'video'>) => ({
    video: dto.video,
  }),
  voteAverage: (dto: Pick<MovieDto, 'vote_average'>) => ({
    voteAverage: dto.vote_average,
  }),
  voteCount: (dto: Pick<MovieDto, 'vote_count'>) => ({
    voteCount: dto.vote_count,
  }),
};
