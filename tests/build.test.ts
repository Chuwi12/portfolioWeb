import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { FAQ, NETS, PROFILE, PROJECTS, ROLES, type Lang } from '../src/data';
import { fill, UI } from '../src/i18n/ui';
import { planZone } from '../src/lib/layout';
import { formatPeriod, stackGroups } from '../src/lib/site';
import { vetoed } from './vetoed';

// Estos tests leen el HTML de dist/: ejecuta antes `bun run build`.
const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const ORIGIN = 'https://www.chuwi-dev.me';

const cache = new Map<string, string>();
function read(rel: string): string {
  const file = join(DIST, rel);
  if (!existsSync(file))
    throw new Error(
      `Falta dist/${rel}: ejecuta «bun run build» antes de «bun run test»; build.test.ts lee el HTML construido.`,
    );
  if (!cache.has(rel)) cache.set(rel, readFileSync(file, 'utf8'));
  return cache.get(rel) as string;
}

/* Lectura mínima de HTML: el de Astro es regular, así que unas regex bastan y no se añade un parser. */
const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};
const decode = (s: string) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) =>
    e.startsWith('#')
      ? String.fromCodePoint(
          e[1]?.toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10),
        )
      : (ENTITIES[e] ?? m),
  );
const strip = (html: string) => html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '');
const text = (html: string) =>
  decode(strip(html).replace(/<[^>]*>/g, ''))
    .replace(/\s+/g, ' ')
    .trim();

type Attrs = Record<string, string>;
function attrs(raw: string): Attrs {
  const out: Attrs = {};
  for (const m of raw.matchAll(/([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g))
    out[(m[1] ?? '').toLowerCase()] = decode(m[2] ?? m[3] ?? m[4] ?? '');
  return out;
}
interface El {
  name: string;
  a: Attrs;
}
function elements(html: string): El[] {
  const re = /<([a-z][a-z0-9-]*)\b((?:[^>"']|"[^"]*"|'[^']*')*)>/gi;
  return [...strip(html).matchAll(re)].map((m) => ({
    name: (m[1] ?? '').toLowerCase(),
    a: attrs(m[2] ?? ''),
  }));
}
const tags = (html: string, name: string) =>
  elements(html)
    .filter((e) => e.name === name)
    .map((e) => e.a);
const scripts = (html: string) =>
  [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].map((m) => ({
    a: attrs(m[1] ?? ''),
    body: m[2] ?? '',
  }));
const metaContent = (html: string, key: 'name' | 'property', value: string) => {
  const found = tags(html, 'meta').filter((m) => m[key] === value);
  expect(found, `<meta ${key}="${value}"> debe aparecer una vez`).toHaveLength(1);
  return found[0]?.content ?? '';
};
const articles = (html: string) =>
  [...html.matchAll(/<article\b([^>]*)>([\s\S]*?)<\/article>/g)].map((m) => ({
    a: attrs(m[1] ?? ''),
    inner: m[2] ?? '',
  }));

const pages = [
  {
    lang: 'es',
    file: 'index.html',
    canonical: `${ORIGIN}/`,
    cv: '/CV.pdf',
    otherCv: '/CV-en.pdf',
    switchTo: '/en/',
  },
  {
    lang: 'en',
    file: 'en/index.html',
    canonical: `${ORIGIN}/en/`,
    cv: '/CV-en.pdf',
    otherCv: '/CV.pdf',
    switchTo: '/',
  },
] as const;

/** Un JSON-LD puede ser un objeto, un array o (como hoy) un objeto por línea. */
function ldBlocks(html: string): string[] {
  return scripts(html)
    .filter((s) => s.a.type === 'application/ld+json')
    .map((s) => s.body);
}

describe('dist/', () => {
  it('existe el build (bun run build) con las tres páginas', () => {
    for (const f of ['index.html', 'en/index.html', '404.html'])
      expect(read(f).length, f).toBeGreaterThan(1000);
  });
});

describe.each(pages)('$file', ({ lang, canonical, cv, otherCv, switchTo }) => {
  const ui = UI[lang as Lang];
  const html = () => read(pages.find((p) => p.lang === lang)?.file ?? '');

  it('<html lang> correcto, un solo <h1> y título y descripción del idioma', () => {
    expect(
      /<html\b[^>]*>/i.exec(html())?.[0] && attrs(/<html\b([^>]*)>/i.exec(html())?.[1] ?? '').lang,
    ).toBe(lang);
    const h1 = html().match(/<h1\b[\s\S]*?<\/h1>/gi) ?? [];
    expect(h1, 'debe haber un solo <h1>').toHaveLength(1);
    expect(text(h1[0] ?? '')).toBe(PROFILE.name);
    expect(text(/<title>([\s\S]*?)<\/title>/.exec(html())?.[1] ?? '')).toBe(ui.seoTitle);
    expect(metaContent(html(), 'name', 'description')).toBe(ui.seoDescription);
  });

  it('canonical propio y hreflang es, en y x-default hacia las URLs absolutas con barra final', () => {
    const links = tags(html(), 'link');
    expect(links.filter((l) => l.rel === 'canonical').map((l) => l.href)).toEqual([canonical]);
    const alt = links.filter((l) => l.rel === 'alternate');
    expect(Object.fromEntries(alt.map((l) => [l.hreflang, l.href]))).toEqual({
      es: `${ORIGIN}/`,
      en: `${ORIGIN}/en/`,
      'x-default': `${ORIGIN}/`,
    });
    expect(alt).toHaveLength(3);
    expect(html()).not.toMatch(/<meta[^>]*name="robots"/i);
  });

  it('Open Graph y Twitter: og:image absoluta que existe y mide lo que dice', () => {
    const image = metaContent(html(), 'property', 'og:image');
    expect(image).toBe(`${ORIGIN}/og.png`);
    expect(metaContent(html(), 'name', 'twitter:image')).toBe(image);
    expect(metaContent(html(), 'name', 'twitter:card')).toBe('summary_large_image');
    expect(metaContent(html(), 'property', 'og:url')).toBe(canonical);
    expect(metaContent(html(), 'property', 'og:title')).toBe(ui.seoTitle);
    expect(metaContent(html(), 'property', 'og:locale')).toBe(ui.locale);
    // Cabecera IHDR del PNG: ancho y alto en los bytes 16 a 23.
    const png = readFileSync(join(DIST, 'og.png'));
    expect(png.subarray(1, 4).toString()).toBe('PNG');
    expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([
      Number(metaContent(html(), 'property', 'og:image:width')),
      Number(metaContent(html(), 'property', 'og:image:height')),
    ]);
  });

  describe('JSON-LD', () => {
    it('cada bloque es JSON válido (un <script> admite un único valor JSON)', () => {
      const blocks = ldBlocks(html());
      expect(blocks.length).toBeGreaterThan(0);
      for (const raw of blocks) expect(() => JSON.parse(raw), raw.slice(0, 80)).not.toThrow();
    });

    // Se parsea línea a línea si hace falta, para que este test mida el contenido y el de arriba la validez.
    const docs = () =>
      ldBlocks(html()).flatMap((raw) => {
        try {
          return [JSON.parse(raw)].flat();
        } catch {
          return raw
            .split('\n')
            .filter(Boolean)
            .map((l) => JSON.parse(l));
        }
      });

    it('contiene Person y FAQPage con los datos del idioma', () => {
      const byType = Object.fromEntries(docs().map((d) => [d['@type'], d]));
      expect(Object.keys(byType).sort()).toEqual(['FAQPage', 'Person']);
      for (const d of docs()) expect(d['@context']).toBe('https://schema.org');

      const person = byType.Person;
      expect(person.name).toBe(PROFILE.name);
      expect(person.jobTitle).toBe(ui.jobTitle);
      expect(person.url).toBe(canonical);
      expect(person.sameAs).toEqual([PROFILE.github, PROFILE.linkedin]);
      expect(person.knowsAbout).toEqual(stackGroups().flatMap((g) => g.nets.map((n) => n.label)));

      const faq = byType.FAQPage.mainEntity as { name: string; acceptedAnswer: { text: string } }[];
      expect(faq.map((q) => [q.name, q.acceptedAnswer.text])).toEqual(
        FAQ.map((f) => [f.q[lang], f.a[lang]]),
      );
    });

    it('las preguntas del FAQPage están visibles en la página (requisito de Google)', () => {
      const dt = [...html().matchAll(/<dt\b[^>]*>([\s\S]*?)<\/dt>/g)].map((m) => text(m[1] ?? ''));
      const dd = [...html().matchAll(/<dd\b[^>]*>([\s\S]*?)<\/dd>/g)].map((m) => text(m[1] ?? ''));
      for (const f of FAQ) {
        expect(dt, f.q[lang]).toContain(f.q[lang]);
        expect(dd, f.a[lang]).toContain(f.a[lang]);
      }
    });
  });

  it('el único <script> en línea es el del tema, con el hash que admite la CSP; ni on*= ni scripts externos', () => {
    const inline = scripts(html()).filter((s) => !s.a.src && !/json/.test(s.a.type ?? ''));
    expect(inline, 'scripts en línea ejecutables').toHaveLength(1);
    const theme = readFileSync(new URL('../src/scripts/theme-init.js', import.meta.url), 'utf8');
    expect(inline[0]?.body.trim()).toBe(theme.trim());

    const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8')) as {
      headers: { headers: { key: string; value: string }[] }[];
    };
    const csp =
      vercel.headers.flatMap((h) => h.headers).find((h) => h.key === 'Content-Security-Policy')
        ?.value ?? '';
    const scriptSrc = /(?:^|;)\s*script-src ([^;]*)/.exec(csp)?.[1] ?? '';
    const hash = createHash('sha256')
      .update(inline[0]?.body ?? '', 'utf8')
      .digest('base64');
    expect(scriptSrc, 'el hash del script de tema no está en script-src de vercel.json').toContain(
      `'sha256-${hash}'`,
    );
    expect(scriptSrc).not.toMatch(/unsafe-/);

    for (const s of scripts(html()).filter((x) => x.a.src))
      expect(s.a.src, 'script externo').toMatch(/^\//);
    for (const el of elements(html()))
      for (const name of Object.keys(el.a)) expect(name, `<${el.name}>`).not.toMatch(/^on[a-z]+$/);
  });

  it('toda imagen tiene alt no vacío, en el idioma de la página, y dimensiones', () => {
    const imgs = tags(html(), 'img');
    const expected = [
      ui.avatarAlt,
      ...PROJECTS.flatMap((p) => (p.image ? [p.image.alt[lang]] : [])),
    ];
    expect(imgs).toHaveLength(expected.length);
    for (const img of imgs) {
      expect(img.alt, `<img src="${img.src}"> sin alt`).toBeTruthy();
      expect(
        img.width && img.height,
        `<img src="${img.src}"> sin width/height (salto de maquetación)`,
      ).toBeTruthy();
    }
    expect(imgs.map((i) => i.alt).sort()).toEqual([...expected].sort());
  });

  it('los enlaces con target="_blank" llevan rel con noopener, y ningún enlace es http:// plano', () => {
    const links = tags(html(), 'a');
    const blank = links.filter((a) => a.target === '_blank');
    expect(blank.length, 'proyectos con código o demo, GitHub y LinkedIn').toBe(
      PROJECTS.filter((p) => p.evidence !== 'private').length + 2,
    );
    for (const a of blank) expect(a.rel?.split(/\s+/), a.href).toContain('noopener');
    for (const a of links) expect(a.href ?? '', 'enlace sin cifrar').not.toMatch(/^http:/);
    // Todo enlace a otro dominio debe abrirse en pestaña nueva con aviso para lectores de pantalla.
    for (const a of links.filter((x) => /^https:/.test(x.href ?? '')))
      expect(a.target, a.href).toBe('_blank');
  });

  it('el CV enlazado es el del idioma, existe en dist/ y es un PDF', () => {
    const links = tags(html(), 'a').filter((a) => /\.pdf$/i.test(a.href ?? ''));
    expect(links.length, 'botón del hero y del contacto').toBeGreaterThanOrEqual(2);
    for (const a of links) {
      expect(a.href).toBe(cv);
      expect(a.href).not.toBe(otherCv);
      expect('download' in a, 'falta download').toBe(true);
    }
    expect(readFileSync(join(DIST, cv)).subarray(0, 5).toString()).toBe('%PDF-');
  });

  it('el conmutador de idioma apunta a la otra página y conserva hreflang', () => {
    const sw = tags(html(), 'a').filter((a) => 'data-lang-switch' in a);
    expect(sw).toHaveLength(1);
    expect(sw[0]).toMatchObject({
      'data-lang-switch': switchTo,
      href: switchTo,
      hreflang: lang === 'es' ? 'en' : 'es',
    });
  });

  it('ids únicos y todo ancla, aria-labelledby o popovertarget apunta a un id que existe', () => {
    const els = elements(html());
    const ids = els.flatMap((e) => (e.a.id ? [e.a.id] : []));
    expect(
      ids.filter((id, i) => ids.indexOf(id) !== i),
      'ids repetidos',
    ).toEqual([]);
    const known = new Set(ids);
    for (const e of els) {
      if (e.name === 'a' && e.a.href?.startsWith('#') && e.a.href.length > 1)
        expect(known.has(e.a.href.slice(1)), `ancla ${e.a.href}`).toBe(true);
      for (const k of ['aria-labelledby', 'aria-controls', 'popovertarget'])
        for (const id of (e.a[k] ?? '').split(/\s+/).filter(Boolean))
          expect(known.has(id), `${k}="${id}"`).toBe(true);
    }
    for (const id of [
      'main',
      'proyectos',
      'plataformas',
      'stack',
      'trayectoria',
      'preguntas',
      'contacto',
    ])
      expect(known.has(id), `#${id}`).toBe(true);
  });

  it('todo recurso local (imágenes, srcset, CSS, JS, fuentes, favicon) existe en dist/', () => {
    const refs: string[] = [];
    for (const e of elements(html())) {
      for (const k of ['src', 'href']) if (e.name !== 'a' && e.a[k]) refs.push(e.a[k] as string);
      for (const part of (e.a.srcset ?? '').split(','))
        if (part.trim()) refs.push(part.trim().split(/\s+/)[0] ?? '');
    }
    const local = refs.filter((r) => r.startsWith('/') && !r.startsWith('/_vercel/')); // los inyecta Vercel al desplegar
    expect(local.length).toBeGreaterThan(20);
    for (const r of local) expect(existsSync(join(DIST, r)), r).toBe(true);
  });

  it('contrato con main.ts: los hooks de datos y los id que busca existen y casan con los datos', () => {
    const els = elements(html());
    const by = (pred: (e: El) => boolean) => els.filter(pred);

    // Filtro: cada botón es una red filtrable y deja proyectos al pulsarse.
    const techs = by((e) => 'data-tech' in e.a).map((e) => e.a['data-tech']);
    expect([...techs].sort()).toEqual(
      stackGroups()
        .flatMap((g) => g.nets.map((n) => n.id))
        .sort(),
    );
    const withNets = by((e) => 'data-nets' in e.a);
    for (const t of techs)
      expect(
        withNets.some((e) => e.a['data-nets']?.split(' ').includes(t ?? '')),
        `ningún proyecto con ${t}`,
      ).toBe(true);
    for (const e of withNets) {
      expect(e.a.id, 'main.ts enlaza cada coincidencia por su id').toBeTruthy();
      expect(e.a['data-label'], `${e.a.id}: sin data-label`).toBeTruthy();
      for (const n of e.a['data-nets']?.split(' ').filter(Boolean) ?? [])
        expect(
          NETS.some((x) => x.id === n),
          `${e.a.id}: red ${n}`,
        ).toBe(true);
    }
    for (const c of by((e) => 'data-chip' in e.a))
      expect(NETS.some((n) => n.id === c.a['data-chip'])).toBe(true);

    const one = (id: string) => {
      const found = by((e) => e.a.id === id);
      expect(found, `#${id}`).toHaveLength(1);
      return found[0]?.a ?? {};
    };
    expect(one('tec-status')).toMatchObject({ 'data-one': ui.stackOne, 'data-many': ui.stackMany });
    expect(ui.stackMany).toContain('{n}');
    for (const id of ['tec-matches', 'tec-pill', 'tec-pill-text', 'copy-status', 'menu']) one(id);
    expect('popover' in one('menu')).toBe(true);
    expect(
      by((e) => 'data-tec-clear' in e.a).length,
      'botón «Ver todos» y el de la píldora',
    ).toBeGreaterThanOrEqual(2);

    // Tema, copiar email y demo.
    expect(
      by((e) => 'data-theme-set' in e.a)
        .map((e) => e.a['data-theme-set'])
        .sort(),
    ).toEqual(['dark', 'light']);
    const copy = by((e) => 'data-copy' in e.a);
    expect(copy).toHaveLength(1);
    expect(copy[0]?.a).toMatchObject({
      'data-copy': PROFILE.email,
      'data-ok': ui.copied,
      'data-err': fill(ui.copyError, { email: PROFILE.email }),
    });
    const demo =
      html().match(/<div\b[^>]*data-demo[^>]*>[\s\S]*?<\/p>\s*<p class="foot"/)?.[0] ?? '';
    expect(demo, 'bloque de la demo').not.toBe('');
    const cls = (c: string) =>
      elements(demo).filter((e) => e.a.class?.split(/\s+/).includes(c)).length;
    expect(cls('tok')).toBeGreaterThan(5);
    expect(cls('bad'), 'demo.ts exige exactamente una cifra .bad').toBe(1);
    expect(cls('verdict')).toBe(1);
  });

  it('proyectos y puestos: orden y rejilla de planZone, título, evidencia, periodo y redes', () => {
    const built = articles(html());
    const expected = (['ai', 'platform'] as const).flatMap((z) =>
      planZone(PROJECTS.filter((p) => p.zone === z)),
    );
    expect(built.map((b) => b.a.id)).toEqual(expected.map((x) => x.project.id));

    built.forEach((b, i) => {
      const { project: p, grid, from, wide } = expected[i]!;
      const classes = b.a.class?.split(/\s+/) ?? [];
      expect(classes.includes('tw'), `${p.id}: clase tw (tercero de fila de tres)`).toBe(!!wide);
      expect(classes, p.id).toEqual(expect.arrayContaining([grid, `from-${from}`, 'project']));
      expect(b.a['data-nets'], p.id).toBe(p.nets.join(' '));
      expect(b.a['data-label'], p.id).toBe(p.title[lang]);

      const h3 = text(/<h3\b[^>]*>([\s\S]*?)<\/h3>/.exec(b.inner)?.[1] ?? '');
      expect(h3.startsWith(p.title[lang]), `${p.id}: «${h3}»`).toBe(true);
      const when = /class="when"[^>]*>([^<]*)</.exec(b.inner)?.[1] ?? '';
      expect(decode(when), `${p.id}: periodo`).toBe(formatPeriod(p.period, lang));

      const hrefs = tags(b.inner, 'a');
      if (p.evidence === 'private') {
        const mail = hrefs.find((a) => a.class?.includes('request'));
        expect(mail?.href, `${p.id}: botón de petición`).toMatch(
          new RegExp(`^mailto:${PROFILE.email}\\?subject=`),
        );
        expect(new URL(mail?.href ?? 'mailto:').searchParams.get('subject')).toBe(
          fill(ui.requestSubject, { title: p.title[lang] }),
        );
        expect(
          hrefs.some((a) => a.target === '_blank'),
          `${p.id}: privado sin enlace externo`,
        ).toBe(false);
      } else {
        const main = hrefs.find((a) => a.class === 'stretch');
        expect(main?.href, p.id).toBe(p.evidence === 'code' ? p.repoUrl : p.demoUrl);
      }
      for (const alt of p.image ? [p.image.alt[lang]] : [])
        expect(tags(b.inner, 'img')[0]?.alt, p.id).toBe(alt);
      expect(
        tags(b.inner, 'li')
          .filter((l) => 'data-chip' in l)
          .map((l) => l['data-chip']),
        p.id,
      ).toEqual(p.nets);
    });

    const roles = elements(html()).filter(
      (e) => e.name === 'li' && ROLES.some((r) => r.id === e.a.id),
    );
    expect(roles.map((r) => r.a.id)).toEqual(
      [
        ...ROLES.filter((r) => r.kind === 'job'),
        ...ROLES.filter((r) => r.kind === 'education'),
      ].map((r) => r.id),
    );
  });

  it('sin textos rotos, sin el otro idioma, sin rutas del sistema ni términos vetados', () => {
    const visible = strip(html()).replace(/\/_astro\/[^\s"'<>,]+/g, '');
    // Los data-* guardan plantillas ({n}, {tech}) que main.ts rellena: solo ahí se admiten.
    const rendered = visible.replace(/\sdata-[\w-]+="[^"]*"/g, '');
    expect(rendered).not.toMatch(/\bundefined\b|\bNaN\b|\[object Object\]|\{\w+\}/);
    expect(visible).not.toMatch(/\/home\/|\/Users\/|localhost|127\.0\.0\.1/);
    expect(vetoed(visible), 'términos vetados').toEqual([]);
    const other = UI[lang === 'es' ? 'en' : 'es'];
    for (const k of ['cvDownload', 'aiTitle', 'faqTitle', 'contactTitle', 'openToWork'] as const)
      expect(decode(visible), `texto de ${k} en el otro idioma`).not.toContain(other[k]);
  });
});

describe('404.html', () => {
  it('existe, no se indexa y ofrece la salida en los dos idiomas', () => {
    const html = read('404.html');
    expect(tags(html, 'meta').filter((m) => m.name === 'robots')[0]?.content).toBe('noindex');
    expect(tags(html, 'link').some((l) => l.rel === 'canonical' || l.rel === 'alternate')).toBe(
      false,
    );
    const sections = tags(html, 'section').map((s) => s.lang);
    expect(sections).toEqual(['es', 'en']);
    expect(
      tags(html, 'a')
        .filter((a) => a.class?.includes('btn'))
        .map((a) => a.href),
    ).toEqual(['/', '/en/']);
    expect(html).toContain(UI.es.notFoundText);
    expect(html).toContain(UI.en.notFoundText);
    expect(scripts(html).filter((s) => !s.a.src)).toHaveLength(1); // solo el del tema
  });
});

describe('sitemap y robots', () => {
  it('el sitemap lista las dos URLs con sus alternates y robots apunta al sitemap', () => {
    const sitemap = read('sitemap.xml');
    expect([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])).toEqual([
      `${ORIGIN}/`,
      `${ORIGIN}/en/`,
    ]);
    expect(sitemap.match(/hreflang="x-default"/g)).toHaveLength(2);
    expect(sitemap).not.toContain('404');
    expect(read('robots.txt')).toContain(`Sitemap: ${ORIGIN}/sitemap.xml`);
  });

  it('los dos CV son PDF distintos', () => {
    expect(readFileSync(join(DIST, 'CV.pdf')).equals(readFileSync(join(DIST, 'CV-en.pdf')))).toBe(
      false,
    );
  });
});
