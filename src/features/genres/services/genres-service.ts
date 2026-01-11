import { computed, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { useGenreListQuery } from '../queries';
import { Genre } from '../types';

export type GenresDict = {
  [key: Genre['id']]: Genre | undefined;
};

export const createGenresDict = (genreList: Genre[] | undefined): GenresDict => {
  const dictionary: GenresDict = {};
  genreList?.forEach((genre) => {
    dictionary[genre.id] = genre;
  });

  return dictionary;
};

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  protected readonly http = inject(HttpClient);

  protected readonly genreListQuery = useGenreListQuery(this.http);

  readonly genresDict = computed(() => createGenresDict(this.genreListQuery.data()?.genres));
}
