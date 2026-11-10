import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { describe, expect, it } from 'vitest';

// main.ts y demo.ts no exportan nada puro: dependen de document, IntersectionObserver y history, y no
// hay jsdom/happy-dom en el proyecto. Se cubren por su contrato con el HTML en build.test.ts.
// theme-init.js sí se puede ejecutar aislado con un document y un localStorage de mentira.
const themeInit = readFileSync(new URL('../src/scripts/theme-init.js', import.meta.url), 'utf8');
const mainTs = readFileSync(new URL('../src/scripts/main.ts', import.meta.url), 'utf8');

interface Env {
  stored?: string | null;
  prefersDark?: boolean;
  /** `getItem` lanza (cookies bloqueadas) o `localStorage` ni existe. */
  storage?: 'ok' | 'throws' | 'missing';
}

function theme({ stored = null, prefersDark = false, storage = 'ok' }: Env): string | undefined {
  const dataset: Record<string, string> = {};
  const context: Record<string, unknown> = {
    matchMedia: (q: string) => ({ matches: q === '(prefers-color-scheme: dark)' && prefersDark }),
    document: { documentElement: { dataset } },
  };
  if (storage === 'throws')
    context.localStorage = {
      getItem() {
        throw new Error('SecurityError');
      },
    };
  else if (storage === 'ok')
    context.localStorage = { getItem: (k: string) => (k === 'theme' ? stored : null) };
  vm.runInNewContext(themeInit, context);
  return dataset.theme;
}

describe('theme-init.js', () => {
  it('lo guardado manda sobre la preferencia del sistema', () => {
    expect(theme({ stored: 'dark', prefersDark: false })).toBe('dark');
    expect(theme({ stored: 'light', prefersDark: true })).toBe('light');
  });

  it('sin nada guardado sigue al sistema', () => {
    expect(theme({ prefersDark: true })).toBe('dark');
    expect(theme({ prefersDark: false })).toBe('light');
  });

  it.each(['', 'DARK', 'blue', 'undefined', ' dark'])(
    'un valor guardado inválido (%j) se ignora',
    (stored) => {
      expect(theme({ stored, prefersDark: true })).toBe('dark');
      expect(theme({ stored, prefersDark: false })).toBe('light');
    },
  );

  it('con el almacenamiento bloqueado o ausente no rompe y sigue al sistema', () => {
    for (const storage of ['throws', 'missing'] as const) {
      expect(theme({ storage, prefersDark: true })).toBe('dark');
      expect(theme({ storage, prefersDark: false })).toBe('light');
    }
  });

  it("escribe y lee la misma clave que main.ts (localStorage 'theme')", () => {
    expect(mainTs).toMatch(/localStorage\.setItem\('theme'/);
    expect(themeInit).toMatch(/localStorage\.getItem\('theme'\)/);
  });
});
