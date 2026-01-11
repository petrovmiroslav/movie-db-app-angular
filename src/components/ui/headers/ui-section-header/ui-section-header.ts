import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-ui-section-header',
  imports: [],
  templateUrl: './ui-section-header.html',
  styleUrl: './ui-section-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSectionHeader {
  readonly class = input('');
}
