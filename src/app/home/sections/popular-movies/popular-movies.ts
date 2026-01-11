import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import uniqBy from 'lodash/uniqBy';
import { MoviesSlider } from '../../../../features/movies/components/movies-slider/movies-slider';
import { usePopularMovieInfiniteListQuery } from '../../../../features/movies/queries';
import { UiSectionHeader } from '../../../../components/ui/headers/ui-section-header/ui-section-header';

@Component({
  selector: 'app-popular-movies',
  imports: [MoviesSlider, UiSectionHeader],
  templateUrl: './popular-movies.html',
  styleUrl: './popular-movies.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopularMovies {
  protected readonly http = inject(HttpClient);

  protected readonly moviesQuery = usePopularMovieInfiniteListQuery(this.http)();

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
