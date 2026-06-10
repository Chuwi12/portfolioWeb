import { Provider } from '@angular/core';
import { I18NEXT_SERVICE } from 'angular-i18next';
import { Subject } from 'rxjs';

export const I18N_MOCK_PROVIDERS: Provider[] = [
  {
    provide: I18NEXT_SERVICE,
    useValue: {
      t: (key: string) => key,
      language: 'es',
      languages: ['es', 'en'],
      options: {},
      use: () => {},
      init: () => Promise.resolve(),
      on: () => {},
      changeLanguage: () => Promise.resolve(),
      languageChanged: new Subject<string>(),
    }
  }
];
