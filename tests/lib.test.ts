import type { ImageMetadata } from 'astro';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { NETS, PROJECTS, type Lang, type Period, type Project } from '../src/data';
import { fill, GROUP_ORDER } from '../src/i18n/ui';
import { groupSpans, planZone, type Placed } from '../src/lib/layout';
import {
  formatPeriod,
  netLabel,
  otherLang,
  SITE,
  stackGroups,
  topNets,
  url,
} from '../src/lib/site';

describe('formatPeriod', () => {
  const fp = (p: Period, lang: Lang) => formatPeriod(p, lang);

  it('un solo mes cuando start === end', () => {
    expect(fp({ start: '2026-03', end: '2026-03' }, 'es')).toBe('mar 2026');
    expect(fp({ start: '2026-03', end: '2026-03' }, 'en')).toBe('Mar 2026');
  });

  it('un solo año cuando start === end y no hay mes', () => {
    expect(fp({ start: '2024', end: '2024' }, 'es')).toBe('2024');
    expect(fp({ start: '2024', end: '2024' }, 'en')).toBe('2024');
  });

  it('sin end es un periodo en curso: «desde …» / «since …»', () => {
    expect(fp({ start: '2026-10' }, 'es')).toBe('desde oct 2026');
    expect(fp({ start: '2026-10' }, 'en')).toBe('since Oct 2026');
    expect(fp({ start: '2024' }, 'es')).toBe('desde 2024');
    expect(fp({ start: '2024' }, 'en')).toBe('since 2024');
  });

  it('años sueltos: rango con los dos años', () => {
    expect(fp({ start: '2022', end: '2024' }, 'es')).toMatch(/^2022\s*[–-]\s*2024$/);
    expect(fp({ start: '2022', end: '2024' }, 'en')).toMatch(/^2022\s*[–-]\s*2024$/);
  });

  it('meses del mismo año: el año se escribe una sola vez; de años distintos, dos', () => {
    expect(fp({ start: '2026-03', end: '2026-05' }, 'es')).toMatch(/^mar\s*[–-]\s*may 2026$/);
    expect(fp({ start: '2026-03', end: '2026-05' }, 'en')).toMatch(/^Mar\s*[–-]\s*May 2026$/);
    expect(fp({ start: '2025-04', end: '2026-05' }, 'es')).toMatch(/^abr 2025\s*[–-]\s*may 2026$/);
    expect(fp({ start: '2025-04', end: '2026-05' }, 'en')).toMatch(/^Apr 2025\s*[–-]\s*May 2026$/);
  });

  it('toda la data real se formatea sin NaN, sin «1970» ni «1900» (valores por defecto de un parseo roto)', () => {
    const all = [
      ...PROJECTS.map((p) => p.period),
      { start: '2022', end: '2024' },
      { start: '2024', end: '2026' },
    ];
    for (const lang of ['es', 'en'] as const)
      for (const p of all)
        expect(fp(p, lang), JSON.stringify(p)).not.toMatch(/NaN|Invalid|1970|1900/);
  });

  // El mes de un Date a medianoche UTC cae en el mes anterior en zonas con UTC negativo si se formatea en local.
  describe.each(['UTC', 'America/Los_Angeles', 'Pacific/Honolulu', 'Pacific/Kiritimati'])(
    'TZ=%s',
    (tz) => {
      it('no desplaza ni el mes ni el año', () => {
        const previous = process.env.TZ;
        process.env.TZ = tz;
        try {
          // Comprueba que la zona se aplicó de verdad (Honolulu es UTC-10, Kiritimati UTC+14).
          if (tz !== 'UTC') expect(new Date(2026, 0, 1).getTimezoneOffset()).not.toBe(0);
          expect(fp({ start: '2026-01', end: '2026-01' }, 'en')).toBe('Jan 2026');
          expect(fp({ start: '2025-12', end: '2025-12' }, 'en')).toBe('Dec 2025');
          expect(fp({ start: '2025-12', end: '2026-01' }, 'es')).toMatch(
            /^dic 2025\s*[–-]\s*ene 2026$/,
          );
          expect(fp({ start: '2024', end: '2024' }, 'es')).toBe('2024');
          expect(fp({ start: '2024' }, 'en')).toBe('since 2024');
          expect(fp({ start: '2024', end: '2026' }, 'en')).toMatch(/^2024\s*[–-]\s*2026$/);
        } finally {
          if (previous === undefined) delete process.env.TZ;
          else process.env.TZ = previous;
        }
      });
    },
  );
});

describe('fill', () => {
  it('sustituye todas las apariciones, conserva el 0 y deja vacío lo que falta', () => {
    expect(fill('{a} y {a}', { a: 'x' })).toBe('x y x');
    expect(fill('{n} proyectos', { n: 0 })).toBe('0 proyectos');
    expect(fill('hola {nadie}.', {})).toBe('hola .');
    expect(fill('sin variables', { a: 1 })).toBe('sin variables');
  });

  it('el valor se inserta tal cual: ni $& ni otra plantilla dentro se interpretan', () => {
    expect(fill('{t}', { t: '$& {u}' })).toBe('$& {u}');
  });
});

describe('site.ts', () => {
  it('url() cuelga de SITE sin barra doble y con barra final (trailingSlash: always)', () => {
    expect(SITE).toMatch(/^https:\/\/[^/]+$/);
    expect(url('es')).toBe(`${SITE}/`);
    expect(url('en')).toBe(`${SITE}/en/`);
  });

  it('otherLang es una involución', () => {
    expect(otherLang('es')).toBe('en');
    expect(otherLang(otherLang('es'))).toBe('es');
  });

  it('netLabel devuelve la etiqueta y, si el id no existe, el propio id', () => {
    expect(netLabel('nodejs')).toBe('Node.js');
    expect(netLabel('no-existe')).toBe('no-existe');
  });

  const used = new Set(PROJECTS.flatMap((p) => p.nets));
  const filterable = NETS.filter((n) => used.has(n.id));

  it('todo grupo de NETS está en GROUP_ORDER (si no, sus redes desaparecen del Stack)', () => {
    for (const n of NETS) expect(GROUP_ORDER, n.id).toContain(n.group);
  });

  it('stackGroups: solo grupos con redes, en orden, cada red una vez y solo las que usa un proyecto', () => {
    const groups = stackGroups();
    expect(groups.map((g) => g.group)).toEqual(
      GROUP_ORDER.filter((g) => filterable.some((n) => n.group === g)),
    );
    for (const g of groups) {
      expect(g.nets.length).toBeGreaterThan(0);
      for (const n of g.nets) expect(n.group).toBe(g.group);
    }
    const listed = groups.flatMap((g) => g.nets.map((n) => n.id));
    expect([...listed].sort()).toEqual(filterable.map((n) => n.id).sort());
    // Las que solo usa un puesto (Apex, Salesforce…) no filtran proyectos.
    expect(listed).not.toContain('apex');
  });

  it('topNets(n): n redes distintas, las más usadas, agrupadas en el orden de los grupos', () => {
    const top = topNets(13);
    expect(top).toHaveLength(13);
    expect(new Set(top.map((n) => n.id)).size).toBe(13);
    const uses = (id: string) => PROJECTS.filter((p) => p.nets.includes(id)).length;
    const picked = new Set(top.map((n) => n.id));
    const minPicked = Math.min(...top.map((n) => uses(n.id)));
    const maxLeft = Math.max(...filterable.filter((n) => !picked.has(n.id)).map((n) => uses(n.id)));
    expect(minPicked).toBeGreaterThanOrEqual(maxLeft);
    const order = top.map((n) => GROUP_ORDER.indexOf(n.group));
    expect(order).toEqual([...order].sort((a, b) => a - b));
    expect(topNets(13)).toEqual(top); // determinista, no muta nada
  });

  it('topNets en los bordes: 0 es vacío y pasarse devuelve todas', () => {
    expect(topNets(0)).toEqual([]);
    expect(
      topNets(1000)
        .map((n) => n.id)
        .sort(),
    ).toEqual(filterable.map((n) => n.id).sort());
  });
});

describe('planZone', () => {
  let seq = 0;
  interface Opts {
    image?: boolean;
    featured?: boolean;
    /** Largo del texto: el tamaño ya no depende del peso, y los tests lo comprueban. */
    text?: number;
    evidence?: Project['evidence'];
  }
  const mk = (o: Opts = {}): Project => {
    const id = `p${++seq}`;
    const l10n = (s: string) => ({ es: s, en: s });
    return {
      id,
      ref: `U${seq}`,
      zone: 'platform',
      title: l10n(id),
      tagline: l10n('x'.repeat(o.text ?? 60)),
      summary: l10n('y'.repeat(o.text ?? 200)),
      highlights: [l10n('h1'), l10n('h2')],
      nets: [],
      evidence: o.evidence ?? 'private',
      period: { start: '2026-01' },
      ...(o.image && {
        image: { src: {} as ImageMetadata, alt: l10n('alt'), synthetic: false },
      }),
      ...(o.featured && { featured: true }),
    };
  };
  const span = (x: Placed) => Number(x.grid.slice(1));
  const spans = (placed: Placed[]) => placed.map(span);
  const kind = (p: Project) => (p.image ? 'shot' : p.evidence === 'private' ? 'private' : 'code');

  /** Ninguna pieza cruza el borde de una fila de 12 y la última fila se cierra. */
  function expectPacked(placed: Placed[], label: string) {
    let col = 0;
    for (const x of placed) {
      expect(span(x), `${label}: ${x.grid}`).toBeGreaterThan(0);
      expect(col + span(x), `${label}: cruza el borde de la fila`).toBeLessThanOrEqual(12);
      col = (col + span(x)) % 12;
    }
    expect(col, `${label}: la última fila queda con hueco`).toBe(0);
  }

  const shapes: Record<string, (i: number) => Opts> = {
    'texto privado': () => ({}),
    'código público': () => ({ evidence: 'code' }),
    'todos con captura': () => ({ image: true, evidence: 'code' }),
    'capturas alternas': (i) => ({ image: i % 2 === 0 }),
    'mezcla de los tres tipos': (i) => ({
      image: i % 3 === 0,
      evidence: i % 2 === 0 ? 'code' : 'private',
    }),
  };

  describe.each(Object.entries(shapes))('%s', (_, shape) => {
    it.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])(
      'con %i proyectos, con y sin destacado: sin huecos, nada se pierde y el destacado va primero',
      (n) => {
        for (const featured of [false, true]) {
          if (featured && n === 0) continue;
          const input = Array.from({ length: n }, (_, i) =>
            mk({ ...shape(i), featured: featured && i === 0 }),
          );
          const placed = planZone(input);
          const label = `n=${n} featured=${featured}`;
          expect(placed.map((x) => x.project.id).sort(), label).toEqual(
            input.map((p) => p.id).sort(),
          );
          expectPacked(placed, label);
          if (featured) expect(placed[0]?.project, label).toBe(input[0]);
          for (const x of placed) expect(['l', 'r', 'b'], label).toContain(x.from);
        }
      },
    );
  });

  it('lista vacía: nada que colocar', () => {
    expect(planZone([])).toEqual([]);
  });

  it('un destacado solo ocupa las 12 columnas', () => {
    const [x, ...rest] = planZone([mk({ featured: true })]);
    expect(x?.grid).toBe('s12');
    expect(rest).toEqual([]);
  });

  it('un «destacado» que no va primero no recibe trato especial (se coloca como los demás)', () => {
    const placed = planZone([mk(), mk({ featured: true })]);
    expect(spans(placed)).toEqual([6, 6]);
    expectPacked(placed, 'featured no primero');
  });

  it('el destacado ocupa siempre su fila entera (s12) y no se empareja, sea cual sea el resto', () => {
    for (const lead of [{ image: true }, { evidence: 'code' as const }, {}]) {
      for (const rest of [
        [],
        [{ image: true }],
        [{}, {}],
        [{ image: true }, {}, { evidence: 'code' as const }],
      ]) {
        const input = [mk({ ...lead, featured: true }), ...rest.map((o) => mk(o))];
        const [first, second] = planZone(input);
        expect(first?.project, JSON.stringify([lead, rest])).toBe(input[0]);
        expect(first?.grid, JSON.stringify([lead, rest])).toBe('s12');
        expect(first?.from).toBe('b');
        // Lo que sigue arranca fila nueva: ninguna pieza cuelga del destacado.
        if (second) expect(second.project).not.toBe(input[0]);
      }
    }
  });

  it('orden de los grupos: destacado, con captura, texto privado y por último código público', () => {
    const input = [
      mk({ evidence: 'code' }),
      mk({ featured: true, evidence: 'code' }), // no va primero: no es destacado
      mk(),
      mk({ image: true }),
      mk({ evidence: 'code' }),
      mk(),
      mk({ image: true, evidence: 'code' }),
    ];
    const lead = mk({ featured: true, image: true });
    const kinds = planZone([lead, ...input]).map((x) => kind(x.project));
    expect(kinds).toEqual(['shot', 'shot', 'shot', 'private', 'private', 'code', 'code', 'code']);
  });

  it.each([
    [1, [12]],
    [2, [6, 6]],
    [3, [4, 4, 4]],
    [4, [6, 6, 6, 6]],
    [5, [4, 4, 4, 6, 6]],
    [6, [4, 4, 4, 4, 4, 4]],
    [7, [4, 4, 4, 6, 6, 6, 6]],
  ])(
    'con captura y con código público, %i piezas: columnas %j (filas de tres, parejas o fila entera)',
    (n, expected) => {
      for (const o of [{ image: true }, { evidence: 'code' as const }])
        expect(spans(planZone(Array.from({ length: n }, () => mk(o))))).toEqual(expected);
    },
  );

  it.each([
    [1, [12]],
    [2, [6, 6]],
    [3, [6, 6, 12]],
    [4, [6, 6, 6, 6]],
    [5, [6, 6, 6, 6, 12]],
  ])(
    'los privados de texto van en parejas de 6 (%i piezas: %j) y, si sobra uno, a fila entera',
    (n, expected) => {
      expect(spans(planZone(Array.from({ length: n }, () => mk())))).toEqual(expected);
    },
  );

  it('el tamaño ya no sigue al peso del texto: mismas columnas con textos mínimos o enormes', () => {
    const build = (text: number) => {
      const input = [
        mk({ featured: true, text }),
        mk({ image: true, text }),
        mk({ image: true, text: 1 }),
        mk({ text }),
        mk({ text: 1 }),
        mk({ evidence: 'code', text }),
      ];
      return spans(planZone(input));
    };
    expect(build(1)).toEqual(build(5000));
    expect(build(1)).toEqual([12, 6, 6, 6, 6, 12]);
  });

  it('con los datos reales: invest-ai a 12 en IA y HCM a 12 en plataformas, cada zona sin huecos', () => {
    const first = { ai: 'invest-ai', platform: 'hcm' };
    for (const zone of ['ai', 'platform'] as const) {
      const input = PROJECTS.filter((p) => p.zone === zone);
      const placed = planZone(input);
      expect(placed.map((x) => x.project.id).sort(), zone).toEqual(input.map((p) => p.id).sort());
      expectPacked(placed, zone);
      expect([placed[0]?.project.id, placed[0]?.grid], zone).toEqual([first[zone], 's12']);
      expect(placed[0]?.project.featured, zone).toBe(true);
      // Tras el destacado: capturas, privados de texto y código público, en ese orden.
      const order = ['shot', 'private', 'code'];
      const ranks = placed.slice(1).map((x) => order.indexOf(kind(x.project)));
      expect(ranks, zone).toEqual([...ranks].sort((a, b) => a - b));
    }
  });

  it('toda clase de rejilla de proyectos es s4, s6, s8 o s12 y existe en layout.css', () => {
    const css = readFileSync(new URL('../src/styles/layout.css', import.meta.url), 'utf8');
    const classes = new Set<string>();
    for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
      for (const featured of [false, true])
        for (const shape of Object.values(shapes)) {
          const input = Array.from({ length: n }, (_, i) =>
            mk({ ...shape(i), text: 30 + i * 400, featured: featured && i === 0 }),
          );
          for (const x of planZone(input)) classes.add(x.grid);
        }
    expect([...classes].sort()).toEqual(['s12', 's4', 's6', 's8']);
    for (const c of classes) expect(css, c).toMatch(new RegExp(`^\\.${c}\\b`, 'm'));
  });

  /** Agrupa lo colocado en filas de 12 columnas. */
  function rowsOfPlaced(placed: Placed[]): Placed[][] {
    const out: Placed[][] = [];
    let row: Placed[] = [];
    let sum = 0;
    for (const x of placed) {
      row.push(x);
      sum += span(x);
      if (sum === 12) {
        out.push(row);
        row = [];
        sum = 0;
      }
    }
    return out;
  }

  it('wide: el tercero de cada fila de tres y el s4 de la fila 8+4 (en tableta ocupan fila entera); nadie más', () => {
    let rowsOfThree = 0;
    let rowsOfEightFour = 0;
    for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
      for (const featured of [false, true])
        for (const shape of Object.values(shapes)) {
          const input = Array.from({ length: n }, (_, i) =>
            mk({ ...shape(i), featured: featured && i === 0 }),
          );
          const placed = planZone(input);
          const rows = rowsOfPlaced(placed);
          expect(rows.flat(), `n=${n}: filas incompletas`).toHaveLength(placed.length);
          for (const row of rows) {
            const shape = row.map((x) => x.grid).join('+');
            if (row.length === 3) rowsOfThree++;
            if (shape === 's8+s4') rowsOfEightFour++;
            const expected =
              row.length === 3 ? [false, false, true] : shape === 's8+s4' ? [false, true] : null;
            expect(
              row.map((x) => !!x.wide),
              `n=${n} featured=${featured}: ${shape}`,
            ).toEqual(expected ?? row.map(() => false));
          }
        }
    expect(rowsOfThree, 'el test no vio ninguna fila de tres').toBeGreaterThan(20);
    expect(rowsOfEightFour, 'el test no vio ninguna fila 8+4').toBeGreaterThan(0);
  });

  it('los sueltos de grupos distintos comparten fila: 8+4 si uno lleva captura y el otro no', () => {
    const shot = mk({ image: true });
    const text = mk();
    const code = mk({ evidence: 'code' });
    // Una captura y un privado, cada uno solo en su grupo: la captura a 8 y el otro a 4.
    const placed = planZone([text, shot]);
    expect(placed.map((x) => [x.project, x.grid])).toEqual([
      [shot, 's8'],
      [text, 's4'],
    ]);
    expect(placed.map((x) => x.from)).toEqual(['l', 'r']);
    expect(placed.map((x) => !!x.wide)).toEqual([false, true]); // en tableta cada uno, fila entera
    // Lo mismo con un suelto de código público en lugar del privado.
    expect(spans(planZone([code, shot]))).toEqual([8, 4]);
    // Sin captura en ninguno de los dos, 6+6.
    expect(spans(planZone([text, code]))).toEqual([6, 6]);
    // Con los tres a la vez, 4+4+4 y el tercero es wide.
    const three = planZone([code, text, shot]);
    expect(spans(three)).toEqual([4, 4, 4]);
    expect(three.map((x) => !!x.wide)).toEqual([false, false, true]);
    // Un único suelto sigue ocupando la fila entera.
    expect(spans(planZone([shot]))).toEqual([12]);
  });

  it('un grupo que acaba en pareja no deja sueltos: la regla de 8+4 solo mira a los que quedan solos', () => {
    const placed = planZone([mk({ image: true }), mk({ image: true }), mk()]);
    expect(spans(placed)).toEqual([6, 6, 12]);
  });
});

describe('groupSpans (columnas de cada grupo del stack)', () => {
  /** Agrupa las columnas en filas: cada fila suma 12 sin cruzar el borde. */
  function rowsOf(cols: number[]): number[][] {
    const out: number[][] = [];
    let row: number[] = [];
    let sum = 0;
    for (const c of cols) {
      row.push(c);
      sum += c;
      expect(sum, `${cols} cruza el borde de la fila`).toBeLessThanOrEqual(12);
      if (sum === 12) {
        out.push(row);
        row = [];
        sum = 0;
      }
    }
    expect(row, `${cols}: la última fila queda con hueco`).toEqual([]);
    return out;
  }
  const css = readFileSync(new URL('../src/styles/layout.css', import.meta.url), 'utf8');

  it('sin grupos no hay columnas', () => {
    expect(groupSpans([])).toEqual([]);
  });

  it('un solo grupo ocupa la fila entera', () => {
    expect(groupSpans([5])).toEqual([12]);
    expect(groupSpans([0])).toEqual([12]);
  });

  it('filas de hasta tres grupos: 4 grupos van 2+2, 5 van 3+2', () => {
    expect(rowsOf(groupSpans([4, 4, 4, 4])).map((r) => r.length)).toEqual([2, 2]);
    expect(rowsOf(groupSpans([4, 4, 4, 4, 4])).map((r) => r.length)).toEqual([3, 2]);
  });

  it('el grupo más grande recibe más columnas que el más pequeño de su fila', () => {
    const [small = 0, big = 0] = groupSpans([1, 30]);
    expect(big).toBeGreaterThan(small);
  });

  it('con los grupos reales del stack: sin huecos, entre 3 y 9 columnas', () => {
    const cols = groupSpans(stackGroups().map((g) => g.nets.length));
    expect(cols).toHaveLength(stackGroups().length);
    rowsOf(cols);
    for (const c of cols) expect(c >= 3 && c <= 9).toBe(true);
  });

  it('cualquier combinación de 1 a 9 grupos de 0 a 40 redes: filas completas, mínimo 3, clases en el CSS', () => {
    // Generador congruencial fijo: determinista y sin dependencias.
    let state = 12345;
    const rand = (n: number) => ((state = (state * 1103515245 + 12345) % 2 ** 31), state % n);
    const used = new Set<number>();
    for (let k = 0; k < 400; k++) {
      const sizes = Array.from({ length: 1 + rand(9) }, () => rand(41));
      const cols = groupSpans(sizes);
      expect(cols, `sizes=${sizes}`).toHaveLength(sizes.length);
      for (const r of rowsOf(cols)) expect(r.length, `sizes=${sizes}`).toBeLessThanOrEqual(3);
      for (const c of cols) {
        expect(c, `sizes=${sizes}`).toBeGreaterThanOrEqual(3);
        expect(Number.isInteger(c), `sizes=${sizes}`).toBe(true);
        used.add(c);
      }
    }
    for (const c of used) expect(css, `.s${c}`).toMatch(new RegExp(`^\\.s${c}\\b`, 'm'));
  });
});
