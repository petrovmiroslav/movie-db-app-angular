import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Image } from '../../../../../features/images/types';
import { Movie } from '../../../../../features/movies/types';
import { ImageComponent } from '../../../../../features/images/components/image/image';
import { UiSectionHeader } from '../../../../../components/ui/headers/ui-section-header/ui-section-header';

@Component({
  selector: 'app-movie-images-slider',
  imports: [UiSectionHeader, ImageComponent],
  templateUrl: './movie-images-slider.html',
  styleUrl: './movie-images-slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieImagesSlider {
  readonly imageList = input.required<Image[] | undefined>();
  readonly headerText = input.required<string>();
  readonly isPosters = input(false);
  readonly title = input.required<Movie['title']>();
  readonly baseUrl = input.required<ReturnType<ImageComponent['baseUrl']>>();
}
