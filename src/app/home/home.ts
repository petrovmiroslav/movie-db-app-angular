import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeader } from '../../components/page-header/page-header';
import { PopularMovies } from './sections/popular-movies/popular-movies';
import { TopRatedMovies } from './sections/top-rated-movies/top-rated-movies';
import { GenresSlider } from './sections/genres-slider/genres-slider';

@Component({
  selector: 'app-home',
  imports: [PageHeader, PopularMovies, TopRatedMovies, GenresSlider],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
