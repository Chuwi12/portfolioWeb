import { TestBed } from '@angular/core/testing';
import { I18NEXT_SERVICE } from 'angular-i18next';
import { i18nTestProviders } from './i18n-test';
import { LangService } from './lang';

describe('LangService', () => {
  const setup = (initial: 'es' | 'en' = 'es') => {
    TestBed.configureTestingModule({ providers: [...i18nTestProviders(initial)] });
    return TestBed.inject(LangService);
  };

  beforeEach(() => (document.documentElement.lang = 'es'));
  afterEach(() => (document.documentElement.lang = ''));

  it('pasar a inglés pone <html lang="en"> y el CV en inglés; volver a es lo deshace', async () => {
    const lang = setup();
    expect(lang.cv()).toBe('/CV.pdf');

    await lang.toggle();
    expect(lang.current()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(lang.cv()).toBe('/CV-en.pdf');
    expect(TestBed.inject(I18NEXT_SERVICE).language).toBe('en');

    await lang.toggle();
    expect(lang.current()).toBe('es');
    expect(document.documentElement.lang).toBe('es');
    expect(lang.cv()).toBe('/CV.pdf');
    expect(TestBed.inject(I18NEXT_SERVICE).language).toBe('es');
  });

  it('al crearse sincroniza <html lang> con el idioma inicial, sin esperar al primer cambio', () => {
    document.documentElement.lang = 'es';
    setup('en');
    expect(document.documentElement.lang).toBe('en');
    TestBed.resetTestingModule();
    document.documentElement.lang = '';
    setup('es');
    expect(document.documentElement.lang).toBe('es');
  });

  it('si i18next ya está en inglés, arranca con el CV en inglés', () => {
    const lang = setup('en');
    expect(lang.current()).toBe('en');
    expect(lang.cv()).toBe('/CV-en.pdf');
  });

  it('si el cambio de idioma falla, ni la señal ni <html lang> se quedan a medias', async () => {
    const lang = setup();
    vi.spyOn(TestBed.inject(I18NEXT_SERVICE), 'changeLanguage').mockRejectedValue(
      new Error('sin red'),
    );

    await expect(lang.toggle()).rejects.toThrow('sin red');
    expect(lang.current()).toBe('es');
    expect(document.documentElement.lang).toBe('es');
    expect(lang.cv()).toBe('/CV.pdf');
  });
});
