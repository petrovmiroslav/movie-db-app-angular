import { Signal } from '@angular/core';
import {
  CreateMutationOptions,
  injectMutation,
  injectQuery,
  QueryClient,
  queryOptions,
} from '@tanstack/angular-query-experimental';
import { fetchFavoritesApi } from './api/fetchFavoritesApi/fetchFavoritesApi';
import { addToFavoritesApi } from './api/addToFavoritesApi/addToFavoritesApi';
import { removeFromFavoritesApi } from './api/removeFromFavoritesApi/removeFromFavoritesApi';

export const favoritesQueries = {
  _def: ['favorites'],
  list: () => {
    return queryOptions({
      queryKey: [...favoritesQueries._def, 'list'] as const,
      queryFn: fetchFavoritesApi,
    });
  },
} as const;

export const useFavoritesQuery = () => injectQuery(() => favoritesQueries.list());

export const useAddToFavoritesMutation =
  (queryClient: QueryClient) =>
  (
    options?: Signal<
      CreateMutationOptions<
        Awaited<ReturnType<typeof addToFavoritesApi>>,
        Error,
        Parameters<typeof addToFavoritesApi>[0],
        unknown
      >
    >,
  ) =>
    injectMutation(() => ({
      ...options?.(),
      mutationFn: addToFavoritesApi,
      onSuccess: async (...args) => {
        await queryClient.invalidateQueries({ queryKey: favoritesQueries._def });
        return options?.().onSuccess?.(...args);
      },
    }));

export const useRemoveFromFavoritesMutation =
  (queryClient: QueryClient) =>
  (
    options?: Signal<
      CreateMutationOptions<
        Awaited<ReturnType<typeof removeFromFavoritesApi>>,
        Error,
        Parameters<typeof removeFromFavoritesApi>[0],
        unknown
      >
    >,
  ) =>
    injectMutation(() => ({
      ...options?.(),
      mutationFn: removeFromFavoritesApi,
      onSuccess: async (...args) => {
        await queryClient.invalidateQueries({ queryKey: favoritesQueries._def });
        return options?.().onSuccess?.(...args);
      },
    }));
