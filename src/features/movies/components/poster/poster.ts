import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Movie } from '../../types';
import { ImageComponent } from '../../../images/components/image/image';

@Component({
  selector: 'app-poster',
  imports: [ImageComponent],
  templateUrl: './poster.html',
  styleUrl: './poster.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'class()',
  },
})
export class Poster {
  readonly class = input<HTMLElement['className']>('');
  readonly title = input<Movie['title']>('');
  readonly posterPath = input<Movie['posterPath']>('');

  readonly baseUrl = input.required<ReturnType<ImageComponent['baseUrl']>>();
}
