import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Properties } from 'csstype';

@Component({
  selector: 'app-screen-header-title',
  imports: [],
  templateUrl: './screen-header-title.html',
  styleUrl: './screen-header-title.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenHeaderTitle {
  readonly className = input('');
  readonly style = input<Properties>();
}
