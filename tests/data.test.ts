import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { FAQ, NETS, PROFILE, PROJECTS, ROLES } from '../src/data';
import { DEMO, GROUP_LABEL, UI } from '../src/i18n/ui';
import { vetoed } from './vetoed';

const netIds = new Set(NETS.map((n) => n.id));
const zones = ['ai', 'platform'] as const;

type Obj = Record<string, unknown>;

/** Cada L10n (objeto con `es` o `en`) de un valor, con su ruta. */
function* l10ns(value: unknown, path = ''): Generator<[string, Obj]> {
  if (!value || typeof value !== 'object') return;
  const o = value as Obj;
  if ('es' in o || 'en' in o) {
    yield [path, o];
    return;
  }
  for (const [k, v] of Object.entries(o)) yield* l10ns(v, `${path}.${k}`);
}

/** Cada cadena de un valor, con su ruta; se salta los metadatos de imagen (rutas del sistema). */
function* strings(value: unknown, path = ''): Generator<[string, string]> {
  if (typeof value === 'string') yield [path, value];
  else if (value && typeof value === 'object') {
    const o = value as Obj;
    if ('src' in o && 'width' in o && 'height' in o) return;
    for (const [k, v] of Object.entries(o)) yield* strings(v, `${path}.${k}`);
  }
}

const content = { PROJECTS, ROLES, FAQ, PROFILE };
/** Todo texto que acaba en la página, sin URLs ni rutas de ficheros. */
const prose = [
  ...strings({ ...content, UI, DEMO, GROUP_LABEL }),
  ...NETS.map((n): [string, string] => [`NETS.${n.id}`, n.label]),
].filter(([path]) => !/\.(repoUrl|demoUrl|github|linkedin|cv|email|phone)(\.|$)/.test(path));

describe('redes (NETS)', () => {
  it('los ids son únicos y son slugs válidos para ?tec=<id>', () => {
    expect(netIds.size).toBe(NETS.length);
    for (const id of netIds) expect(id, id).toMatch(/^[a-z0-9]+$/);
  });

  it('toda red de un proyecto o puesto existe en NETS, sin repetirse', () => {
    for (const x of [...PROJECTS, ...ROLES]) {
      for (const id of x.nets)
        expect(netIds.has(id), `${x.id}: red desconocida «${id}»`).toBe(true);
      expect(new Set(x.nets).size, `${x.id}: redes repetidas`).toBe(x.nets.length);
    }
  });

  it('toda red de NETS la usa al menos un proyecto o puesto', () => {
    const used = new Set([...PROJECTS, ...ROLES].flatMap((x) => x.nets));
    expect(NETS.filter((n) => !used.has(n.id)).map((n) => n.id)).toEqual([]);
  });
});

describe('textos bilingües', () => {
  it('todo L10n tiene es y en como cadenas no vacías, y nada más', () => {
    let seen = 0;
    for (const [path, o] of l10ns(content)) {
      seen++;
      expect(Object.keys(o).sort(), path).toEqual(['en', 'es']);
      for (const lang of ['es', 'en']) {
        expect(typeof o[lang], `${path}.${lang}`).toBe('string');
        expect((o[lang] as string).trim(), `${path}.${lang} vacío`).not.toBe('');
      }
    }
    // Si el recorrido dejara de encontrar textos, el test pasaría en vacío.
    expect(seen).toBeGreaterThan(100);
  });

  it('las cifras de cada par es/en coinciden (1.200 = 1,200; 61,2 = 61.2)', () => {
    // El inglés añade el nivel EQF de los grados, que el español no nombra.
    const nums = (s: string) =>
      (s.replace(/\(EQF \d\)/g, '').match(/\d+(?:[.,]\d+)*/g) ?? [])
        .map((n) => n.replace(/[.,]/g, ''))
        .sort();
    for (const [path, o] of l10ns(content)) {
      expect(nums(o.es as string), path).toEqual(nums(o.en as string));
    }
  });

  it('no aparecen términos vetados', () => {
    expect(prose.length).toBeGreaterThan(400);
    for (const [path, s] of prose) expect(vetoed(s), path).toEqual([]);
  });

  it('respeta las reglas de voz de docs/copy-home.md (frases prohibidas, sin «!», sin rayas)', () => {
    const banned =
      /revolucion|potenci|de vanguardia|sin esfuerzo|transforma tu flujo|siguiente nivel|aprovecha el poder|talla mundial|supercharge|cutting-edge|effortless|next level|next-level|world-class|harness the power|take .* to the next/i;
    for (const [path, s] of prose) {
      expect(s, path).not.toMatch(banned);
      expect(s, `${path}: exclamación`).not.toMatch(/!/);
      expect(s, `${path}: raya dentro de frase`).not.toMatch(/[—–]/);
    }
  });
});

describe('proyectos', () => {
  it('ids y designadores únicos; los ids no chocan con los de las secciones ni los puestos', () => {
    const reserved = [
      'main',
      'menu',
      'proyectos',
      'plataformas',
      'stack',
      'trayectoria',
      'preguntas',
      'contacto',
    ];
    const ids = [...PROJECTS.map((p) => p.id), ...ROLES.map((r) => r.id)];
    expect(new Set(ids).size, 'ids repetidos entre proyectos y puestos').toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^[a-z0-9-]+$/);
      expect(reserved).not.toContain(id);
    }
    const refs = PROJECTS.map((p) => p.ref);
    expect(new Set(refs).size).toBe(refs.length);
    for (const ref of refs) expect(ref).toMatch(/^U([2-9]|\d{2,})$/);
  });

  it('de 2 a 4 highlights, y alt en los dos idiomas cuando hay captura', () => {
    for (const p of PROJECTS) {
      expect(p.highlights.length, p.id).toBeGreaterThanOrEqual(2);
      expect(p.highlights.length, p.id).toBeLessThanOrEqual(4);
      if (p.image) expect(p.image.alt.es.length + p.image.alt.en.length, p.id).toBeGreaterThan(20);
    }
  });

  it("evidence: 'code' exige repoUrl, 'demo' exige demoUrl, 'private' ninguno de los dos", () => {
    for (const p of PROJECTS) {
      if (p.evidence === 'code') expect(p.repoUrl, p.id).toBeTruthy();
      if (p.evidence === 'demo') expect(p.demoUrl, p.id).toBeTruthy();
      if (p.evidence === 'private') {
        expect(p.repoUrl, `${p.id}: URL ignorada en un proyecto privado`).toBeUndefined();
        expect(p.demoUrl, `${p.id}: URL ignorada en un proyecto privado`).toBeUndefined();
      }
    }
  });

  it('las URLs son https:// y se pueden parsear', () => {
    const urls = [
      ...PROJECTS.flatMap((p) => [p.repoUrl, p.demoUrl]),
      PROFILE.github,
      PROFILE.linkedin,
    ].filter((u): u is string => u !== undefined);
    expect(urls.length).toBeGreaterThan(8);
    for (const u of urls) {
      expect(u, u).toMatch(/^https:\/\//);
      expect(() => new URL(u), u).not.toThrow();
      expect(u, `${u}: espacios o barra final sobrante`).not.toMatch(/\s|\/$/);
    }
  });

  it('cada zona tiene a lo sumo un destacado y, si lo hay, va primero (planZone solo mira el primero)', () => {
    for (const zone of zones) {
      const list = PROJECTS.filter((p) => p.zone === zone);
      expect(list.length, zone).toBeGreaterThan(0);
      const featured = list.filter((p) => p.featured);
      expect(featured.length, zone).toBeLessThanOrEqual(1);
      if (featured.length) expect(list[0], zone).toBe(featured[0]);
    }
  });

  it('dentro de cada zona, tras el destacado, de inicio más reciente a más antiguo', () => {
    for (const zone of zones) {
      const rest = PROJECTS.filter((p) => p.zone === zone && !p.featured).map(
        (p) => p.period.start,
      );
      expect(rest, zone).toEqual([...rest].sort().reverse());
    }
  });
});

describe('periodos', () => {
  const periods = [
    ...PROJECTS.map((p) => ({ id: p.id, period: p.period })),
    ...ROLES.flatMap((r) => (r.period ? [{ id: r.id, period: r.period }] : [])),
  ];
  const FORMAT = /^(\d{4})(?:-(0[1-9]|1[0-2]))?$/;
  /** Mes absoluto; un año suelto cuenta como enero. */
  const index = (v: string) => {
    const [, y = '0', m] = FORMAT.exec(v) ?? [];
    return Number(y) * 12 + (m ? Number(m) - 1 : 0);
  };

  it('formato YYYY o YYYY-MM, con el mismo detalle en inicio y fin, y fin >= inicio', () => {
    expect(periods.length).toBeGreaterThan(10);
    for (const { id, period } of periods) {
      expect(period.start, `${id}.start`).toMatch(FORMAT);
      if (period.end === undefined) continue;
      expect(period.end, `${id}.end`).toMatch(FORMAT);
      // formatPeriod escribe el fin con el detalle del inicio: mezclarlos da «ene» inventado.
      expect(period.end.includes('-'), `${id}: inicio y fin con distinto detalle`).toBe(
        period.start.includes('-'),
      );
      expect(index(period.end), `${id}: fin anterior al inicio`).toBeGreaterThanOrEqual(
        index(period.start),
      );
    }
  });

  it('los puestos van de más reciente a más antiguo dentro de cada tipo, y sin fechas al final', () => {
    for (const kind of ['job', 'education'] as const) {
      const starts = ROLES.filter((r) => r.kind === kind).map((r) => r.period?.start ?? '');
      const dated = starts.filter(Boolean);
      expect(dated, kind).toEqual([...dated].sort().reverse());
      expect(starts.slice(0, dated.length), `${kind}: los puestos sin fecha van al final`).toEqual(
        dated,
      );
    }
  });
});

describe('FAQ y copy', () => {
  const docs = readFileSync(new URL('../docs/copy-home.md', import.meta.url), 'utf8');

  it('hay 6 preguntas, cada una con pregunta y respuesta distintas', () => {
    expect(FAQ).toHaveLength(6);
    expect(new Set(FAQ.map((f) => f.q.es)).size).toBe(6);
  });

  it('coincide literalmente con la tabla de docs/copy-home.md §7', () => {
    const section = docs.split(/^## 7\./m)[1]?.split(/^## 8\./m)[0] ?? '';
    const rows = [...section.matchAll(/^\| \*\*(.+?)\*\* (.+?) \| \*\*(.+?)\*\* (.+?) \|$/gm)];
    expect(rows).toHaveLength(FAQ.length);
    rows.forEach(([, qEs, aEs, qEn, aEn], i) => {
      expect(FAQ[i]?.q, `pregunta ${i + 1}`).toEqual({ es: qEs, en: qEn });
      expect(FAQ[i]?.a, `respuesta ${i + 1}`).toEqual({ es: aEs, en: aEn });
    });
  });

  it('title y description SEO coinciden con docs/copy-home.md §9', () => {
    const section = docs.split(/^## 9\./m)[1] ?? '';
    const found = Object.fromEntries(
      [...section.matchAll(/^- (ES|EN) (title|description): «([^»]+)»/gm)].map(([, l, k, v]) => [
        `${l}.${k}`,
        (v ?? '').replace(/\s+/g, ' '),
      ]),
    );
    expect(found).toEqual({
      'ES.title': UI.es.seoTitle,
      'ES.description': UI.es.seoDescription,
      'EN.title': UI.en.seoTitle,
      'EN.description': UI.en.seoDescription,
    });
  });
});
