import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ApiPaths } from '../../../../utils/api/api';
import {
  fetchTopRatedMoviesApiDtoSchema,
  fetchTopRatedMoviesApiMapper,
  FetchTopRatedMoviesApiParams,
} from './types';
import { paginationDtoMapper, PaginationDtoSchema } from '../../../../utils/pagination/pagination';

export const fetchTopRatedMoviesApi =
  (http: HttpClient) => (params: FetchTopRatedMoviesApiParams) =>
    http
      .get(ApiPaths.MoviesApiPaths.fetchTopRatedMoviesApi, {
        params,
      })
      .pipe(
        map((data) =>
          paginationDtoMapper(
            PaginationDtoSchema.extend({ results: fetchTopRatedMoviesApiDtoSchema }).parse(data),
            fetchTopRatedMoviesApiMapper,
          ),
        ),
      );
