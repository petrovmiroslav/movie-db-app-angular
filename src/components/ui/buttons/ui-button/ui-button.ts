import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-ui-button',
  imports: [MatButton],
  templateUrl: './ui-button.html',
  styleUrl: './ui-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButton {
  readonly class = input<HTMLButtonElement['className']>('');
  readonly type = input<HTMLButtonElement['type']>('button');
  readonly ariaLabel = input('');
  readonly disabled = input<HTMLButtonElement['disabled'] | null>(null);
}
