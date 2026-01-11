import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Icons } from '../Icons';

@Component({
  selector: '[app-ui-masked-icon]',
  imports: [],
  template: '',
  styleUrl: './ui-masked-icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    '[style.mask-image]': 'maskImage()',
  },
})
export class UiMaskedIcon {
  readonly icon = input.required<keyof typeof Icons>();

  protected readonly maskImage = computed(() => {
    const src = Icons[this.icon()];

    return `url("${src}")`;
  });
}
