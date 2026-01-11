import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import uniqBy from 'lodash/uniqBy';
import { ActivatedRoute, Params } from '@angular/router';
import { debounceTime, map } from 'rxjs';
import { useSearchMovieInfiniteListQuery } from '../../../../features/movies/queries';
import {
  WaIntersectionObservee,
  WaIntersectionObserverDirective,
} from '@ng-web-apis/intersection-observer';
import { ResultItem } from './result-item/result-item';
import { ConfigurationService } from '../../../../features/configuration/services/configuration-service';

@Component({
  selector: 'app-results',
  imports: [WaIntersectionObserverDirective, WaIntersectionObservee, ResultItem],
  templateUrl: './results.html',
  styleUrl: './results.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Results {
  protected readonly http = inject(HttpClient);
  protected readonly route = inject(ActivatedRoute);

  protected readonly queryParam = signal('');

  protected getQueryParam(queryParams: Params) {
    return queryParams['q'] ?? '';
  }

  constructor() {
    this.queryParam.set(this.getQueryParam(this.route.snapshot.queryParams));

    this.route.queryParams
      .pipe(
        map((params) => this.getQueryParam(params)),
        debounceTime(300),
      )
      .subscribe((queryParam) => {
        this.queryParam.set(queryParam);
      });
  }

  protected readonly useMoviesQueryParams = computed(() => {
    const queryParam = this.queryParam().trim();
    return queryParam ? { query: queryParam } : null;
  });

  protected readonly moviesQuery = useSearchMovieInfiniteListQuery(this.http)(
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

  protected onIntersection(intersections: IntersectionObserverEntry[]) {
    intersections[0]?.isIntersecting && this.onLoadMore();
  }

  protected readonly configurationService = inject(ConfigurationService);

  protected readonly imageConfiguration = computed(
    () => this.configurationService.configurationQuery.data()?.images ?? {},
  );
}
