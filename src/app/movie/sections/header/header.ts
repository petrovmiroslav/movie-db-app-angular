import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { HeaderHeightService } from '../../../../components/page-header/header-height-service/header-height-service';
import { createInterpolation } from '../../../../utils/interpolate/interpolate';
import { PageHeaderLayout } from '../../../../layouts/page-header-layout/page-header-layout';
import { ScreenHeaderTitle } from '../../../../components/screen-header-title/screen-header-title';
import { UiBackButton } from '../../../../components/ui/buttons/ui-back-button/ui-back-button';

@Component({
  selector: 'app-header',
  imports: [PageHeaderLayout, ScreenHeaderTitle, UiBackButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly scrollY = input.required<number>();
  readonly heroImageVisibleHeight = input.required<number>();

  protected readonly headerHeightService = inject(HeaderHeightService);

  protected readonly interpolation = computed(() =>
    createInterpolation({
      inputRange: [
        this.heroImageVisibleHeight() - this.headerHeightService.height() - 10,
        this.heroImageVisibleHeight() - this.headerHeightService.height(),
      ],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  );

  protected readonly hiddenElementsOpacity = computed(() =>
    this.heroImageVisibleHeight() ? this.interpolation()(this.scrollY()) : 0,
  );

  protected readonly hiddenElementStyle = computed(() => ({
    opacity: this.hiddenElementsOpacity(),
  }));
}
