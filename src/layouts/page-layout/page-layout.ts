import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageTabBar } from '../../components/page-tab-bar/page-tab-bar';

@Component({
  selector: 'app-page-layout',
  imports: [RouterOutlet, PageTabBar],
  templateUrl: './page-layout.html',
  styleUrl: './page-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayout {}
