/// <reference types="node" />
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { STACK_GROUPS } from '../profile';
import { LOG_ENTRIES } from '../services/log-entries';
import { locales } from './locales';

type Tree = { [key: string]: string | Tree };

/** Todas las hojas del árbol: 'a.b.c' → texto. */
function leaves(tree: Tree, prefix = ''): Map<string, string> {
  const out = new Map<string, string>();
  for (const [key, node] of Object.entries(tree)) {
    if (typeof node === 'string') out.set(prefix + key, node);
    else leaves(node, `${prefix}${key}.`).forEach((text, path) => out.set(path, text));
  }
  return out;
}

const es = leaves(locales.es.translation as Tree);
const en = leaves(locales.en.translation as Tree);
const placeholders = (text: string) => (text.match(/{{\w+}}/g) ?? []).sort();

describe('locales', () => {
  it('ES y EN tienen exactamente las mismas claves en todo el árbol', () => {
    expect([...en.keys()].sort()).toEqual([...es.keys()].sort());
  });

  it('ningún texto está vacío y los {{marcadores}} coinciden entre idiomas', () => {
    const empty = [...es, ...en].filter(([, text]) => !text.trim()).map(([key]) => key);
    expect(empty).toEqual([]);
    const mismatched = [...es.keys()].filter(
      (key) => placeholders(es.get(key)!).join() !== placeholders(en.get(key) ?? '').join(),
    );
    expect(mismatched).toEqual([]);
  });

  it('existen los textos de las claves que se componen en la plantilla', () => {
    const dynamic = [
      ...new Set(LOG_ENTRIES.flatMap((e) => (e.evidence ? [`log.evidence.${e.evidence}`] : []))),
      ...STACK_GROUPS.map((g) => `stack.groups.${g.id}`),
    ];
    expect(dynamic.length).toBeGreaterThan(3);
    for (const [lang, texts] of [
      ['es', es],
      ['en', en],
    ] as const) {
      expect(
        dynamic.filter((key) => !texts.has(key)),
        lang,
      ).toEqual([]);
    }
  });

  describe('claves literales de las plantillas y los componentes', () => {
    const roots = Object.keys(locales.es.translation);
    // 'header.nav.historial', 'stack.chipLabel'…: un literal que empieza por una raíz del árbol y
    // termina en letra; los prefijos que se concatenan ('log.entries.' + id) quedan fuera.
    const literal = new RegExp(`'((?:${roots.join('|')})\\.[\\w.-]*\\w)'`, 'g');

    function sources(dir: string): string[] {
      return readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
        const path = join(dir, d.name);
        if (d.isDirectory()) return sources(path);
        const isCode =
          d.name.endsWith('.ts') && !/\.spec\.ts$|^(locales|i18n-test)\.ts$/.test(d.name);
        return d.name.endsWith('.html') || isCode ? [path] : [];
      });
    }

    const used = new Map<string, string>();
    for (const file of sources(join(process.cwd(), 'src/app'))) {
      for (const [, key] of readFileSync(file, 'utf8').matchAll(literal)) used.set(key, file);
    }

    // `t('a')` con plurales vive como a_one/a_other.
    const exists = (texts: Map<string, string>, key: string) =>
      texts.has(key) || (texts.has(`${key}_one`) && texts.has(`${key}_other`));

    it('la extracción encuentra las claves (si no, el test no prueba nada)', () => {
      expect(used.size).toBeGreaterThan(20);
      // Una en un ternario, una en un array de enlaces y una con plural.
      for (const key of ['header.menuClose', 'header.nav.historial', 'stack.chipLabel']) {
        expect(used.has(key), key).toBe(true);
      }
    });

    it.each([
      ['es', es],
      ['en', en],
    ])('todas existen en %s', (_, texts) => {
      const missing = [...used]
        .filter(([key]) => !exists(texts, key))
        .map(([k, f]) => `${k} (${f})`);
      expect(missing).toEqual([]);
    });
  });
});
