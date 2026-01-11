import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UiLink } from '../ui/links/ui-link/ui-link';
import { UiMaskedIcon } from '../ui/icons/ui-masked-icon/ui-masked-icon';
import { APP_PATHS } from '../../app/app.routes.constants';

const tabDataList = [
  {
    title: 'main',
    icon: 'MainFilled',
    path: '/' + APP_PATHS.main(),
  },
  {
    title: 'search',
    icon: 'Search',
    path: '/' + APP_PATHS.search(),
  },
  {
    title: 'favorites',
    icon: 'FavoritesFilled',
    path: '/' + APP_PATHS.favorites(),
  },
] as const;

@Component({
  selector: 'app-page-tab-bar',
  imports: [UiLink, UiMaskedIcon],
  templateUrl: './page-tab-bar.html',
  styleUrl: './page-tab-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTabBar {
  protected readonly tabDataList = tabDataList;
}
