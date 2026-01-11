import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UiSectionHeader } from '../../../../components/ui/headers/ui-section-header/ui-section-header';
import { UiLink } from '../../../../components/ui/links/ui-link/ui-link';
import { useGenreListQuery } from '../../../../features/genres/queries';
import { APP_PATHS } from '../../../app.routes.constants';

@Component({
  selector: 'app-genres-slider',
  imports: [UiSectionHeader, UiLink],
  templateUrl: './genres-slider.html',
  styleUrl: './genres-slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenresSlider {
  protected readonly http = inject(HttpClient);

  protected readonly genreListQuery = useGenreListQuery(this.http);
  protected readonly APP_PATHS = APP_PATHS;
}
