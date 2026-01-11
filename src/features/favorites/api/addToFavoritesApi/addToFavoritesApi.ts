import { z } from 'zod';
import { AddToFavoritesApiParams } from './types';
import {
  AsyncStorageKeys,
  getAsyncStorageData,
  setAsyncStorageData,
} from '../../../../utils/asyncStorage/asyncStorage';
import { favoriteDtoSchema } from '../../types';
import { getRandomId } from '../../../../utils/entities/entities';
import { StringDate } from '../../../../utils/types/types';

export const addToFavoritesApi = async (params: AddToFavoritesApiParams): Promise<void> => {
  if (params.entityId === undefined)
    throw new Error('Error: addToFavoritesAPi. entityId === undefined');

  const maybeFavorites = await getAsyncStorageData(AsyncStorageKeys.FAVORITES);

  const favoritesList = z.array(favoriteDtoSchema).parse(maybeFavorites ?? []);

  if (
    favoritesList.some(
      (favorite) => favorite.type === params.type && favorite.entity_id === params.entityId,
    )
  ) {
    throw new Error('Error: addToFavoritesAPi. favorite was already added');
  }

  favoritesList.unshift({
    id: getRandomId(),
    type: params.type,
    entity_id: params.entityId,
    date: new Date().toISOString() as StringDate,
  });

  await setAsyncStorageData(AsyncStorageKeys.FAVORITES, favoritesList);
};
