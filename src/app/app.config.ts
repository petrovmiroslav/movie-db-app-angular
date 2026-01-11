import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideClientHydration,
  withEventReplay,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { apiInterceptor } from '../utils/api/interseptors';
import { queryClientConfig } from '../utils/reactQuery/config';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(
      withEventReplay(),
      withHttpTransferCacheOptions({
        includeRequestsWithAuthHeaders: true,
      }),
    ),
    provideHttpClient(withFetch(), withInterceptors([apiInterceptor])),
    provideTanStackQuery(new QueryClient({ defaultOptions: queryClientConfig })),
  ],
};
