import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ConfigurationImages } from '../../../configuration/types';
import { getImageUrl } from '../../utils/utils';

@Component({
  selector: 'app-image',
  imports: [],
  templateUrl: './image.html',
  styleUrl: './image.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {
  readonly class = input<HTMLElement['className']>('');
  readonly src = input.required<string>();
  readonly baseUrl = input.required<ConfigurationImages['secureBaseUrl']>();
  readonly alt = input.required<string | undefined>();

  protected readonly link = computed(() =>
    getImageUrl({
      baseUrl: this.baseUrl(),
      size: undefined,
      filePath: this.src(),
    }),
  );
}
