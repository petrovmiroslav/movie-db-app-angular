import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Movie } from '../../../../features/movies/types';
import { MovieImagesSlider } from './movie-images-slider/movie-images-slider';
import { ConfigurationService } from '../../../../features/configuration/services/configuration-service';
import { Image } from '../../../../features/images/types';
import { RecommendationsMoviesSlider } from './recommendations-movies-slider/recommendations-movies-slider';
import { SimilarMoviesSlider } from './similar-movies-slider/similar-movies-slider';

@Component({
  selector: 'app-content',
  imports: [MovieImagesSlider, RecommendationsMoviesSlider, SimilarMoviesSlider],
  templateUrl: './content.html',
  styleUrl: './content.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Content {
  readonly id = input.required<Movie['id']>();
  readonly title = input.required<Movie['title']>();
  readonly tagline = input.required<Movie['tagline']>();
  readonly overview = input.required<Movie['overview']>();
  readonly backdrops = input.required<Image[] | undefined>();
  readonly posters = input.required<Image[] | undefined>();

  protected readonly configurationService = inject(ConfigurationService);

  protected readonly imageConfiguration = computed(
    () => this.configurationService.configurationQuery.data()?.images ?? {},
  );
}
