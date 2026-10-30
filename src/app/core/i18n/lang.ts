import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { I18NEXT_SERVICE } from 'angular-i18next';
import { PROFILE } from '../profile';

type Lang = 'es' | 'en';

/** Idioma activo: lo cambia, actualiza `<html lang>` y decide qué CV se descarga. */
@Injectable({ providedIn: 'root' })
export class LangService {
  private readonly i18n = inject(I18NEXT_SERVICE);
  private readonly doc = inject(DOCUMENT);

  readonly current = signal<Lang>(this.i18n.language === 'en' ? 'en' : 'es');
  readonly cv = computed(() => PROFILE.cv[this.current()]);

  constructor() {
    // El idioma inicial manda sobre el `lang` del HTML estático, sin esperar al primer cambio.
    if (isPlatformBrowser(inject(PLATFORM_ID))) this.doc.documentElement.lang = this.current();
  }

  async toggle() {
    const next: Lang = this.current() === 'es' ? 'en' : 'es';
    await this.i18n.changeLanguage(next);
    this.current.set(next);
    this.doc.documentElement.lang = next;
  }
}
