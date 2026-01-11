import { FavoriteDto } from './types';

export const favoritesDtoMappers = {
  id: (dto: Pick<FavoriteDto, 'id'>) => ({
    id: dto.id,
  }),
  type: (dto: Pick<FavoriteDto, 'type'>) => ({
    type: dto.type,
  }),
  entityId: (dto: Pick<FavoriteDto, 'entity_id'>) => ({
    entityId: dto.entity_id,
  }),
  date: (dto: Pick<FavoriteDto, 'date'>) => ({
    date: dto.date,
  }),
};
