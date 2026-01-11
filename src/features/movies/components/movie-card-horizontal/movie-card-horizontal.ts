import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Movie } from '../../types';
import { Poster } from '../poster/poster';
import { APP_PATHS } from '../../../../app/app.routes.constants';
import { UiLink } from '../../../../components/ui/links/ui-link/ui-link';
import { UiMaskedIcon } from '../../../../components/ui/icons/ui-masked-icon/ui-masked-icon';

@Component({
  selector: 'app-movie-card-horizontal',
  imports: [UiLink, Poster, UiMaskedIcon],
  templateUrl: './movie-card-horizontal.html',
  styleUrl: './movie-card-horizontal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardHorizontal {
  readonly id = input.required<Movie['id']>();
  readonly title = input.required<Movie['title']>();

  readonly baseUrl = input.required<ReturnType<Poster['baseUrl']>>();
  readonly posterPath = input.required<ReturnType<Poster['posterPath']>>();

  protected readonly link = computed(() => '/' + APP_PATHS.movie(this.id()));
}
