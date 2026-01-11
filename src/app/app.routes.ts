import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PageLayout } from '../layouts/page-layout/page-layout';
import { APP_PATHS } from './app.routes.constants';

export const routes: Routes = [
  {
    path: APP_PATHS.main(),
    component: PageLayout,
    children: [
      { path: '', component: Home, pathMatch: 'full' },
      {
        path: APP_PATHS.movie(':movieId'),
        loadComponent: () => import('./movie/movie').then((m) => m.Movie),
      },
      {
        path: APP_PATHS.search(),
        loadComponent: () => import('./search/search').then((m) => m.Search),
      },
      {
        path: APP_PATHS.discover(),
        loadComponent: () => import('./discover/discover').then((m) => m.Discover),
      },
      {
        path: APP_PATHS.favorites(),
        loadComponent: () => import('./favorites/favorites').then((m) => m.Favorites),
      },
    ],
  },
];
