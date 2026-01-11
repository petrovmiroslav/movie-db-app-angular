import { computed, Injectable } from '@angular/core';
import { useFavoritesQuery } from '../queries';
import { Favorite } from '../types';

export type FavoritesDict = {
  [key: NonNullable<Favorite['entityId']>]: Favorite | undefined;
};

export const createFavoritesDict = (favoriteList: Favorite[] | undefined): FavoritesDict => {
  const dictionary: FavoritesDict = {};
  favoriteList?.forEach((favorite) => {
    if (favorite.entityId) {
      dictionary[favorite.entityId] = favorite;
    }
  });

  return dictionary;
};

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  protected readonly favoritesQuery = useFavoritesQuery();

  readonly favoritesDict = computed(() => createFavoritesDict(this.favoritesQuery.data()));
}
