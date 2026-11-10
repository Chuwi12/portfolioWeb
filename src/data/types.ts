import type { ImageMetadata } from 'astro';

export type Lang = 'es' | 'en';
/** Texto en los dos idiomas. */
export type L10n = Record<Lang, string>;

/** Qué puede comprobar el visitante: código público, demo en vivo o código bajo petición. */
export type Evidence = 'code' | 'demo' | 'private';

export type NetGroup = 'languages' | 'ai' | 'frontend' | 'backend' | 'infra';

/** Una tecnología: una red de la placa. */
export interface Net {
  /** Slug estable, se usa en `?tec=<id>`. */
  id: string;
  label: string;
  group: NetGroup;
}

/** 'YYYY-MM' o 'YYYY'. */
export interface Period {
  start: string;
  end?: string;
}

export interface Project {
  id: string;
  /** Designador de la placa: U2, U3… (U1 es Sergio). */
  ref: string;
  zone: 'ai' | 'platform';
  title: L10n;
  /** Una línea: qué es. */
  tagline: L10n;
  /** Dos o tres frases. */
  summary: L10n;
  /** De dos a cuatro hechos comprobables, en el mismo orden en los dos idiomas. */
  highlights: L10n[];
  /** Ids de `NETS`; cada uno debe existir. */
  nets: string[];
  evidence: Evidence;
  repoUrl?: string;
  demoUrl?: string;
  image?: { src: ImageMetadata; alt: L10n; synthetic: boolean };
  period: Period;
  team?: boolean;
  /** Proyecto destacado de su zona: va primero y a mayor tamaño. */
  featured?: boolean;
}

export interface Role {
  id: string;
  kind: 'job' | 'education';
  title: L10n;
  org: L10n;
  /** Prácticas, grado superior, etc. */
  detail: L10n;
  /** Ausente cuando ninguna fuente da fechas (Ciberseguridad). */
  period?: Period;
  summary: L10n;
  nets: string[];
}

export interface Faq {
  q: L10n;
  a: L10n;
}
