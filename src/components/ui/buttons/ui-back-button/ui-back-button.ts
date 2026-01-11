import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Location } from '@angular/common';
import { UiButton } from '../ui-button/ui-button';
import { UiMaskedIcon } from '../../icons/ui-masked-icon/ui-masked-icon';

@Component({
  selector: 'app-ui-back-button',
  imports: [UiButton, UiMaskedIcon],
  templateUrl: './ui-back-button.html',
  styleUrl: './ui-back-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-back-button-host',
  },
})
export class UiBackButton {
  readonly class = input<HTMLButtonElement['className']>('');
  readonly disabled = input<HTMLButtonElement['disabled'] | null>(null);

  protected readonly location = inject(Location);

  protected onClick() {
    this.location.back();
  }
}
