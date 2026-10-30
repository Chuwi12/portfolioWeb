import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { polyfillDialog, stubCanvas } from './core/dom-test';
import { i18nTestProviders } from './core/i18n/i18n-test';

describe('App', () => {
  beforeEach(async () => {
    stubCanvas(null);
    polyfillDialog();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), ...i18nTestProviders()],
    }).compileComponents();
  });

  it('should create the app', () => {
    expect(TestBed.createComponent(App).componentInstance).toBeTruthy();
  });

  it('tiene enlace de salto, cabecera, main y pie con el contacto', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('a.skip')?.getAttribute('href')).toBe('#contenido');
    expect(el.querySelector('app-header')).toBeTruthy();
    expect(el.querySelector('main #contenido')).toBeTruthy();
    expect(el.querySelector('footer #contacto')).toBeTruthy();
  });

  it('lleva el fondo del grafo y el panel de atajos, que reacciona al teclado del documento', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-live-graph canvas[aria-hidden="true"]')).toBeTruthy();
    const dialog = el.querySelector<HTMLDialogElement>('app-shortcuts dialog')!;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: '?', bubbles: true }));
    await fixture.whenStable();
    expect(dialog.open).toBe(true);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();
    expect(dialog.open).toBe(false);
  });
});
