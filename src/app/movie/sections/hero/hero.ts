import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  model,
  viewChild,
} from '@angular/core';
import { ImageComponent } from '../../../../features/images/components/image/image';
import { Movie } from '../../../../features/movies/types';
import { getRoundedVote } from '../../../../features/movies/utils/utils';
import {
  convertMinutesToDuration,
  formatDurationToString,
  getFormattedDateYear,
} from '../../../../utils/dates/dates';
import { createInterpolation } from '../../../../utils/interpolate/interpolate';
import { ConfigurationService } from '../../../../features/configuration/services/configuration-service';
import { WindowSizeService } from '../../../../services/window-size-service/window-size-service';
import { GenresNames } from '../../../../features/genres/components/genres-names/genres-names';
import { FavoriteButton } from '../../../../features/favorites/components/favorite-button/favorite-button';

const HERO_IMAGE_MAX_SCALE_VALUE = 1.5;
const HERO_IMAGE_MIN_SCALE_VALUE = 1;

@Component({
  selector: 'app-hero',
  imports: [ImageComponent, GenresNames, FavoriteButton],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'hero',
  },
})
export class Hero {
  readonly scrollY = input.required<number>();
  readonly heroImageVisibleHeight = model.required<number>();

  readonly id = input.required<Movie['id']>();
  readonly title = input.required<Movie['title']>();
  readonly originalTitle = input.required<Movie['originalTitle']>();
  readonly voteAverage = input.required<Movie['voteAverage']>();
  readonly backdropPath = input.required<Movie['backdropPath']>();
  readonly releaseDate = input.required<Movie['releaseDate']>();
  readonly runtime = input.required<Movie['runtime']>();
  readonly genreList = input.required<ReturnType<GenresNames['genreList']>>();
  readonly genreIdList = input.required<ReturnType<GenresNames['genreIdList']>>();

  protected readonly configurationService = inject(ConfigurationService);

  protected readonly imageConfiguration = computed(
    () => this.configurationService.configurationQuery.data()?.images ?? {},
  );

  protected readonly roundedVote = computed(() => {
    const voteAverage = this.voteAverage();
    return voteAverage !== undefined ? getRoundedVote(voteAverage) : undefined;
  });

  protected readonly releaseDateFormatted = computed(
    () => getFormattedDateYear(this.releaseDate()) ?? '',
  );

  protected readonly formattedDuration = computed(() => {
    const runtime = this.runtime();
    if (runtime === null || runtime === undefined) return '';
    return formatDurationToString(convertMinutesToDuration(runtime));
  });

  // for hero image animation on scroll
  protected readonly scaleInterpolation = computed(() =>
    createInterpolation({
      inputRange: [-this.heroImageVisibleHeight(), this.heroImageVisibleHeight() / 2],
      outputRange: [HERO_IMAGE_MAX_SCALE_VALUE, HERO_IMAGE_MIN_SCALE_VALUE],
      extrapolate: 'clamp',
    }),
  );

  protected readonly containerStyle = computed(() => ({
    transform: `translateZ(0) scale(${this.scaleInterpolation()(this.scrollY())})`,
  }));

  protected readonly windowSizeService = inject(WindowSizeService);

  protected readonly imageContainer = viewChild.required<ElementRef<HTMLElement>>('imageContainer');

  constructor() {
    effect(() => {
      this.windowSizeService.windowSize.innerHeight();
      this.setHeroImageVisibleHeight();
    });

    afterNextRender({
      read: () => {
        this.setHeroImageVisibleHeight();
      },
    });
  }

  protected setHeroImageVisibleHeight() {
    this.heroImageVisibleHeight.set(this.imageContainer().nativeElement.offsetHeight ?? 0);
  }
}
