import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeader } from '../../components/page-header/page-header';
import { Results } from './sections/results/results';

@Component({
  selector: 'app-favorites',
  imports: [PageHeader, Results],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Favorites {}
