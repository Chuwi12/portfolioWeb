import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18NextModule } from 'angular-i18next';
import { LangService } from '../i18n/lang';
import { ThemeService } from '../theme';
import { IconComponent } from '../../shared/components/icon/icon';

@Component({
  selector: 'app-header',
  imports: [I18NextModule, IconComponent, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly lang = inject(LangService);
  protected readonly theme = inject(ThemeService);
  protected readonly menuOpen = signal(false);

  protected readonly links = [
    { href: '#stack', label: 'header.nav.stack' },
    { href: '#historial', label: 'header.nav.historial' },
    { href: '#contacto', label: 'header.nav.contacto' },
  ];
}
