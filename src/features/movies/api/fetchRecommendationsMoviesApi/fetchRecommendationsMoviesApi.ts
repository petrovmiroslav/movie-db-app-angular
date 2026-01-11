import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ApiPaths } from '../../../../utils/api/api';
import { paginationDtoMapper, PaginationDtoSchema } from '../../../../utils/pagination/pagination';
import {
  fetchRecommendationsMoviesApiDtoSchema,
  fetchRecommendationsMoviesApiMapper,
  FetchRecommendationsMoviesApiParams,
} from './types';

export const fetchRecommendationsMoviesApi =
  (http: HttpClient) => (params: FetchRecommendationsMoviesApiParams) =>
    http
      .get(ApiPaths.MoviesApiPaths.fetchRecommendationsMoviesApi(params.movieId), {
        params,
      })
      .pipe(
        map((data) =>
          paginationDtoMapper(
            PaginationDtoSchema.extend({ results: fetchRecommendationsMoviesApiDtoSchema }).parse(
              data,
            ),
            fetchRecommendationsMoviesApiMapper,
          ),
        ),
      );
