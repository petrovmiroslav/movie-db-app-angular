import { injectQuery, queryOptions } from '@tanstack/angular-query-experimental';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { fetchGenresApi } from './api/fetchGenresApi/fetchGenresApi';

export const genresQueries = {
  _def: ['genres'],
  list: (http: HttpClient) =>
    queryOptions({
      queryKey: [...genresQueries._def, 'list'] as const,
      queryFn: () => lastValueFrom(fetchGenresApi(http)()),
      staleTime: Infinity,
    }),
} as const;

export const useGenreListQuery = (http: HttpClient) => injectQuery(() => genresQueries.list(http));
