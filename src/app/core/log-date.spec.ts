import { locales } from './i18n/locales';
import { formatRange } from './log-date';
import { LOG_ENTRIES } from './services/log-entries';

const es = 'ene feb mar abr may jun jul ago sep oct nov dic'.split(' ');
const en = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');

describe('formatRange', () => {
  it('formatea un mes suelto y un año suelto', () => {
    expect(formatRange('2026-09', undefined, es)).toBe('sep 2026');
    expect(formatRange('2024', undefined, es)).toBe('2024');
  });

  it('comprime el año cuando el rango cae dentro de uno', () => {
    expect(formatRange('2026-09', '2026-10', es)).toBe('sep – oct 2026');
  });

  it('repite el año cuando el rango lo cruza', () => {
    expect(formatRange('2025-11', '2026-02', es)).toBe('nov 2025 – feb 2026');
    expect(formatRange('2022', '2024', es)).toBe('2022 – 2024');
  });

  it('usa las abreviaturas del idioma que se le pasa', () => {
    expect(formatRange('2026-09', '2026-10', en)).toBe('Sep – Oct 2026');
    expect(formatRange('2025-11', '2026-02', en)).toBe('Nov 2025 – Feb 2026');
    expect(formatRange('2026-05', undefined, en)).toBe('May 2026');
  });

  it('un rango de un solo punto se pinta como una fecha, no como «sep – sep»', () => {
    expect(formatRange('2026-09', '2026-09', es)).toBe('sep 2026');
    expect(formatRange('2024', '2024', es)).toBe('2024');
  });

  it('acierta en los meses de los extremos (enero y diciembre)', () => {
    expect(formatRange('2026-01', '2026-12', es)).toBe('ene – dic 2026');
    expect(formatRange('2025-12', '2026-01', es)).toBe('dic 2025 – ene 2026');
  });

  it('con un mes fuera de rango no imprime undefined ni NaN', () => {
    for (const bad of ['2026-00', '2026-13']) {
      expect(formatRange(bad, undefined, es)).not.toMatch(/undefined|NaN/);
    }
  });

  it.each([
    ['es', locales.es.translation.log.months],
    ['en', locales.en.translation.log.months],
  ])('los locales %s traen 12 meses y todas las entradas se pintan sin huecos', (_, months) => {
    const list = months.split(' ');
    expect(list).toHaveLength(12);
    for (const e of LOG_ENTRIES) {
      expect(formatRange(e.start, e.end, list), e.id).not.toMatch(/undefined|NaN|^\s|\s$/);
    }
  });
});
