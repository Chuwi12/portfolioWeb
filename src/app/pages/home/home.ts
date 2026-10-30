import { Component, inject } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { LangService } from '../../core/i18n/lang';
import { PROFILE } from '../../core/profile';
import { IconComponent } from '../../shared/components/icon/icon';
import { History } from '../history/history';
import { Stack } from '../stack/stack';

/** HEAD del historial: quién es Sergio hoy. Debajo, el stack (filtro) y el log. */
@Component({
  selector: 'app-home',
  imports: [I18NextModule, IconComponent, Stack, History],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly lang = inject(LangService);
  protected readonly mailto = `mailto:${PROFILE.email}`;
}
