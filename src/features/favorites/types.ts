import { z } from 'zod';
import { StringDate, StringDateSchema } from '../../utils/types/types';

const FavoriteIdSchema = z.string().brand<'FavoriteId'>();
export type FavoriteId = z.infer<typeof FavoriteIdSchema>;

export enum FavoritesTypes {
  MOVIE = 'movie',
}

export const favoriteDtoSchema = z
  .object({
    id: FavoriteIdSchema,
  })
  .merge(
    z
      .object({
        type: z.nativeEnum(FavoritesTypes),
        entity_id: z.number().finite().or(z.string()),
        date: StringDateSchema,
      })
      .partial(),
  );

export type FavoriteDto = z.infer<typeof favoriteDtoSchema>;

export type Favorite = { id: FavoriteId } & Partial<{
  type: FavoritesTypes;
  entityId: number | string;
  date: StringDate;
}>;
