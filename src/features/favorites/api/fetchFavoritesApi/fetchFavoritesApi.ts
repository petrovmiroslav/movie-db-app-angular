import { fetchFavoritesApiDtoSchema, fetchFavoritesApiMapper } from './types';
import { AsyncStorageKeys, getAsyncStorageData } from '../../../../utils/asyncStorage/asyncStorage';
import { FavoriteDto } from '../../types';

export const fetchFavoritesApi = () =>
  getAsyncStorageData(AsyncStorageKeys.FAVORITES)
    .then((favorites): { data: FavoriteDto[] } => {
      return {
        data: fetchFavoritesApiDtoSchema.parse(favorites ?? []),
      };
    })
    .then(({ data }) => fetchFavoritesApiMapper(data));
