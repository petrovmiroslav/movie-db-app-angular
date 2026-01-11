import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import uniqBy from 'lodash/uniqBy';
import { MoviesSlider } from '../../../../features/movies/components/movies-slider/movies-slider';
import { useTopRatedMovieInfiniteListQuery } from '../../../../features/movies/queries';
import { UiSectionHeader } from '../../../../components/ui/headers/ui-section-header/ui-section-header';

@Component({
  selector: 'app-top-rated-movies',
  imports: [MoviesSlider, UiSectionHeader],
  templateUrl: './top-rated-movies.html',
  styleUrl: './top-rated-movies.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopRatedMovies {
  protected readonly http = inject(HttpClient);

  protected readonly moviesQuery = useTopRatedMovieInfiniteListQuery(this.http)();

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
