import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import uniqBy from 'lodash/uniqBy';
import { UiSectionHeader } from '../../../../../components/ui/headers/ui-section-header/ui-section-header';
import { useRecommendationsMovieInfiniteListQuery } from '../../../../../features/movies/queries';
import { MovieId } from '../../../../../features/movies/types';
import { MoviesSlider } from '../../../../../features/movies/components/movies-slider/movies-slider';

@Component({
  selector: 'app-recommendations-movies-slider',
  imports: [UiSectionHeader, MoviesSlider],
  templateUrl: './recommendations-movies-slider.html',
  styleUrl: './recommendations-movies-slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationsMoviesSlider {
  protected readonly http = inject(HttpClient);

  readonly movieId = input.required<MovieId | undefined>();

  protected readonly useMoviesQueryParams = computed(() => {
    const movieId = this.movieId();
    return movieId && { movieId };
  });

  protected readonly moviesQuery = useRecommendationsMovieInfiniteListQuery(this.http)(
    this.useMoviesQueryParams,
  );

  protected readonly moviesList = computed(() => {
    const pages = this.moviesQuery.data()?.pages;
    if (!pages?.length) return;

    const list = pages?.flatMap((page) => page?.results ?? []);

    return list && uniqBy(list, (movie) => movie.id);
  });

  protected onLoadMore() {
    this.moviesQuery.hasNextPage() &&
      !this.moviesQuery.isFetching() &&
      this.moviesQuery.fetchNextPage();
  }
}
