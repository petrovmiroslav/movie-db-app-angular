import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Genre, GenreId } from '../../types';
import { GenresService } from '../../services/genres-service';

@Component({
  selector: 'app-genres-names',
  imports: [],
  templateUrl: './genres-names.html',
  styleUrl: './genres-names.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenresNames {
  readonly genreList = input.required<Genre[] | undefined>();
  readonly genreIdList = input.required<GenreId[] | undefined>();

  readonly class = input<HTMLElement['className']>('');

  protected readonly genresService = inject(GenresService);

  protected readonly genreNameList = computed(() => {
    const list = this.genreList()?.length
      ? this.genreList()?.map((genre) => genre.name)
      : this.genreIdList()?.map((genreId) => this.genresService.genresDict()[genreId]?.name);

    return (
      list?.filter((maybeString): maybeString is string => Boolean(maybeString)).join(', ') ?? ''
    );
  });
}
