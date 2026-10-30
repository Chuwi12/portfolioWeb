import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { i18nTestProviders } from '../i18n/i18n-test';
import { PROFILE } from '../profile';
import { Header } from './header';

describe('Header', () => {
  afterEach(() => vi.unstubAllGlobals());

  let fixture: ComponentFixture<Header>;
  let el: HTMLElement;

  beforeEach(async () => {
    // Node 26 trae su propio `localStorage` (inservible sin fichero) y tapa el de jsdom.
    const store = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => store.set(k, v),
    });
    document.documentElement.className = '';
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([]), ...i18nTestProviders()],
    }).compileComponents();
    fixture = TestBed.createComponent(Header);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  const cvHref = () => el.querySelector<HTMLAnchorElement>('a.cv')!.getAttribute('href');
  const click = async (selector: string) => {
    el.querySelector<HTMLElement>(selector)!.click();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  it('muestra el wordmark en una sola pieza y los enlaces en el orden en que se recorre la página', () => {
    expect(el.querySelector('.brand')?.textContent).toBe('chuwi-dev');
    const hrefs = [...el.querySelectorAll('.links a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['#stack', '#historial', '#contacto']);
  });

  it('el CV y el idioma siguen al botón de idioma', async () => {
    expect(cvHref()).toBe(PROFILE.cv.es);
    await click('button[aria-label*="(EN)"]');
    expect(cvHref()).toBe(PROFILE.cv.en);
    expect(document.documentElement.lang).toBe('en');
    expect(el.querySelector('a.cv')?.textContent).toContain('Download CV');
  });

  it('el botón de tema conmuta la clase dark y guarda la elección', async () => {
    const dark = () => document.documentElement.classList.contains('dark');
    expect(dark()).toBe(false);
    await click('button[aria-label="Cambiar a tema oscuro"]');
    expect(dark()).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
    await click('button[aria-label="Cambiar a tema claro"]');
    expect(dark()).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('el menú móvil se abre y se cierra', async () => {
    const toggle = el.querySelector<HTMLButtonElement>('.menu-btn')!;
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    await click('.menu-btn');
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(el.querySelector('.nav')?.classList.contains('is-open')).toBe(true);
  });
});
