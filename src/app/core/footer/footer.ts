import { Component, inject } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { IconComponent } from '../../shared/components/icon/icon';
import { LangService } from '../i18n/lang';
import { PROFILE } from '../profile';

/** Contacto tras el commit raíz, y la línea de pie. */
@Component({
  selector: 'app-footer',
  imports: [I18NextModule, IconComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly lang = inject(LangService);
  protected readonly profile = PROFILE;
  protected readonly tel = `tel:${PROFILE.phone.replace(/\s/g, '')}`;
  protected readonly year = new Date().getFullYear();
}
