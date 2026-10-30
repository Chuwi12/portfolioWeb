import { Component, HostListener, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { I18NextModule } from 'angular-i18next';
import { Footer } from './core/footer/footer';
import { Header } from './core/header/header';
import { ShortcutsService } from './core/shortcuts';
import { LiveGraph } from './shared/components/live-graph/live-graph';
import { Shortcuts } from './shared/components/shortcuts/shortcuts';
import { inject as injectAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header, I18NextModule, LiveGraph, Shortcuts],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly shortcuts = inject(ShortcutsService);

  @HostListener('document:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent) {
    this.shortcuts.handle(event);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      injectAnalytics();
      injectSpeedInsights();
    }
  }
}
