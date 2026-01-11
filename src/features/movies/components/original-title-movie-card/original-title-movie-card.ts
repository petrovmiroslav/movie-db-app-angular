import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleMovieCard } from '../title-movie-card/title-movie-card';

@Component({
  selector: 'app-original-title-movie-card',
  imports: [TitleMovieCard],
  templateUrl: './original-title-movie-card.html',
  styleUrl: './original-title-movie-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OriginalTitleMovieCard {}
