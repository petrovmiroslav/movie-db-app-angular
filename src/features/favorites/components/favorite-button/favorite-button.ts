import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { UiButton } from '../../../../components/ui/buttons/ui-button/ui-button';
import { UiMaskedIcon } from '../../../../components/ui/icons/ui-masked-icon/ui-masked-icon';
import { Movie } from '../../../movies/types';
import { FavoritesService } from '../../services/favorites-service';
import { useAddToFavoritesMutation, useRemoveFromFavoritesMutation } from '../../queries';
import { QueryClient } from '@tanstack/angular-query-experimental';
import { FavoritesTypes } from '../../types';

@Component({
  selector: 'app-favorite-button',
  imports: [UiButton, UiMaskedIcon],
  templateUrl: './favorite-button.html',
  styleUrl: './favorite-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'favorites-button-host',
  },
})
export class FavoriteButton {
  readonly class = input('');
  readonly id = input.required<Movie['id']>();

  protected readonly queryClient = inject(QueryClient);
  protected readonly favoritesService = inject(FavoritesService);
  protected readonly favoriteId = computed(
    () => this.favoritesService.favoritesDict()?.[this.id()]?.id,
  );
  protected readonly isFavorite = computed(() => !!this.favoriteId());

  protected readonly addToFavoritesMutation = useAddToFavoritesMutation(this.queryClient)();
  protected readonly removeFromFavoritesMutation = useRemoveFromFavoritesMutation(
    this.queryClient,
  )();

  protected onClick() {
    const favoriteId = this.favoriteId();
    if (favoriteId) {
      return this.removeFromFavoritesMutation.mutate({ id: favoriteId });
    }

    this.addToFavoritesMutation.mutate({ type: FavoritesTypes.MOVIE, entityId: this.id() });
  }
}
