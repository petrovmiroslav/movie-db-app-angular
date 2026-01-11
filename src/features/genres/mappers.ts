import { GenreDto } from './types';

export const genresDtoMappers = {
  id: (dto: Pick<GenreDto, 'id'>) => ({
    id: dto.id,
  }),
  name: (dto: Pick<GenreDto, 'name'>) => ({
    name: dto.name,
  }),
};
