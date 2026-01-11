import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import uniqBy from 'lodash/uniqBy';
import { HttpClient } from '@angular/common/http';
import { UiSectionHeader } from '../../../../../components/ui/headers/ui-section-header/ui-section-header';
import { useSimilarMovieInfiniteListQuery } from '../../../../../features/movies/queries';
import { MovieId } from '../../../../../features/movies/types';
import { MoviesSlider } from '../../../../../features/movies/components/movies-slider/movies-slider';

@Component({
  selector: 'app-similar-movies-slider',
  imports: [UiSectionHeader, MoviesSlider],
  templateUrl: './similar-movies-slider.html',
  styleUrl: './similar-movies-slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimilarMoviesSlider {
  protected readonly http = inject(HttpClient);

  readonly movieId = input.required<MovieId | undefined>();

  protected readonly useMoviesQueryParams = computed(() => {
    const movieId = this.movieId();
    return movieId && { movieId };
  });

  protected readonly moviesQuery = useSimilarMovieInfiniteListQuery(this.http)(
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
