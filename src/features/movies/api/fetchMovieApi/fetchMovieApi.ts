import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ApiPaths, DEFAULT_INCLUDE_LANGUAGE_PARAM } from '../../../../utils/api/api';
import { fetchMovieApiDtoSchema, fetchMovieApiMapper, FetchMovieApiParams } from './types';

export const fetchMovieApi = (http: HttpClient) => (params: FetchMovieApiParams) =>
  http
    .get(ApiPaths.MoviesApiPaths.fetchMovieApi(params.movieId), {
      params: {
        append_to_response: params.includes?.join() ?? '',
        include_image_language: params.includes ? DEFAULT_INCLUDE_LANGUAGE_PARAM : '',
      },
    })
    .pipe(map((data) => fetchMovieApiMapper(fetchMovieApiDtoSchema.parse(data))));
