/// <reference types="node" />
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { PROFILE } from '../profile';
import { LOG_ENTRIES } from './log-entries';

const projects = LOG_ENTRIES.filter((e) => e.kind === 'project');

describe('datos del historial', () => {
  it('los ids son únicos y las tecnologías ya vienen normalizadas', () => {
    expect(new Set(LOG_ENTRIES.map((e) => e.id)).size).toBe(LOG_ENTRIES.length);
    // El filtro normaliza lo que se pulsa y compara con estos ids: uno con símbolos nunca casaría.
    const bad = LOG_ENTRIES.flatMap((e) => e.stack.filter((t) => !/^[a-z0-9]+$/.test(t)));
    expect(bad).toEqual([]);
  });

  it('van de más reciente a más antiguo, con fechas válidas y end sin adelantarse a start', () => {
    const date = /^\d{4}(-(0[1-9]|1[0-2]))?$/;
    for (const e of LOG_ENTRIES) {
      expect(e.start, e.id).toMatch(date);
      if (e.end) {
        expect(e.end, e.id).toMatch(date);
        expect(e.end >= e.start, `${e.id}: end < start`).toBe(true);
      }
    }
    const starts = LOG_ENTRIES.map((e) => e.start);
    expect(starts).toEqual([...starts].sort().reverse());
  });

  it('cada proyecto tiene un sha de 7 hex único y los demás no tienen sha ni evidencia', () => {
    const shas = projects.map((e) => e.sha);
    expect(shas.every((s) => /^[0-9a-f]{7}$/.test(s ?? ''))).toBe(true);
    expect(new Set(shas).size).toBe(projects.length);
    const others = LOG_ENTRIES.filter((e) => e.kind !== 'project');
    expect(others.filter((e) => e.sha || e.evidence || e.repoUrl || e.demoUrl)).toEqual([]);
  });

  it('la evidencia concuerda con los enlaces: las privadas no exponen ninguno', () => {
    for (const e of projects) {
      expect(!!e.repoUrl, `${e.id} repoUrl`).toBe(e.evidence === 'code');
      expect(!!e.demoUrl, `${e.id} demoUrl`).toBe(e.evidence === 'demo');
      for (const url of [e.repoUrl, e.demoUrl].filter(Boolean)) expect(url).toMatch(/^https:\/\//);
    }
  });

  it('las capturas y los CV existen en public/', () => {
    const files = [
      ...LOG_ENTRIES.flatMap((e) => (e.img ? [e.img] : [])),
      ...Object.values(PROFILE.cv),
      '/avatar-face.webp',
    ];
    const missing = files.filter((f) => !existsSync(join(process.cwd(), 'public', f)));
    expect(missing).toEqual([]);
  });

  it('solo cuentas avisa de que su captura es de demostración, y tiene captura', () => {
    const synthetic = LOG_ENTRIES.filter((e) => e.synthetic);
    expect(synthetic.map((e) => e.id)).toEqual(['cuentas']);
    expect(synthetic.every((e) => e.img)).toBe(true);
  });
});
