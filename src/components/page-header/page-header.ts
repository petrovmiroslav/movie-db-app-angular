import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { PageHeaderLayout } from '../../layouts/page-header-layout/page-header-layout';
import { HeaderHeightService } from './header-height-service/header-height-service';
import { createInterpolation } from '../../utils/interpolate/interpolate';
import { roundTo } from '../../utils/numbers/numbers';
import { throttle } from '../../utils/functions/functions';
import { ScreenHeaderTitle } from '../screen-header-title/screen-header-title';
import { UiBackButton } from '../ui/buttons/ui-back-button/ui-back-button';

@Component({
  selector: 'app-page-header',
  imports: [PageHeaderLayout, ScreenHeaderTitle, UiBackButton],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeader {
  protected readonly headerHeightService = inject(HeaderHeightService);
  readonly withBackButton = input(false);

  protected readonly shadowStyle = signal({ opacity: 0 });

  protected readonly interpolation = computed(() =>
    createInterpolation({
      inputRange: [0, this.headerHeightService.height() * 0.5],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  );

  protected readonly scrollHandler = throttle(() => {
    const { scrollY } = window;
    const opacity = roundTo(this.interpolation()(scrollY), 2);

    this.shadowStyle.update((prevState) =>
      prevState.opacity !== opacity ? { opacity } : prevState,
    );
  }, 64);

  protected ngOnInit() {
    if (typeof window === 'undefined') return;
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  protected ngOnDestroy() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('scroll', this.scrollHandler);
  }
}
