import { z } from 'zod';
import { Favorite, favoriteDtoSchema } from '../../types';
import { favoritesDtoMappers } from '../../mappers';

export const fetchFavoritesApiDtoSchema = z.array(
  favoriteDtoSchema.pick({
    id: true,
    type: true,
    entity_id: true,
    date: true,
  }),
);

export type FetchFavoritesApiDto = z.infer<typeof fetchFavoritesApiDtoSchema>;

export const fetchFavoritesApiMapper = (dto: FetchFavoritesApiDto): FetchFavoritesApiResponse =>
  dto.map((favoriteDto) => ({
    ...favoritesDtoMappers.id(favoriteDto),
    ...favoritesDtoMappers.type(favoriteDto),
    ...favoritesDtoMappers.entityId(favoriteDto),
    ...favoritesDtoMappers.date(favoriteDto),
  }));

export type FetchFavoritesApiResponse = Array<Pick<Favorite, 'id' | 'type' | 'entityId' | 'date'>>;
