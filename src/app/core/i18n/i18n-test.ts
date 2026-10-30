import { Provider } from '@angular/core';
import { I18NEXT_SERVICE } from 'angular-i18next';
import { BehaviorSubject } from 'rxjs';
import { locales } from './locales';

type Lang = keyof typeof locales;
type Options = { count?: number; defaultValue?: string; [name: string]: unknown };

/** Servicio i18next de pruebas: resuelve los textos reales de `locales` (con plurales e interpolación). */
export function i18nTestProviders(initial: Lang = 'es'): Provider[] {
  const service = {
    language: initial as string,
    languages: ['es', 'en'],
    events: { languageChanged: new BehaviorSubject<string | null>(initial) },
    t(key: string, options: Options = {}): string {
      const dict = locales[service.language as Lang].translation as unknown as Record<
        string,
        unknown
      >;
      const find = (k: string) =>
        k
          .split('.')
          .reduce<unknown>((node, part) => (node as Record<string, unknown>)?.[part], dict);
      const plural = options.count === 1 ? '_one' : '_other';
      const found = find(key + plural) ?? find(key);
      const text = typeof found === 'string' ? found : (options.defaultValue ?? key);
      return text.replace(/{{(\w+)}}/g, (_, name: string) => String(options[name] ?? ''));
    },
    async changeLanguage(lang: string) {
      service.language = lang;
      service.events.languageChanged.next(lang);
    },
  };
  return [{ provide: I18NEXT_SERVICE, useValue: service }];
}
