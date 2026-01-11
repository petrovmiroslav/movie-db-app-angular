import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ApiPaths } from '../../../../utils/api/api';
import { paginationDtoMapper, PaginationDtoSchema } from '../../../../utils/pagination/pagination';
import { discoverMovieApiDtoSchema, discoverMovieApiMapper, DiscoverMovieApiParams } from './types';

export const discoverMovieApi = (http: HttpClient) => (params: DiscoverMovieApiParams) =>
  http
    .get(ApiPaths.MoviesApiPaths.discoverMovieApi, {
      params,
    })
    .pipe(
      map((data) =>
        paginationDtoMapper(
          PaginationDtoSchema.extend({ results: discoverMovieApiDtoSchema }).parse(data),
          discoverMovieApiMapper,
        ),
      ),
    );
