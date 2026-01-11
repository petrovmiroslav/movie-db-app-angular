import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UiButton } from '../ui-button/ui-button';

@Component({
  selector: 'app-ui-primary-button',
  imports: [UiButton],
  templateUrl: './ui-primary-button.html',
  styleUrl: './ui-primary-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiPrimaryButton {
  readonly class = input<HTMLButtonElement['className']>('');
  readonly type = input<HTMLButtonElement['type']>('button');
  readonly disabled = input<HTMLButtonElement['disabled'] | null>(null);
}
