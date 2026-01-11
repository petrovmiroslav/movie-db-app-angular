import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ApiPaths } from '../../../../utils/api/api';
import { fetchConfigurationApiDtoSchema, fetchConfigurationApiMapper } from './types';

export const fetchConfigurationApi = (http: HttpClient) => () =>
  http
    .get(ApiPaths.ConfigurationApiPaths.fetchConfigurationApi)
    .pipe(map((data) => fetchConfigurationApiMapper(fetchConfigurationApiDtoSchema.parse(data))));
