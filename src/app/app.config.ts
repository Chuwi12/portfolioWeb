import { ApplicationConfig, provideBrowserGlobalErrorListeners, APP_INITIALIZER, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { I18NEXT_SERVICE, I18NextModule, defaultInterpolationFormat, I18NextLoadResult } from 'angular-i18next';

export function appInit(i18next: any) {
  return () => {
    return import('./core/i18n/locales').then(({ locales }) => {
      return i18next.init({
        fallbackLng: 'es',
        lng: 'es',
        resources: locales,
        interpolation: {
          format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
        }
      });
    });
  };
}

export function localeIdFactory(i18next: any) {
  return i18next.language;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    importProvidersFrom(I18NextModule.forRoot()),
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      deps: [I18NEXT_SERVICE],
      multi: true
    },
    {
      provide: LOCALE_ID,
      deps: [I18NEXT_SERVICE],
      useFactory: localeIdFactory
    }
  ]
};
