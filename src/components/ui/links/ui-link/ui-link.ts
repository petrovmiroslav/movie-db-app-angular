import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-ui-link',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './ui-link.html',
  styleUrl: './ui-link.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLink {
  readonly class = input<HTMLAnchorElement['className']>('');
  readonly routerLink = input<RouterLink['routerLink']>();
  readonly queryParams = input<RouterLink['queryParams']>();
  readonly routerLinkActive = input<RouterLinkActive['routerLinkActive']>('');
  readonly routerLinkActiveOptions = input<RouterLinkActive['routerLinkActiveOptions']>({
    exact: false,
  });
}
