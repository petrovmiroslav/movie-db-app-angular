import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-title-movie-card',
  imports: [],
  templateUrl: './title-movie-card.html',
  styleUrl: './title-movie-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': "'ellipsisMultiline ' + class()",
  },
})
export class TitleMovieCard {
  readonly class = input<HTMLElement['className']>('');
}
