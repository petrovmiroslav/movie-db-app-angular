import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { ResultItem } from './result-item/result-item';
import { useFavoritesQuery } from '../../../../features/favorites/queries';

@Component({
  selector: 'app-results',
  imports: [ResultItem],
  templateUrl: './results.html',
  styleUrl: './results.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Results {
  protected readonly favoriteListQuery = useFavoritesQuery();

  protected readonly favoriteList = computed(() => this.favoriteListQuery.data() ?? []);
}
