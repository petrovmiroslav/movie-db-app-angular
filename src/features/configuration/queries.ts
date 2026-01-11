import { injectQuery, queryOptions } from '@tanstack/angular-query-experimental';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { fetchConfigurationApi } from './api/fetchConfigurationApi/fetchConfigurationApi';

export const configurationQueries = {
  _def: ['configuration'],
  configuration: (http: HttpClient) =>
    queryOptions({
      queryKey: [...configurationQueries._def, 'configuration'] as const,
      queryFn: () => lastValueFrom(fetchConfigurationApi(http)()),
      staleTime: Infinity,
    }),
} as const;

export const useConfigurationQuery = (http: HttpClient) =>
  injectQuery(() => configurationQueries.configuration(http));
