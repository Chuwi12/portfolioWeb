import { TestBed } from '@angular/core/testing';
import { locales } from '../i18n/locales';
import { STACK_GROUPS } from '../profile';
import { LOG_ENTRIES } from './log-entries';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    service = TestBed.inject(ProjectService);
  });

  it('sin filtro deja pasar todas las entradas', () => {
    expect(service.entries.filter((e) => service.matches(e))).toHaveLength(LOG_ENTRIES.length);
  });

  it('filtra por tecnología sin distinguir mayúsculas', () => {
    service.selectedFilters.set(['Go']);
    expect(service.entries.filter((e) => service.matches(e)).map((e) => e.id)).toEqual([
      'url-state-monitor',
      'hcm',
    ]);
  });

  it('cuenta las entradas que usan una tecnología', () => {
    expect(service.count('rust')).toBe(LOG_ENTRIES.filter((e) => e.stack.includes('rust')).length);
    expect(service.count('Go')).toBe(2);
  });

  it('conmuta tecnologías, cuenta las que pasan y quita el filtro', () => {
    service.toggle('rust');
    service.toggle('go');
    expect(service.isActive('Rust')).toBe(true);
    expect(service.shown()).toBe(service.entries.filter((e) => service.matches(e)).length);
    service.toggle('rust');
    expect(service.selectedFilters()).toEqual(['go']);
    service.clear();
    expect(service.shown()).toBe(LOG_ENTRIES.length);
  });

  const idsUsing = (...techs: string[]) =>
    LOG_ENTRIES.filter((e) => techs.some((t) => e.stack.includes(t))).map((e) => e.id);
  const passing = () => service.entries.filter((e) => service.matches(e)).map((e) => e.id);

  it('count de cada tecnología del stack coincide con las entradas que la usan', () => {
    for (const tech of STACK_GROUPS.flatMap((g) => g.techs)) {
      expect(service.count(tech), tech).toBe(idsUsing(tech).length);
    }
    expect(service.count('cobol')).toBe(0);
  });

  it('con varios filtros una entrada pasa si usa alguno, y shown no la cuenta dos veces', () => {
    service.selectedFilters.set(['rust', 'go']);
    expect(passing()).toEqual(idsUsing('rust', 'go'));
    expect(passing()).toContain('url-state-monitor'); // solo usa go
    expect(passing()).toContain('cuadre'); // solo usa rust

    // Rust y TypeScript se solapan (cuentas usa ambas): la unión es menor que la suma.
    service.selectedFilters.set(['rust', 'typescript']);
    expect(idsUsing('rust').filter((id) => idsUsing('typescript').includes(id))).not.toEqual([]);
    expect(passing()).toEqual(idsUsing('rust', 'typescript'));
    expect(service.shown()).toBe(idsUsing('rust', 'typescript').length);
    expect(service.shown()).toBeLessThan(service.count('rust') + service.count('typescript'));
  });

  it('conmutar dos veces la misma tecnología deja el filtro como estaba', () => {
    service.toggle('go');
    service.toggle('rust');
    service.toggle('rust');
    expect(service.selectedFilters()).toEqual(['go']);
    service.toggle('GO'); // otra grafía de la misma tecnología la quita
    expect(service.selectedFilters()).toEqual([]);
    expect(passing()).toHaveLength(LOG_ENTRIES.length);
  });

  it('clear vacía el filtro aunque haya varias tecnologías activas', () => {
    service.toggle('rust');
    service.toggle('go');
    service.toggle('react');
    service.clear();
    expect(service.selectedFilters()).toEqual([]);
    expect(service.shown()).toBe(LOG_ENTRIES.length);
    expect(service.isActive('rust')).toBe(false);
  });

  it.each(['TailwindCSS', 'Tailwind CSS', 'tailwind-css'])(
    '%s se trata como tailwindcss: cuenta, filtra y se quita igual',
    (variant) => {
      expect(service.count(variant)).toBe(idsUsing('tailwindcss').length);
      expect(service.count(variant)).toBeGreaterThan(0);
      service.toggle(variant);
      expect(service.isActive('tailwindcss')).toBe(true);
      expect(passing()).toEqual(idsUsing('tailwindcss'));
      service.toggle('tailwindcss');
      expect(service.selectedFilters()).toEqual([]);
    },
  );
});

describe('resaltado (ratón y foco)', () => {
  let service: ProjectService;
  const byId = (id: string) => LOG_ENTRIES.find((e) => e.id === id)!;

  beforeEach(() => {
    service = TestBed.inject(ProjectService);
  });

  it('sin nada señalado no resalta nada', () => {
    expect(service.highlight()).toBeNull();
    expect(LOG_ENTRIES.some((e) => service.isEntryLit(e))).toBe(false);
    expect(service.isTechLit('rust')).toBe(false);
  });

  it('señalar un commit resalta ese commit y las tecnologías que usa, y nada más', () => {
    service.highlightEntry('url-state-monitor');
    expect(LOG_ENTRIES.filter((e) => service.isEntryLit(e)).map((e) => e.id)).toEqual([
      'url-state-monitor',
    ]);
    expect(['go', 'mysql'].every((t) => service.isTechLit(t))).toBe(true);
    expect(['rust', 'react', 'docker'].some((t) => service.isTechLit(t))).toBe(false);
  });

  it('señalar una tecnología resalta los commits que la usan, con cualquier mayúscula', () => {
    service.highlightTech('Go');
    expect(LOG_ENTRIES.filter((e) => service.isEntryLit(e)).map((e) => e.id)).toEqual([
      'url-state-monitor',
      'hcm',
    ]);
    expect(service.isTechLit('go')).toBe(true);
    expect(service.isTechLit('rust')).toBe(false);
  });

  it('es un resaltado, no un filtro: no pliega nada y se limpia', () => {
    service.highlightTech('rust');
    expect(service.shown()).toBe(LOG_ENTRIES.length);
    expect(service.selectedFilters()).toEqual([]);
    expect(service.entries.every((e) => service.matches(e))).toBe(true);
    service.clearHighlight();
    expect(service.highlight()).toBeNull();
    expect(service.isEntryLit(byId('cuentas'))).toBe(false);
  });
});

describe('textos del historial', () => {
  const entryTexts = {
    es: locales.es.translation.log.entries as Record<string, Record<string, string>>,
    en: locales.en.translation.log.entries as Record<string, Record<string, string>>,
  };

  it.each(['es', 'en'] as const)('cada entrada tiene sus textos en %s', (lang) => {
    const missing = LOG_ENTRIES.flatMap((e) => {
      const needed = e.kind === 'project' ? ['title', 'summary'] : ['title', 'summary', 'role'];
      if (e.kind === 'job') needed.push('org');
      return needed.filter((k) => !entryTexts[lang][e.id]?.[k]).map((k) => `${e.id}.${k}`);
    });
    expect(missing).toEqual([]);
    expect(Object.keys(entryTexts[lang]).sort()).toEqual(LOG_ENTRIES.map((e) => e.id).sort());
  });
});
