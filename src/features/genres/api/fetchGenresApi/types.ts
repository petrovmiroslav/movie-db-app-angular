import { z } from 'zod';
import { Genre, GenreDtoSchema } from '../../types';
import { genresDtoMappers } from '../../mappers';

export const fetchGenresApiDtoSchema = z
  .object({
    genres: z.array(GenreDtoSchema.pick({ id: true, name: true })),
  })
  .partial();

export type FetchGenresApiDto = z.infer<typeof fetchGenresApiDtoSchema>;

export const fetchGenresApiMapper = (dto: FetchGenresApiDto): FetchGenresApiResponse => ({
  genres: dto.genres?.map((genreDto) => ({
    ...genresDtoMappers.id(genreDto),
    ...genresDtoMappers.name(genreDto),
  })),
});

export type FetchGenresApiResponse = Partial<{ genres: Array<Pick<Genre, 'id' | 'name'>> }>;
