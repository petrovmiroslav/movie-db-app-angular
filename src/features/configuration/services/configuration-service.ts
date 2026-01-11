import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { useConfigurationQuery } from '../queries';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  protected readonly http = inject(HttpClient);

  readonly configurationQuery = useConfigurationQuery(this.http);
}
