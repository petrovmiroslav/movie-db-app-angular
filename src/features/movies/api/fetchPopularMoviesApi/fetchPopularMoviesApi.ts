import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ApiPaths } from '../../../../utils/api/api';
import {
  fetchPopularMoviesApiDtoSchema,
  fetchPopularMoviesApiMapper,
  FetchPopularMoviesApiParams,
} from './types';
import { paginationDtoMapper, PaginationDtoSchema } from '../../../../utils/pagination/pagination';

export const fetchPopularMoviesApi = (http: HttpClient) => (params: FetchPopularMoviesApiParams) =>
  http
    .get(ApiPaths.MoviesApiPaths.fetchPopularMoviesApi, {
      params,
    })
    .pipe(
      map((data) =>
        paginationDtoMapper(
          PaginationDtoSchema.extend({ results: fetchPopularMoviesApiDtoSchema }).parse(data),
          fetchPopularMoviesApiMapper,
        ),
      ),
    );
