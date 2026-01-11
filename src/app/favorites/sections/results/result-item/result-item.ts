import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MovieCardHorizontal } from '../../../../../features/movies/components/movie-card-horizontal/movie-card-horizontal';
import { MovieId } from '../../../../../features/movies/types';
import { TitleMovieCard } from '../../../../../features/movies/components/title-movie-card/title-movie-card';
import { OriginalTitleMovieCard } from '../../../../../features/movies/components/original-title-movie-card/original-title-movie-card';
import {
  convertMinutesToDuration,
  formatDurationToDigitsString,
  getFormattedDateMonthYear,
  getFormattedDateYear,
} from '../../../../../utils/dates/dates';
import { GenresNames } from '../../../../../features/genres/components/genres-names/genres-names';
import { getRoundedVote } from '../../../../../features/movies/utils/utils';
import { Favorite } from '../../../../../features/favorites/types';
import {
  AppendToResponse,
  FetchMovieApiResponse,
} from '../../../../../features/movies/api/fetchMovieApi/types';
import { useMovieQuery } from '../../../../../features/movies/queries';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../../../../../features/configuration/services/configuration-service';

@Component({
  selector: 'app-result-item',
  imports: [MovieCardHorizontal, TitleMovieCard, OriginalTitleMovieCard, GenresNames],
  templateUrl: './result-item.html',
  styleUrl: './result-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultItem {
  protected readonly http = inject(HttpClient);

  readonly entityId = input.required<Favorite['entityId']>();
  readonly date = input.required<Favorite['date']>();

  protected readonly movieId = computed(() => Number(this.entityId()) as MovieId);

  protected readonly useMovieQueryParams = computed(() => {
    const movieId = this.movieId();

    return movieId ? { movieId, includes: [AppendToResponse.IMAGES] } : null;
  });

  protected readonly movieQuery = useMovieQuery(this.http)(this.useMovieQueryParams);

  protected readonly movieData = computed<Partial<FetchMovieApiResponse>>(
    () => this.movieQuery.data() ?? {},
  );

  protected readonly releaseDateFormatted = computed(
    () => getFormattedDateYear(this.movieData().releaseDate) ?? '',
  );

  protected readonly roundedVote = computed(() => {
    const voteAverage = this.movieData().voteAverage;
    return voteAverage !== undefined ? getRoundedVote(voteAverage) : undefined;
  });

  protected readonly formattedDuration = computed(() => {
    const runtime = this.movieData().runtime;
    if (runtime === null || runtime === undefined) return '';
    return formatDurationToDigitsString(convertMinutesToDuration(runtime));
  });

  protected readonly formattedFavoriteDate = computed(() => getFormattedDateMonthYear(this.date()));

  protected readonly configurationService = inject(ConfigurationService);

  protected readonly imageConfiguration = computed(
    () => this.configurationService.configurationQuery.data()?.images ?? {},
  );
}
