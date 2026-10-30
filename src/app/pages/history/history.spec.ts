import { ComponentFixture, TestBed } from '@angular/core/testing';
import { i18nTestProviders } from '../../core/i18n/i18n-test';
import { LangService } from '../../core/i18n/lang';
import { PROFILE } from '../../core/profile';
import { LOG_ENTRIES } from '../../core/services/log-entries';
import { ProjectService } from '../../core/services/project.service';
import { History } from './history';

describe('History', () => {
  let fixture: ComponentFixture<History>;
  let el: HTMLElement;
  let projects: ProjectService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [History],
      providers: [...i18nTestProviders()],
    }).compileComponents();
    projects = TestBed.inject(ProjectService);
    fixture = TestBed.createComponent(History);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  const rows = () => [...el.querySelectorAll<HTMLElement>('li.entry')];

  it('pinta todas las entradas en el orden de los datos, todas desplegadas', () => {
    expect(rows()).toHaveLength(LOG_ENTRIES.length);
    const titles = rows().map((r) => r.querySelector('h3')!.textContent);
    expect(titles[0]).toBe('invest-ai');
    expect(titles.at(-1)).toBe('Sistemas Microinformáticos y Redes');
    expect(el.querySelectorAll('.is-folded')).toHaveLength(0);
  });

  it('una tecnología activa pliega las entradas que no la usan y deja inertes sus textos', async () => {
    projects.toggle('go');
    fixture.detectChanges();
    const open = rows().filter((r) => !r.classList.contains('is-folded'));
    expect(open.map((r) => r.querySelector('h3')!.textContent)).toEqual([
      'URL State Monitor',
      'Suite de gestión de personal (HCM)',
    ]);
    const folded = rows().filter((r) => r.classList.contains('is-folded'));
    expect(folded).toHaveLength(LOG_ENTRIES.length - 2);
    expect(folded.every((r) => r.querySelector('.full')!.hasAttribute('inert'))).toBe(true);
    expect(folded.every((r) => !r.querySelector('.ghost')!.hasAttribute('inert'))).toBe(true);
  });

  it('el commit raíz cierra el grafo y los proyectos se alternan entre los carriles 1 y 2', () => {
    expect(rows().at(-1)!.classList.contains('is-root')).toBe(true);
    const lanes = rows().map((r) => r.dataset['lane']);
    const projectLanes = LOG_ENTRIES.flatMap((e, i) => (e.kind === 'project' ? [lanes[i]] : []));
    expect(projectLanes.slice(0, 4)).toEqual(['1', '2', '1', '2']);
    expect(lanes.filter((l) => l === '0')).toHaveLength(
      LOG_ENTRIES.filter((e) => e.kind !== 'project').length,
    );
  });

  it('marca la evidencia con su etiqueta y los enlaces externos abren con noopener', () => {
    const cuentas = rowOf('cuentas');
    expect(cuentas.querySelector('.ev')?.textContent).toContain('Código público');
    expect(cuentas.querySelector('.node')?.getAttribute('data-e')).toBe('code');
    const link = cuentas.querySelector<HTMLAnchorElement>('.actions a')!;
    expect(link.target).toBe('_blank');
    expect(link.rel).toBe('noopener noreferrer');
    const nexora = rowOf('nexora');
    expect(nexora.querySelector('.ev')?.textContent).toContain('Código bajo petición');
  });

  it('formatea las fechas según el idioma', () => {
    expect(rowOf('cuentas').querySelector('.meta')?.textContent).toContain('sep – oct 2026');
  });

  const rowOf = (id: string) => rows()[LOG_ENTRIES.findIndex((e) => e.id === id)];
  const inert = (row: HTMLElement, part: '.full' | '.ghost') =>
    row.querySelector(part)!.hasAttribute('inert');

  it('con un filtro que solo casa con una entrada, esa queda operable y el resto inerte', () => {
    expect(LOG_ENTRIES.filter((e) => e.stack.includes('redis')).map((e) => e.id)).toEqual([
      'cuadre',
    ]);
    projects.toggle('redis');
    fixture.detectChanges();

    const match = rowOf('cuadre');
    expect(match.classList.contains('is-folded')).toBe(false);
    expect(inert(match, '.full')).toBe(false);
    expect(inert(match, '.ghost')).toBe(true);
    const others = rows().filter((r) => r !== match);
    expect(others).toHaveLength(LOG_ENTRIES.length - 1);
    expect(others.every((r) => r.classList.contains('is-folded') && inert(r, '.full'))).toBe(true);
    expect(others.every((r) => !inert(r, '.ghost'))).toBe(true);

    // Una tecnología que nadie usa pliega todo; al quitar el filtro vuelve todo a ser operable.
    projects.selectedFilters.set(['cobol']);
    fixture.detectChanges();
    expect(el.querySelectorAll('.is-folded')).toHaveLength(LOG_ENTRIES.length);
    projects.clear();
    fixture.detectChanges();
    expect(el.querySelectorAll('.is-folded')).toHaveLength(0);
    expect(el.querySelectorAll('.full[inert]')).toHaveLength(0);
    expect(el.querySelectorAll('.ghost:not([inert])')).toHaveLength(0);
  });

  it('todos los enlaces externos son los de los datos y abren fuera con noopener noreferrer', () => {
    const links = [...el.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')];
    expect(el.querySelectorAll('a[href]:not([href^="http"]):not(.request)')).toHaveLength(0);
    const expected = LOG_ENTRIES.flatMap((e) => [e.repoUrl, e.demoUrl]).filter(Boolean);
    expect(links.map((a) => a.getAttribute('href'))).toEqual(expected);
    expect(links.every((a) => a.target === '_blank' && a.rel === 'noopener noreferrer')).toBe(true);
  });

  it('las entradas privadas no pintan enlaces externos y ofrecen pedir el código; el resto no', () => {
    const projects = LOG_ENTRIES.filter((e) => e.kind === 'project');
    expect(projects.some((e) => e.evidence === 'private')).toBe(true);
    for (const e of LOG_ENTRIES) {
      const row = rowOf(e.id);
      const links = row.querySelectorAll('.actions a');
      const request = row.querySelector('.request');
      if (e.evidence === 'private') {
        expect(links, e.id).toHaveLength(1);
        expect(links[0], e.id).toBe(request);
        expect(request?.textContent, e.id).toContain('Pedir el código');
        expect(row.querySelector('.ev')?.textContent, e.id).toContain('Código bajo petición');
      } else {
        expect(request, e.id).toBeNull();
      }
      if (e.evidence === 'code') expect(links[0].textContent, e.id).toContain('Código');
      if (e.evidence === 'demo') expect(links[0].textContent, e.id).toContain('Ver demo');
      if (e.kind !== 'project') {
        expect(row.querySelector('.actions, .ev'), e.id).toBeNull();
      }
    }
  });

  it('al cambiar a inglés se repintan fechas, evidencia y textos sin recargar', async () => {
    await TestBed.inject(LangService).toggle();
    fixture.detectChanges();
    expect(rowOf('cuentas').querySelector('.meta')?.textContent).toContain('Sep – Oct 2026');
    expect(rowOf('cuentas').querySelector('.ev')?.textContent).toContain('Public code');
    expect(rowOf('nexora').querySelector('.ev')?.textContent).toContain('Code on request');
    expect(rowOf('nexora').querySelector('.request')?.textContent).toContain('Request the code');
    expect(rowOf('nexora').querySelector('.request')?.getAttribute('href')).toContain(
      encodeURIComponent('Nexora source code'),
    );
    expect(rowOf('smr').querySelector('h3')?.textContent).toBe(
      'Microcomputer Systems and Networks',
    );
  });

  it('«Pedir el código» es un mailto a Sergio con el proyecto en el asunto y sin pestaña nueva', () => {
    const privates = LOG_ENTRIES.filter((e) => e.evidence === 'private');
    expect(privates.map((e) => e.id)).toEqual(['invest-ai', 'nexora', 'cuadre', 'hcm']);
    for (const e of privates) {
      const link = rowOf(e.id).querySelector<HTMLAnchorElement>('a.request')!;
      const title = rowOf(e.id).querySelector('h3')!.textContent;
      expect(link.getAttribute('href'), e.id).toBe(
        `mailto:${PROFILE.email}?subject=${encodeURIComponent(`Código de ${title}`)}`,
      );
      expect(link.hasAttribute('target'), e.id).toBe(false);
      expect(link.querySelector('svg use')?.getAttribute('href'), e.id).toContain('#icon-mail');
    }
    // El título con paréntesis y espacios viaja codificado, no a medias.
    expect(rowOf('hcm').querySelector('a.request')!.getAttribute('href')).toContain(
      'Suite%20de%20gesti%C3%B3n%20de%20personal%20(HCM)',
    );
  });

  it('la captura de cuentas avisa de que son datos de demostración; las demás no', () => {
    const caption = (id: string) => rowOf(id).querySelector('.shot figcaption');
    expect(caption('cuentas')?.textContent).toBe('Datos de demostración');
    expect(rowOf('cuentas').querySelector('.shot img')?.getAttribute('alt')).toBe(
      'Captura de Cuentas, con datos de demostración',
    );
    for (const id of ['cita-perfecta', 'atelier-ledger']) {
      expect(rowOf(id).querySelector('.shot img'), id).not.toBeNull();
      expect(caption(id), id).toBeNull();
      expect(rowOf(id).querySelector('.shot img')?.getAttribute('alt'), id).toMatch(/^Captura de /);
      expect(rowOf(id).querySelector('.shot img')?.getAttribute('alt'), id).not.toContain(
        'demostración',
      );
    }
  });

  it('al señalar un commit con el ratón o el foco, su rama se ilumina; al salir, se apaga', async () => {
    const lit = () => rows().filter((r) => r.classList.contains('is-lit'));
    rowOf('hcm').dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    expect(lit()).toEqual([rowOf('hcm')]);
    expect(projects.isTechLit('go')).toBe(true);
    rowOf('hcm').dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();
    expect(lit()).toEqual([]);

    rowOf('cuadre')
      .querySelector('h3')!
      .dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    fixture.detectChanges();
    expect(lit()).toEqual([rowOf('cuadre')]);
    rowOf('cuadre')
      .querySelector('h3')!
      .dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    fixture.detectChanges();
    expect(lit()).toEqual([]);
  });

  it('al señalar una tecnología se iluminan los commits que la usan, sin plegar nada', () => {
    projects.highlightTech('go');
    fixture.detectChanges();
    const lit = rows().filter((r) => r.classList.contains('is-lit'));
    expect(lit).toEqual([rowOf('url-state-monitor'), rowOf('hcm')]);
    expect(el.querySelectorAll('.is-folded')).toHaveLength(0);
  });

  it('un commit plegado por el filtro no se ilumina', () => {
    projects.toggle('go');
    fixture.detectChanges();
    rowOf('cuentas').dispatchEvent(new MouseEvent('mouseenter'));
    projects.highlightTech('rust');
    fixture.detectChanges();
    expect(rowOf('cuentas').classList.contains('is-lit')).toBe(false);
    expect(rowOf('hcm').classList.contains('is-lit')).toBe(false);
  });

  it('al señalar un commit se marcan los ids de cada fila que casan con sus tecnologías', () => {
    const lit = (id: string) =>
      [...rowOf(id).querySelectorAll('.ids li.lit')].map((li) => li.textContent!.trim());
    expect(el.querySelectorAll('.ids li.lit')).toHaveLength(0);

    projects.highlightEntry('url-state-monitor');
    fixture.detectChanges();
    expect(lit('url-state-monitor')).toEqual(['go', 'mysql']);
    expect(lit('hcm')).toEqual(['go']); // otro commit con la misma tecnología
    expect(lit('cuentas')).toEqual([]);

    projects.highlightTech('rust');
    fixture.detectChanges();
    expect(lit('cuentas')).toEqual(['rust']);
    expect(lit('hcm')).toEqual([]);
    expect(lit('url-state-monitor')).toEqual([]);

    projects.clearHighlight();
    fixture.detectChanges();
    expect(el.querySelectorAll('.ids li.lit')).toHaveLength(0);
  });

  it('el id iluminado es distinto del filtro activo: no es un relleno', () => {
    projects.toggle('go');
    projects.highlightTech('rust');
    fixture.detectChanges();
    const ids = (id: string) => [...rowOf(id).querySelectorAll('.ids li')];
    const go = ids('hcm').find((li) => li.textContent!.trim() === 'go')!;
    expect(go.classList.contains('on')).toBe(true);
    expect(go.classList.contains('lit')).toBe(false);
    expect(ids('hcm').some((li) => li.classList.contains('lit'))).toBe(false);
  });
});
