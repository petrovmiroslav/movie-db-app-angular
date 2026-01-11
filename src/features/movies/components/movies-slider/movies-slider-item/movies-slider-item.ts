import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Movie } from '../../../types';
import { Poster } from '../../poster/poster';
import { GenresNames } from '../../../../genres/components/genres-names/genres-names';
import { UiLink } from '../../../../../components/ui/links/ui-link/ui-link';
import { TitleMovieCard } from '../../title-movie-card/title-movie-card';
import { getRoundedVote } from '../../../utils/utils';
import { APP_PATHS } from '../../../../../app/app.routes.constants';

@Component({
  selector: 'app-movies-slider-item',
  imports: [UiLink, Poster, TitleMovieCard, GenresNames],
  templateUrl: './movies-slider-item.html',
  styleUrl: './movies-slider-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesSliderItem {
  readonly id = input.required<Movie['id']>();
  readonly title = input.required<Movie['title']>();
  readonly voteAverage = input.required<Movie['voteAverage']>();

  readonly baseUrl = input.required<ReturnType<Poster['baseUrl']>>();
  readonly posterPath = input.required<ReturnType<Poster['posterPath']>>();

  readonly genreList = input.required<ReturnType<GenresNames['genreList']>>();
  readonly genreIdList = input.required<ReturnType<GenresNames['genreIdList']>>();

  protected readonly roundedVote = computed(() => {
    const voteAverage = this.voteAverage();
    if (voteAverage === undefined) return;

    return getRoundedVote(voteAverage);
  });

  protected readonly link = computed(() => '/' + APP_PATHS.movie(this.id()));
}
