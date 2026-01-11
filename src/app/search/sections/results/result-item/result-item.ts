import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MovieCardHorizontal } from '../../../../../features/movies/components/movie-card-horizontal/movie-card-horizontal';
import { Movie } from '../../../../../features/movies/types';
import { TitleMovieCard } from '../../../../../features/movies/components/title-movie-card/title-movie-card';
import { OriginalTitleMovieCard } from '../../../../../features/movies/components/original-title-movie-card/original-title-movie-card';
import { getFormattedDateYear } from '../../../../../utils/dates/dates';
import { GenresNames } from '../../../../../features/genres/components/genres-names/genres-names';
import { getRoundedVote } from '../../../../../features/movies/utils/utils';

@Component({
  selector: 'app-result-item',
  imports: [MovieCardHorizontal, TitleMovieCard, OriginalTitleMovieCard, GenresNames],
  templateUrl: './result-item.html',
  styleUrl: './result-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultItem {
  readonly id = input.required<Movie['id']>();
  readonly title = input.required<Movie['title']>();
  readonly originalTitle = input.required<Movie['originalTitle']>();
  readonly releaseDate = input.required<Movie['releaseDate']>();
  readonly voteAverage = input.required<Movie['voteAverage']>();

  readonly baseUrl = input.required<ReturnType<MovieCardHorizontal['baseUrl']>>();
  readonly posterPath = input.required<ReturnType<MovieCardHorizontal['posterPath']>>();

  readonly genreList = input.required<ReturnType<GenresNames['genreList']>>();
  readonly genreIdList = input.required<ReturnType<GenresNames['genreIdList']>>();

  protected readonly releaseDateFormatted = computed(
    () => getFormattedDateYear(this.releaseDate()) ?? '',
  );

  protected readonly roundedVote = computed(() => {
    const voteAverage = this.voteAverage();
    return voteAverage !== undefined ? getRoundedVote(voteAverage) : undefined;
  });
}
