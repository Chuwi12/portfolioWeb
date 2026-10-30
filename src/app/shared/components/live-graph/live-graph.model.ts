/** Un punto del grafo de fondo: un carril y una altura (fracción del alto de la pantalla). */
export interface GraphNode {
  lane: number;
  y: number;
  out: GraphEdge[];
}

/** Tramo recto dentro de un carril, o curva de bifurcación o fusión entre dos. Siempre baja. */
export interface GraphEdge {
  from: GraphNode;
  to: GraphNode;
  curve: boolean;
  /** Longitud en px; la fija el diseño al medir la pantalla. */
  len: number;
}

export interface BackgroundGraph {
  edges: GraphEdge[];
  /** Nodos por encima de la pantalla donde nacen los commits. */
  sources: GraphNode[];
}

/**
 * Posición horizontal de cada carril (fracción del ancho) según cuántos caben. Los de los extremos
 * caen dentro del margen de la página (16px en móvil, 32px en tableta, 64px en escritorio), donde
 * la máscara del fondo deja el grafo a intensidad completa.
 */
export const LANE_X: Record<number, number[]> = {
  3: [0.015, 0.5, 0.985],
  4: [0.015, 0.34, 0.66, 0.985],
  5: [0.035, 0.27, 0.5, 0.73, 0.965],
};

export const lanesFor = (width: number) => (width < 640 ? 3 : width < 1024 ? 4 : 5);

/** Pseudoaleatorio con semilla: el mismo fondo en cada visita. */
export function mulberry32(seed: number): () => number {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Un historial de ramas: unos carriles viven de arriba abajo y, cada cierto tramo, uno se
 * bifurca en un vecino muerto o se fusiona en un vecino vivo. Todo baja, sin cruces ni solapes.
 */
export function buildGraph(lanes: number, rnd: () => number): BackgroundGraph {
  const edges: GraphEdge[] = [];
  const node = (lane: number, y: number): GraphNode => ({ lane, y, out: [] });
  const link = (from: GraphNode, to: GraphNode) => {
    const edge: GraphEdge = { from, to, curve: from.lane !== to.lane, len: 0 };
    from.out.push(edge);
    edges.push(edge);
  };

  const alive = new Set([0, Math.floor(lanes / 2), lanes - 1]);
  const last = new Map<number, GraphNode>();
  const sources = [...alive].map((lane) => node(lane, -0.2));
  sources.forEach((n) => last.set(n.lane, n));

  const neighbours = (lane: number) => [lane - 1, lane + 1].filter((l) => l >= 0 && l < lanes);
  const pick = <T>(items: T[]) => items[Math.floor(rnd() * items.length)];

  for (let y = 0.04; y < 1.15; ) {
    const span = 0.12 + rnd() * 0.06;
    const forks = [...alive].flatMap((from) =>
      neighbours(from)
        .filter((to) => !alive.has(to))
        .map((to) => ({ from, to })),
    );
    const merges = [...alive].flatMap((from) =>
      neighbours(from)
        .filter((to) => alive.has(to))
        .map((to) => ({ from, to })),
    );
    const fork = forks.length > 0 && (alive.size <= 2 || merges.length === 0 || rnd() < 0.5);
    const { from, to } = pick(fork ? forks : merges);

    const start = node(from, y);
    link(last.get(from)!, start);
    last.set(from, start);
    if (fork) {
      const end = node(to, y + span);
      link(start, end);
      last.set(to, end);
      alive.add(to);
    } else {
      const end = node(to, y + span);
      link(last.get(to)!, end);
      link(start, end);
      last.set(to, end);
      alive.delete(from);
    }
    y += span + 0.03 + rnd() * 0.06;
  }

  for (const lane of alive) link(last.get(lane)!, node(lane, 1.3));
  return { edges, sources };
}

/** Rampa de la atenuación, dentro del margen de la página (el texto nunca cae en ella). */
export const FADE_RAMP = 14;

/**
 * Intensidad del fondo (1 = entera) en la columna `x` de una pantalla de `width` px: entera en los
 * márgenes de la página y `floor` bajo la columna de contenido, con una rampa corta dentro del
 * margen. Es la máscara que protege la lectura, calculada en vez de aplicada con CSS: una
 * `mask-image` sobre un lienzo que se repinta 30 veces por segundo triplicaba el coste de CPU.
 */
export function fadeAt(x: number, width: number, margin: number, floor: number): number {
  const edge = Math.min(x, width - x);
  const ramp = fadeRamp(margin);
  if (edge <= margin - ramp) return 1;
  if (edge >= margin) return floor;
  return floor + (1 - floor) * ((margin - edge) / ramp);
}

/** En los márgenes estrechos (móvil: 16px) la rampa se acorta para dejar una zona entera. */
export const fadeRamp = (margin: number) => Math.min(FADE_RAMP, margin / 2);
