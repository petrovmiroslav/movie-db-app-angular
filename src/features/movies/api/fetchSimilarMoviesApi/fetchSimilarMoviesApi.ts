import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ApiPaths } from '../../../../utils/api/api';
import { paginationDtoMapper, PaginationDtoSchema } from '../../../../utils/pagination/pagination';
import {
  fetchSimilarMoviesApiDtoSchema,
  fetchSimilarMoviesApiMapper,
  FetchSimilarMoviesApiParams,
} from './types';

export const fetchSimilarMoviesApi = (http: HttpClient) => (params: FetchSimilarMoviesApiParams) =>
  http
    .get(ApiPaths.MoviesApiPaths.fetchSimilarMoviesApi(params.movieId), {
      params,
    })
    .pipe(
      map((data) =>
        paginationDtoMapper(
          PaginationDtoSchema.extend({ results: fetchSimilarMoviesApiDtoSchema }).parse(data),
          fetchSimilarMoviesApiMapper,
        ),
      ),
    );
