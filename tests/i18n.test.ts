import { describe, expect, it } from 'vitest';
import type { NetGroup } from '../src/data';
import { NETS } from '../src/data';
import { DEMO, GROUP_LABEL, GROUP_ORDER, UI } from '../src/i18n/ui';

const keys = (o: object) => Object.keys(o).sort();
const placeholders = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort();

describe('ui.ts', () => {
  it('ES y EN tienen exactamente las mismas claves, todas con texto', () => {
    expect(keys(UI.en)).toEqual(keys(UI.es));
    for (const lang of ['es', 'en'] as const)
      for (const [k, v] of Object.entries(UI[lang])) expect(v.trim(), `${lang}.${k}`).not.toBe('');
  });

  it('las plantillas llevan los mismos {marcadores} en los dos idiomas', () => {
    for (const k of Object.keys(UI.es) as (keyof typeof UI.es)[])
      expect(placeholders(UI.en[k]), k).toEqual(placeholders(UI.es[k]));
    // main.ts rellena {n} y {tech}; Contact y Project, {email}, {title} y {start}.
    expect(placeholders(UI.es.stackMany)).toEqual(['{n}', '{tech}']);
    expect(placeholders(UI.es.stackOne)).toEqual(['{tech}']);
  });

  it('ningún texto se queda sin traducir (salvo nombres que son iguales en los dos idiomas)', () => {
    const same = (Object.keys(UI.es) as (keyof typeof UI.es)[]).filter(
      (k) => UI.es[k] === UI.en[k],
    );
    expect(same.sort()).toEqual(['contactEmail', 'navStack', 'stackTitle']);
  });

  it('htmlLang y locale corresponden a cada idioma', () => {
    expect(UI.es.htmlLang).toBe('es');
    expect(UI.en.htmlLang).toBe('en');
    expect(UI.es.locale).toBe('es_ES');
    expect(UI.en.locale).toBe('en_US');
  });
});

describe('grupos del stack', () => {
  it('GROUP_LABEL cubre los mismos grupos que GROUP_ORDER y que usa NETS, en los dos idiomas', () => {
    const groups = [...GROUP_ORDER].sort();
    expect(keys(GROUP_LABEL.es)).toEqual(groups);
    expect(keys(GROUP_LABEL.en)).toEqual(groups);
    expect(new Set(GROUP_ORDER).size).toBe(GROUP_ORDER.length);
    for (const g of new Set(NETS.map((n) => n.group)))
      expect(GROUP_ORDER, `grupo sin orden: ${g}`).toContain(g as NetGroup);
  });
});

describe('DEMO (lo que Demo.astro y demo.ts esperan)', () => {
  const figures = (s: string) => s.match(/\d+(?:[.,]\d+)?/g) ?? [];

  it('ES y EN tienen los mismos campos y los mismos ids de fila', () => {
    expect(keys(DEMO.en)).toEqual(keys(DEMO.es));
    expect(DEMO.en.rows.map((r) => r.id)).toEqual(DEMO.es.rows.map((r) => r.id));
  });

  describe.each(['es', 'en'] as const)('%s', (lang) => {
    const d = DEMO[lang];

    it('la respuesta tiene exactamente una cifra descartada [..] (sin ella demo.ts no arranca)', () => {
      expect(d.answer.match(/\[[^\]]+\]/g)).toHaveLength(1);
    });

    it('cada cita {Dn} apunta a una fila que existe', () => {
      const cites = [...d.answer.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);
      expect(cites.length).toBeGreaterThan(0);
      for (const c of cites)
        expect(
          d.rows.map((r) => r.id),
          c,
        ).toContain(c);
    });

    it('las cifras citadas están en los datos y la descartada no, y el veredicto la nombra', () => {
      const bad = /\[([^\]]+)\]/.exec(d.answer)?.[1] ?? '';
      const rest = d.answer.replace(/\[[^\]]+\]/g, '').replace(/\{[^}]+\}/g, '');
      const data = d.rows.map((r) => r.value).join(' ');
      for (const f of figures(rest))
        expect(data, `cifra «${f}» sin respaldo en los datos`).toContain(f);
      for (const f of figures(bad))
        expect(data, `la cifra inventada «${f}» sí está en los datos`).not.toContain(f);
      expect(d.verdict).toContain(bad);
    });
  });
});
