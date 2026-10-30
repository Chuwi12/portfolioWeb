export type EntryKind = 'project' | 'job' | 'education';

/** Qué puede comprobar el visitante: código público, demo en vivo o código bajo petición. */
export type Evidence = 'code' | 'demo' | 'private';

/** Un commit del historial. Sus textos viven en los locales: `log.entries.<id>.*`. */
export interface LogEntry {
  /** Slug; clave de sus textos en los locales. */
  id: string;
  kind: EntryKind;
  /** 'YYYY-MM' o 'YYYY'. */
  start: string;
  /** Igual que `start`; solo si es un periodo. */
  end?: string;
  /** Short SHA real; solo proyectos. */
  sha?: string;
  /**
   * Ids de tecnología en minúsculas. `STACK_GROUPS` es solo el subconjunto filtrable del stack: una
   * entrada puede llevar ids que no están en los grupos (axum, sqlx, clerk…).
   */
  stack: string[];
  /** Solo proyectos. */
  evidence?: Evidence;
  repoUrl?: string;
  demoUrl?: string;
  img?: string;
  /** La captura `img` muestra datos ficticios de demostración, no datos reales. */
  synthetic?: boolean;
  /** Solo cuentas. */
  featured?: boolean;
  /** Proyecto en equipo. */
  team?: boolean;
}
