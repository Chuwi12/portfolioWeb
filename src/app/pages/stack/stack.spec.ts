import { ComponentFixture, TestBed } from '@angular/core/testing';
import { i18nTestProviders } from '../../core/i18n/i18n-test';
import { STACK_GROUPS } from '../../core/profile';
import { LOG_ENTRIES } from '../../core/services/log-entries';
import { ProjectService } from '../../core/services/project.service';
import { Stack } from './stack';

describe('Stack', () => {
  let fixture: ComponentFixture<Stack>;
  let el: HTMLElement;
  let projects: ProjectService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stack],
      providers: [...i18nTestProviders()],
    }).compileComponents();
    projects = TestBed.inject(ProjectService);
    fixture = TestBed.createComponent(Stack);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  const chip = (tech: string) =>
    [...el.querySelectorAll<HTMLButtonElement>('.chip')].find((b) =>
      b.textContent!.trim().startsWith(`${tech} `),
    )!;

  it('muestra cada tecnología de los grupos con su número real de commits', () => {
    const techs = STACK_GROUPS.flatMap((g) => g.techs);
    expect(el.querySelectorAll('.chip')).toHaveLength(techs.length);
    expect(chip('rust').querySelector('.count')?.textContent).toBe(String(projects.count('rust')));
  });

  it('conmuta el filtro y muestra `git log -- rust go` con N de todos los commits', async () => {
    chip('rust').click();
    chip('go').click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(chip('rust').getAttribute('aria-pressed')).toBe('true');
    expect(el.querySelector('.cmd')?.textContent).toBe('git log -- rust go');
    expect(el.querySelector('[role="status"]')?.textContent).toContain(
      `${projects.shown()} de ${LOG_ENTRIES.length} commits`,
    );
  });

  it('el botón de quitar filtro lo vacía', async () => {
    chip('go').click();
    fixture.detectChanges();
    el.querySelector<HTMLButtonElement>('.clear')!.click();
    fixture.detectChanges();
    expect(projects.selectedFilters()).toEqual([]);
    expect(el.querySelector('.clear')).toBeNull();
  });

  const press = async (tech: string) => {
    chip(tech).click();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const pressed = () =>
    [...el.querySelectorAll<HTMLButtonElement>('.chip')]
      .filter((b) => b.getAttribute('aria-pressed') === 'true')
      .map((b) => b.textContent!.trim().split(/\s/)[0]);
  const status = () => el.querySelector('[role="status"]')!.textContent!;
  const usingAny = (...techs: string[]) =>
    LOG_ENTRIES.filter((e) => e.stack.some((t) => techs.includes(t))).length;

  it('cada botón lleva aria-pressed (nunca ausente) y cambia al pulsarlo', async () => {
    const all = [...el.querySelectorAll('.chip')];
    expect(all.every((b) => b.getAttribute('aria-pressed') === 'false')).toBe(true);

    await press('rust');
    expect(pressed()).toEqual(['rust']);
    await press('go');
    expect(pressed().sort()).toEqual(['go', 'rust']);
    await press('rust');
    expect(pressed()).toEqual(['go']);
    expect(all.every((b) => b.hasAttribute('aria-pressed'))).toBe(true);
  });

  it('la línea de estado cuenta N del total con el N real y «Quitar filtro» la devuelve al inicio', async () => {
    const hint = status();
    expect(el.querySelector('.cmd')).toBeNull();

    await press('rust');
    expect(status()).toContain(`${usingAny('rust')} de ${LOG_ENTRIES.length} commits`);
    await press('go');
    expect(el.querySelector('.cmd')?.textContent).toBe('git log -- rust go');
    expect(status()).toContain(`${usingAny('rust', 'go')} de ${LOG_ENTRIES.length} commits`);
    await press('rust');
    expect(el.querySelector('.cmd')?.textContent).toBe('git log -- go');
    expect(status()).toContain(`${usingAny('go')} de ${LOG_ENTRIES.length} commits`);

    el.querySelector<HTMLButtonElement>('.clear')!.click();
    fixture.detectChanges();
    expect(status().trim()).toBe(hint.trim());
    expect(el.querySelector('.cmd')).toBeNull();
    expect(pressed()).toEqual([]);
  });

  it('el nombre accesible de cada botón lleva su recuento, en singular si es 1', () => {
    expect(chip('rust').getAttribute('aria-label')).toBe(`rust, ${usingAny('rust')} commits`);
    expect(usingAny('mysql')).toBe(1);
    expect(chip('mysql').getAttribute('aria-label')).toBe('mysql, 1 commit');
  });

  it('el ratón o el foco en un chip lo ilumina (contorno, no relleno) y no filtra', async () => {
    chip('rust').dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    expect(chip('rust').classList.contains('is-lit')).toBe(true);
    expect(chip('rust').getAttribute('aria-pressed')).toBe('false');
    expect(projects.selectedFilters()).toEqual([]);
    chip('rust').dispatchEvent(new MouseEvent('mouseleave'));
    chip('go').dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    fixture.detectChanges();
    expect([...el.querySelectorAll('.chip.is-lit')]).toEqual([chip('go')]);
    chip('go').dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    fixture.detectChanges();
    expect(el.querySelectorAll('.chip.is-lit')).toHaveLength(0);
  });

  it('señalar un commit ilumina los chips de sus tecnologías', () => {
    projects.highlightEntry('url-state-monitor');
    fixture.detectChanges();
    const lit = [...el.querySelectorAll('.chip.is-lit')].map(
      (c) => c.textContent!.trim().split(' ')[0],
    );
    expect(lit.sort()).toEqual(['go', 'mysql']);
  });

  it('la pista de atajos está en el stack', () => {
    expect(el.querySelector('.hint')?.textContent).toContain('Pulsa ? para ver los atajos');
  });
});
