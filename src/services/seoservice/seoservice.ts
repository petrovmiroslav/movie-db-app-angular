import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

const title = 'The Movie Database (TMDB)';
const description =
  'The Movie Database (TMDB) is a popular, user editable database for movies and TV shows.';

@Injectable({
  providedIn: 'root',
})
export class SEOService {
  protected readonly title = inject(Title);
  protected readonly meta = inject(Meta);

  constructor() {
    this.updateTitle('');
    this.updateDescription(description);
    this.meta.updateTag({
      name: 'keywords',
      content:
        'Movies, TV Shows, Streaming, Reviews, API, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast',
    });
  }

  updateTitle(newTitle: string) {
    const value = `${newTitle}${newTitle && ' | '}${title}`;
    this.title.setTitle(value);
    this.meta.updateTag({ name: 'og:title', content: value });
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ name: 'og:description', content: desc });
  }
}
