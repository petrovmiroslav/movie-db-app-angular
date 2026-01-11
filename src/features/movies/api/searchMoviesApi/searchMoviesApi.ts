import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ApiPaths } from '../../../../utils/api/api';
import { paginationDtoMapper, PaginationDtoSchema } from '../../../../utils/pagination/pagination';
import { searchMoviesApiDtoSchema, searchMoviesApiMapper, SearchMoviesApiParams } from './types';

export const searchMoviesApi = (http: HttpClient) => (params: SearchMoviesApiParams) =>
  http
    .get(ApiPaths.MoviesApiPaths.searchMoviesApi, {
      params,
    })
    .pipe(
      map((data) =>
        paginationDtoMapper(
          PaginationDtoSchema.extend({ results: searchMoviesApiDtoSchema }).parse(data),
          searchMoviesApiMapper,
        ),
      ),
    );
