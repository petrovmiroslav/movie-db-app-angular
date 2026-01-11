import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Results } from './sections/results/results';
import { PageHeader } from '../../components/page-header/page-header';

@Component({
  selector: 'app-discover',
  imports: [Results, PageHeader],
  templateUrl: './discover.html',
  styleUrl: './discover.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Discover {}
