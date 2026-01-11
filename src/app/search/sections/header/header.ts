import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageHeaderLayout } from '../../../../layouts/page-header-layout/page-header-layout';
import { HeaderHeightService } from '../../../../components/page-header/header-height-service/header-height-service';
import { createInterpolation } from '../../../../utils/interpolate/interpolate';
import { throttle } from '../../../../utils/functions/functions';
import { roundTo } from '../../../../utils/numbers/numbers';
import { UiTextInput } from '../../../../components/ui/inputs/ui-text-input/text-input';
import { UiMaskedIcon } from '../../../../components/ui/icons/ui-masked-icon/ui-masked-icon';

@Component({
  selector: 'app-header',
  imports: [PageHeaderLayout, UiTextInput, UiMaskedIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly headerHeightService = inject(HeaderHeightService);
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

  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);

  protected ngOnInit() {
    if (typeof window === 'undefined') return;
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    this.initSearchInput();
  }

  protected ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  protected readonly searchControl = new FormControl('');

  protected initSearchInput() {
    this.route.queryParams.subscribe((params) => {
      const q = params['q'] ?? '';
      if (q !== this.searchControl.value) {
        this.searchControl.setValue(q, { emitEvent: false });
      }
    });

    this.searchControl.valueChanges.subscribe((value) =>
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { q: value || null },
        queryParamsHandling: 'merge',
      }),
    );
  }

  protected readonly isClearButtonExpanded = signal(false);

  protected expandClearButton() {
    this.isClearButtonExpanded.set(true);
  }

  protected collapseClearButton() {
    this.isClearButtonExpanded.set(false);
  }

  protected readonly searchClearButton =
    viewChild.required<ElementRef<HTMLButtonElement>>('searchClearButton');

  protected onSearchClearClickHandler() {
    this.searchClearButton().nativeElement.blur();
    this.searchControl.setValue('');
    this.collapseClearButton();
  }
}
