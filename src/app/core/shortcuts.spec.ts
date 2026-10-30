import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from '../pages/home/home';
import { Shortcuts } from '../shared/components/shortcuts/shortcuts';
import { polyfillDialog, stubScrollIntoView } from './dom-test';
import { i18nTestProviders } from './i18n/i18n-test';
import { PROFILE } from './profile';
import { LOG_ENTRIES } from './services/log-entries';
import { ProjectService } from './services/project.service';
import { ShortcutsService } from './shortcuts';

@Component({ imports: [Home, Shortcuts], template: '<app-home /><app-shortcuts />' })
class Host {}

describe('atajos de teclado', () => {
  let fixture: ComponentFixture<Host>;
  let el: HTMLElement;
  let shortcuts: ShortcutsService;
  let projects: ProjectService;
  let scroll: ReturnType<typeof stubScrollIntoView>;
  const onKey = (e: KeyboardEvent) => shortcuts.handle(e);
  const store = new Map<string, string>();

  /** Una pulsación que burbujea hasta el documento, como la que recibe `App`. */
  const press = (key: string, init: KeyboardEventInit = {}, target: Element = document.body) =>
    target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, ...init }));
  const settle = async () => {
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const rows = () => [...el.querySelectorAll<HTMLElement>('li.entry')];
  const title = (row: HTMLElement) => row.querySelector('h3')!;
  const dialog = () => el.querySelector<HTMLDialogElement>('dialog.help')!;

  beforeEach(async () => {
    // Node 26 trae su propio `localStorage` (inservible sin fichero) y tapa el de jsdom.
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => store.set(k, v),
    });
    polyfillDialog();
    scroll = stubScrollIntoView();
    await TestBed.configureTestingModule({
      imports: [Host],
      providers: [...i18nTestProviders()],
    }).compileComponents();
    shortcuts = TestBed.inject(ShortcutsService);
    projects = TestBed.inject(ProjectService);
    fixture = TestBed.createComponent(Host);
    el = fixture.nativeElement;
    await settle();
    // jsdom no maqueta: las filas se apilan cada 300px desde el pie de la cabecera.
    rows().forEach((row, i) =>
      vi.spyOn(row, 'getBoundingClientRect').mockReturnValue({
        top: 800 + i * 300,
        bottom: 1100 + i * 300,
      } as DOMRect),
    );
    document.addEventListener('keydown', onKey);
  });

  afterEach(() => {
    store.clear();
    vi.unstubAllGlobals();
    document.removeEventListener('keydown', onKey);
    document.querySelectorAll('input.probe').forEach((i) => i.remove());
    vi.restoreAllMocks();
    Reflect.deleteProperty(navigator, 'clipboard');
    Reflect.deleteProperty(window, 'matchMedia');
  });

  it('j y k mueven el foco entre commits y lo centran en pantalla', () => {
    press('j');
    expect(document.activeElement).toBe(title(rows()[0]));
    press('j');
    expect(document.activeElement).toBe(title(rows()[1]));
    expect(scroll).toHaveBeenLastCalledWith({ block: 'center', behavior: 'smooth' });
    press('k');
    expect(document.activeElement).toBe(title(rows()[0]));
    press('k');
    expect(document.activeElement).toBe(title(rows()[0]));
    for (let i = 0; i < LOG_ENTRIES.length + 3; i++) press('j');
    expect(document.activeElement).toBe(title(rows().at(-1)!));
  });

  it('con el filtro activo, j y k se saltan los commits plegados', async () => {
    projects.toggle('go');
    await settle();
    press('j');
    expect(document.activeElement).toBe(
      title(rows()[LOG_ENTRIES.findIndex((e) => e.id === 'url-state-monitor')]),
    );
    press('j');
    expect(document.activeElement).toBe(
      title(rows()[LOG_ENTRIES.findIndex((e) => e.id === 'hcm')]),
    );
    press('j');
    expect(document.activeElement).toBe(
      title(rows()[LOG_ENTRIES.findIndex((e) => e.id === 'hcm')]),
    );
  });

  it('con reduced-motion el desplazamiento no es suave', () => {
    Object.defineProperty(window, 'matchMedia', {
      value: () => ({ matches: true }),
      configurable: true,
    });
    press('j');
    expect(scroll).toHaveBeenLastCalledWith({ block: 'center', behavior: 'auto' });
  });

  it('/ lleva el foco al primer chip del stack', () => {
    press('/');
    const first = el.querySelector('.chip');
    expect(first?.textContent).toContain('go');
    expect(document.activeElement).toBe(first);
  });

  it('? abre la ayuda con showModal y Esc la cierra; el botón de cerrar también', async () => {
    press('?', { shiftKey: true });
    await settle();
    expect(shortcuts.helpOpen()).toBe(true);
    expect(dialog().open).toBe(true);
    expect(dialog().querySelectorAll('kbd')).toHaveLength(6);
    expect(dialog().querySelector('.close')?.getAttribute('aria-label')).toBe('Cerrar los atajos');

    press('j'); // con la ayuda abierta, nada más reacciona
    expect(document.activeElement).not.toBe(title(rows()[0]));

    press('Escape');
    await settle();
    expect(shortcuts.helpOpen()).toBe(false);
    expect(dialog().open).toBe(false);

    press('?');
    await settle();
    dialog().querySelector<HTMLButtonElement>('.close')!.click();
    await settle();
    expect(dialog().open).toBe(false);
  });

  it('Esc quita el filtro activo y, sin filtro, no hace nada', async () => {
    projects.toggle('rust');
    projects.toggle('go');
    press('Escape');
    expect(projects.selectedFilters()).toEqual([]);
    press('Escape');
    expect(shortcuts.helpOpen()).toBe(false);
  });

  it('con el foco en un input no hace nada, ni con una tecla ni con ?', () => {
    const input = document.createElement('input');
    input.className = 'probe';
    document.body.append(input);
    input.focus();
    for (const key of ['j', 'k', '/', 'c', '?', 'Escape']) press(key, {}, input);
    expect(document.activeElement).toBe(input);
    expect(shortcuts.helpOpen()).toBe(false);
    expect(shortcuts.notice()).toBeNull();
    const editable = document.createElement('div');
    editable.setAttribute('contenteditable', 'true');
    document.body.append(editable);
    press('?', {}, editable);
    editable.remove();
    expect(shortcuts.helpOpen()).toBe(false);
  });

  it('con ctrl, meta o alt no hace nada', () => {
    for (const mod of ['ctrlKey', 'metaKey', 'altKey']) press('j', { [mod]: true });
    expect(document.activeElement).toBe(document.body);
    press('?', { ctrlKey: true });
    expect(shortcuts.helpOpen()).toBe(false);
  });

  it('c copia el email con el portapapeles y lo avisa en la región aria-live', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    press('c');
    await settle();
    expect(writeText).toHaveBeenCalledWith(PROFILE.email);
    expect(shortcuts.notice()).toBe('copied');
    const region = el.querySelector('app-shortcuts [role="status"]')!;
    expect(region.textContent).toContain('Email copiado');
  });

  it('si el portapapeles falla, el aviso lo dice y ofrece el mailto', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denegado'));
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    press('c');
    await settle();
    expect(shortcuts.notice()).toBe('failed');
    const region = el.querySelector('app-shortcuts [role="status"]')!;
    expect(region.textContent).toContain('No se pudo copiar el email.');
    expect(region.querySelector('a')?.getAttribute('href')).toBe(`mailto:${PROFILE.email}`);

    // Sin API de portapapeles (contexto inseguro) ocurre lo mismo.
    Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true });
    shortcuts.notice.set(null);
    press('c');
    await settle();
    expect(shortcuts.notice()).toBe('failed');
  });

  describe('desactivar los atajos de una tecla (WCAG 2.1.4)', () => {
    it('están activados por defecto', () => {
      expect(shortcuts.enabled()).toBe(true);
    });

    it('apagados, j, k, /, c y ? no hacen nada, pero Esc sigue quitando el filtro', async () => {
      const writeText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
      shortcuts.setEnabled(false);
      for (const key of ['j', 'k', '/', 'c', '?']) press(key);
      await settle();
      expect(document.activeElement).toBe(document.body);
      expect(shortcuts.helpOpen()).toBe(false);
      expect(shortcuts.notice()).toBeNull();
      expect(writeText).not.toHaveBeenCalled();

      projects.toggle('rust');
      press('Escape');
      expect(projects.selectedFilters()).toEqual([]);
    });

    it('apagados, Esc cierra la ayuda abierta desde el botón de la pista', async () => {
      shortcuts.setEnabled(false);
      el.querySelector<HTMLButtonElement>('.hint')!.click();
      await settle();
      expect(dialog().open).toBe(true);
      press('?'); // ya no es un atajo
      expect(shortcuts.helpOpen()).toBe(true);
      press('Escape');
      await settle();
      expect(shortcuts.helpOpen()).toBe(false);
      expect(dialog().open).toBe(false);
    });

    it('la casilla del diálogo los conmuta y la elección persiste en localStorage', async () => {
      press('?');
      await settle();
      const box = dialog().querySelector<HTMLInputElement>('.opt input[type="checkbox"]')!;
      expect(box.checked).toBe(true);
      expect(dialog().querySelector('.opt')?.textContent).toContain('Atajos de una tecla');

      box.checked = false;
      box.dispatchEvent(new Event('change', { bubbles: true }));
      await settle();
      expect(shortcuts.enabled()).toBe(false);
      expect(store.get('shortcuts')).toBe('off');

      box.checked = true;
      box.dispatchEvent(new Event('change', { bubbles: true }));
      await settle();
      expect(shortcuts.enabled()).toBe(true);
      expect(store.get('shortcuts')).toBe('on');
    });

    it('una visita nueva respeta lo guardado, y sin almacenamiento sigue funcionando', () => {
      store.set('shortcuts', 'off');
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({ providers: [...i18nTestProviders()] });
      expect(TestBed.inject(ShortcutsService).enabled()).toBe(false);

      TestBed.resetTestingModule();
      vi.stubGlobal('localStorage', {
        getItem: () => {
          throw new Error('bloqueado');
        },
        setItem: () => {
          throw new Error('bloqueado');
        },
      });
      TestBed.configureTestingModule({ providers: [...i18nTestProviders()] });
      const blocked = TestBed.inject(ShortcutsService);
      expect(blocked.enabled()).toBe(true);
      expect(() => blocked.setEnabled(false)).not.toThrow();
      expect(blocked.enabled()).toBe(false);
    });

    it('la pista del stack es un botón que abre la ayuda', async () => {
      const hint = el.querySelector<HTMLButtonElement>('button.hint')!;
      expect(hint.textContent).toContain('Pulsa ? para ver los atajos');
      hint.click();
      await settle();
      expect(shortcuts.helpOpen()).toBe(true);
      expect(dialog().open).toBe(true);
    });
  });
});
