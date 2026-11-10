import type { Project } from '../data';

export interface Placed {
  project: Project;
  /** Clase de rejilla (`s12`, `s6`, `s4`) del compartimento. */
  grid: string;
  /** Lado por el que entra al montarse. */
  from: 'l' | 'r' | 'b';
  /** Tercero de una fila de tres: en tablet (dos columnas) ocupa la fila entera. */
  wide?: boolean;
}

/** Filas de 12 columnas sin huecos: 1 pieza ocupa 12, 2 ocupan 6+6, 3 ocupan 4+4+4. */
function rows(n: number): number[] {
  const out: number[] = [];
  for (let left = n; left > 0;) {
    const k = left === 4 || left === 2 ? 2 : left === 1 ? 1 : 3;
    out.push(k);
    left -= k;
  }
  return out;
}
/** Solo parejas (6+6); si sobra una, ocupa la fila entera. */
const pairs = (n: number): number[] =>
  Array.from({ length: Math.ceil(n / 2) }, (_, i) => Math.min(2, n - i * 2));

const SPAN: Record<number, string> = { 1: 's12', 2: 's6', 3: 's4' };

/**
 * Reparte los proyectos de una zona en la rejilla de 12 columnas, sea cual sea su número. El tamaño
 * sigue al peso del proyecto, no a igualar alturas, y ninguna fila queda con hueco:
 * - El destacado abre la zona y ocupa su fila entera (partición horizontal: el texto a un lado y la
 *   captura o los puntos al otro); nunca se empareja con un proyecto menor.
 * - Después, los que tienen captura (4 columnas en filas de tres, 6 en parejas).
 * - Después, los que no la llevan: primero los privados, que solo se sostienen por su texto
 *   (parejas de 6), y luego los de código público (4 columnas, con resumen y como mucho dos puntos).
 * - El que se queda solo al final de su grupo no sube a una fila entera: los sueltos de grupos
 *   distintos comparten fila (tres van 4+4+4; dos, 6+6, o 8+4 si uno lleva captura y el otro no);
 *   solo ocupa 12 si es el único.
 */
export function planZone(projects: readonly Project[]): Placed[] {
  const placed: Placed[] = [];
  const rest = [...projects];
  const lead = rest[0]?.featured ? rest.shift() : undefined;
  if (lead) placed.push({ project: lead, grid: 's12', from: 'b' });

  const pack = (items: Project[], sizes: number[]) => {
    let i = 0;
    for (const k of sizes) {
      for (let j = 0; j < k; j++) {
        const project = items[i++];
        if (!project) continue;
        const from = k === 1 || (k === 3 && j === 1) ? 'b' : j === 0 ? 'l' : 'r';
        placed.push({
          project,
          grid: SPAN[k] ?? 's4',
          from,
          ...(k === 3 && j === 2 && { wide: true }),
        });
      }
    }
  };

  const groups: [Project[], (n: number) => number[]][] = [
    [rest.filter((p) => p.image), rows],
    [rest.filter((p) => !p.image && p.evidence === 'private'), pairs],
    [rest.filter((p) => !p.image && p.evidence !== 'private'), rows],
  ];
  const singles: Project[] = [];
  for (const [group, split] of groups) {
    const sizes = split(group.length);
    // El último de un grupo que quedaría solo en su fila espera a los sueltos de los demás.
    if (sizes.at(-1) === 1) {
      sizes.pop();
      const alone = group.pop();
      if (alone) singles.push(alone);
    }
    pack(group, sizes);
  }
  const [first, second] = singles;
  if (singles.length === 2 && first && second && !first.image !== !second.image) {
    // Uno con captura y otro sin ella no pesan lo mismo: 8 columnas para el de la captura y 4 para el otro.
    const [shot, text] = first.image ? [first, second] : [second, first];
    placed.push(
      { project: shot, grid: 's8', from: 'l' },
      // En tablet los dos ocupan una fila entera cada uno.
      { project: text, grid: 's4', from: 'r', wide: true },
    );
  } else {
    pack(singles, rows(singles.length));
  }
  return placed;
}

/**
 * Reparte las 12 columnas entre grupos de distinto tamaño, en filas de hasta tres y sin huecos:
 * cada grupo recibe columnas en proporción a lo que contiene, con un mínimo de 3.
 */
export function groupSpans(sizes: readonly number[]): number[] {
  const out: number[] = [];
  for (let i = 0; i < sizes.length;) {
    const left = sizes.length - i;
    const row = sizes.slice(i, i + (left === 4 ? 2 : Math.min(3, left)));
    const total = row.reduce((n, s) => n + s + 3, 0);
    const spans = row.map((s) => Math.max(3, Math.round((12 * (s + 3)) / total)));
    for (let sum = spans.reduce((n, s) => n + s, 0); sum !== 12;) {
      const pick = sum > 12 ? Math.max(...spans.filter((s) => s > 3)) : Math.max(...spans);
      const at = spans.indexOf(pick);
      spans[at] = (spans[at] ?? 3) + (sum > 12 ? -1 : 1);
      sum += sum > 12 ? -1 : 1;
    }
    out.push(...spans);
    i += row.length;
  }
  return out;
}
