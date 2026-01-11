import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from './sections/header/header';
import { Results } from './sections/results/results';

@Component({
  selector: 'app-search',
  imports: [Header, Results],
  templateUrl: './search.html',
  styleUrl: './search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Search {}
