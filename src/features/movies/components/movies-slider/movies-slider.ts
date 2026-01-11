import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Movie } from '../../types';
import { ConfigurationService } from '../../../configuration/services/configuration-service';
import { MoviesSliderItem } from './movies-slider-item/movies-slider-item';
import { WaIntersectionObserver } from '@ng-web-apis/intersection-observer';

@Component({
  selector: 'app-movies-slider',
  imports: [MoviesSliderItem, WaIntersectionObserver],
  templateUrl: './movies-slider.html',
  styleUrl: './movies-slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesSlider {
  readonly moviesList = input.required<Movie[] | undefined>();
  protected readonly onEndReached = output();

  protected readonly configurationService = inject(ConfigurationService);

  protected readonly imageConfiguration = computed(
    () => this.configurationService.configurationQuery.data()?.images ?? {},
  );

  protected onIntersection(intersections: IntersectionObserverEntry[]) {
    intersections[0]?.isIntersecting && this.onEndReached.emit();
  }
}
