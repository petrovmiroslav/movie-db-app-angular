import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderHeightService {
  readonly height = signal(0);
}
