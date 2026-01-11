import { z } from 'zod';
import { RemoveFromFavoritesApiParams } from './types';
import {
  AsyncStorageKeys,
  getAsyncStorageData,
  setAsyncStorageData,
} from '../../../../utils/asyncStorage/asyncStorage';
import { favoriteDtoSchema } from '../../types';

export const removeFromFavoritesApi = async (
  params: RemoveFromFavoritesApiParams,
): Promise<void> => {
  const maybeFavorites = await getAsyncStorageData(AsyncStorageKeys.FAVORITES);

  const favoritesList = z.array(favoriteDtoSchema).parse(maybeFavorites ?? []);

  const newFavorites = favoritesList.filter((favorite) => favorite.id !== params.id);

  await setAsyncStorageData(AsyncStorageKeys.FAVORITES, newFavorites);
};
