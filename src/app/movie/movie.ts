import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieId } from '../../features/movies/types';
import { useMovieQuery } from '../../features/movies/queries';
import { HttpClient } from '@angular/common/http';
import {
  AppendToResponse,
  FetchMovieApiResponse,
} from '../../features/movies/api/fetchMovieApi/types';
import { Content } from './sections/content/content';
import { Header } from './sections/header/header';
import { throttle } from '../../utils/functions/functions';
import { Hero } from './sections/hero/hero';
import { SEOService } from '../../services/seoservice/seoservice';

@Component({
  selector: 'app-movie',
  imports: [Content, Header, Hero],
  templateUrl: './movie.html',
  styleUrl: './movie.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Movie {
  protected readonly http = inject(HttpClient);
  protected readonly route = inject(ActivatedRoute);
  protected readonly SEOService = inject(SEOService);

  protected readonly movieId = signal<MovieId | null>(null);

  constructor() {
    this.route.params.subscribe((params) => {
      this.movieId.set(params['movieId']);
    });

    effect(() => {
      const title = this.movieData().title;
      if (!title) return;
      this.SEOService.updateTitle(title);
    });
  }

  protected readonly useMovieQueryParams = computed(() => {
    const movieId = this.movieId();
    return movieId && { movieId, includes: [AppendToResponse.IMAGES] };
  });

  protected readonly movieQuery = useMovieQuery(this.http)(this.useMovieQueryParams);

  protected readonly movieData = computed<Partial<FetchMovieApiResponse>>(
    () => this.movieQuery.data() ?? {},
  );

  protected readonly scrollY = signal(0);
  protected readonly heroImageVisibleHeight = signal(0);

  protected readonly scrollHandler = throttle(() => {
    this.scrollY.set(window.scrollY);
  }, 16);

  protected ngOnInit() {
    if (typeof window === 'undefined') return;
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  protected ngOnDestroy() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('scroll', this.scrollHandler);
  }
}
