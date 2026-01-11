import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ApiPaths } from '../../../../utils/api/api';
import { fetchGenresApiDtoSchema, fetchGenresApiMapper } from './types';

export const fetchGenresApi = (http: HttpClient) => () =>
  http
    .get(ApiPaths.GenresApiPaths.fetchGenresApi)
    .pipe(map((data) => fetchGenresApiMapper(fetchGenresApiDtoSchema.parse(data))));
