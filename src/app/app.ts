import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WindowSizeService } from '../services/window-size-service/window-size-service';
import { SEOService } from '../services/seoservice/seoservice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly windowSizeService = inject(WindowSizeService);
  protected readonly SEOService = inject(SEOService);

  protected ngOnInit() {
    this.windowSizeService.init();
  }

  protected ngOnDestroy() {
    this.windowSizeService.destroy();
  }
}
