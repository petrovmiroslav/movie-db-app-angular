import { Injectable, signal } from '@angular/core';
import { debounce } from '../../utils/functions/functions';

type WindowSize = Pick<Window, 'innerWidth' | 'innerHeight'>;

const getWindowSize = (): WindowSize => {
  if (typeof window === 'undefined')
    return {
      innerWidth: 0,
      innerHeight: 0,
    };
  return { innerWidth: window.innerWidth, innerHeight: window.innerHeight };
};

@Injectable({
  providedIn: 'root',
})
export class WindowSizeService {
  readonly windowSize = {
    innerWidth: signal(0),
    innerHeight: signal(0),
  };

  protected listener: (() => void) | null = null;

  init() {
    if (this.listener || typeof window === 'undefined') return;

    const update = () => {
      const windowSize = getWindowSize();
      this.windowSize.innerWidth.set(windowSize.innerWidth);
      this.windowSize.innerHeight.set(windowSize.innerHeight);
    };

    this.listener = debounce(update, 16);

    window.addEventListener('resize', this.listener);

    update();
  }

  destroy() {
    if (!this.listener) return;
    window.removeEventListener('resize', this.listener);
  }
}
