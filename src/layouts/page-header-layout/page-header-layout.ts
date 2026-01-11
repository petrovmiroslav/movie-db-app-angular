import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { Properties } from 'csstype';
import { WindowSizeService } from '../../services/window-size-service/window-size-service';
import { HeaderHeightService } from '../../components/page-header/header-height-service/header-height-service';

@Component({
  selector: 'app-page-header-layout',
  imports: [],
  templateUrl: './page-header-layout.html',
  styleUrl: './page-header-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderLayout {
  readonly className = input('');
  readonly shadowClassName = input('');
  readonly backgroundClassName = input('');
  readonly shadowStyle = input<Properties>();
  readonly backgroundStyle = input<Properties>();

  protected readonly windowSizeService = inject(WindowSizeService);
  protected readonly headerHeightService = inject(HeaderHeightService);

  protected readonly header = viewChild.required<ElementRef<HTMLElement>>('header');

  constructor() {
    effect(() => {
      this.windowSizeService.windowSize.innerWidth();
      this.setHeaderHeight();
    });

    afterNextRender({
      read: () => {
        this.setHeaderHeight();
      },
    });
  }

  protected setHeaderHeight() {
    this.headerHeightService.height.set(this.header().nativeElement.offsetHeight ?? 0);
  }
}
