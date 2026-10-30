import { TestBed } from '@angular/core/testing';
import { polyfillDialog } from '../../../core/dom-test';
import { i18nTestProviders } from '../../../core/i18n/i18n-test';
import { ShortcutsService } from '../../../core/shortcuts';
import { Shortcuts } from './shortcuts';

describe('Shortcuts', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('la casilla del diálogo apaga los atajos con un clic real (el clic no se cancela)', async () => {
    // Node 26 trae su propio `localStorage` (inservible sin fichero) y tapa el de jsdom.
    const store = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => store.set(k, v),
    });
    polyfillDialog();
    TestBed.configureTestingModule({ imports: [Shortcuts], providers: i18nTestProviders() });
    const fixture = TestBed.createComponent(Shortcuts);
    const service = TestBed.inject(ShortcutsService);
    service.helpOpen.set(true);
    await fixture.whenStable();

    const box = fixture.nativeElement.querySelector('input[type=checkbox]') as HTMLInputElement;
    box.click();

    expect(box.checked).toBe(false);
    expect(service.enabled()).toBe(false);
    expect(store.get('shortcuts')).toBe('off');
  });
});
