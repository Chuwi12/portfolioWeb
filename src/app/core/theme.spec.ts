import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme';

const html = document.documentElement;
const metas = () => [...document.head.querySelectorAll('meta[name="theme-color"]')];

describe('ThemeService', () => {
  beforeEach(() => {
    html.className = '';
    // Las mismas dos etiquetas que declara index.html.
    for (const [media, content] of [
      ['dark', '#030712'],
      ['light', '#f3f4f6'],
    ]) {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.media = `(prefers-color-scheme: ${media})`;
      meta.content = content;
      document.head.append(meta);
    }
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    html.className = '';
    metas().forEach((m) => m.remove());
  });

  it('arranca con el tema que dejó el script de index.html', () => {
    html.classList.add('dark');
    expect(TestBed.inject(ThemeService).dark()).toBe(true);
  });

  it('conmuta la señal, la clase dark y el color de las dos etiquetas theme-color', () => {
    vi.stubGlobal('localStorage', { setItem: () => {} });
    const theme = TestBed.inject(ThemeService);
    const colors = () => metas().map((m) => m.getAttribute('content'));

    theme.toggle();
    expect(theme.dark()).toBe(true);
    expect(html.classList.contains('dark')).toBe(true);
    expect(colors()).toEqual(['#030712', '#030712']);

    theme.toggle();
    expect(theme.dark()).toBe(false);
    expect(html.classList.contains('dark')).toBe(false);
    expect(colors()).toEqual(['#f3f4f6', '#f3f4f6']);
  });

  it.each([
    [
      'setItem lanza (cuota o modo privado)',
      () => ({
        setItem: () => {
          throw new DOMException('denegado', 'SecurityError');
        },
      }),
    ],
    ['localStorage no existe', () => undefined],
  ])('si %s, el conmutador sigue funcionando', (_, storage) => {
    vi.stubGlobal('localStorage', storage());
    const theme = TestBed.inject(ThemeService);

    expect(() => theme.toggle()).not.toThrow();
    expect(theme.dark()).toBe(true);
    expect(html.classList.contains('dark')).toBe(true);
    expect(metas().map((m) => m.getAttribute('content'))).toEqual(['#030712', '#030712']);

    expect(() => theme.toggle()).not.toThrow();
    expect(html.classList.contains('dark')).toBe(false);
  });
});
