import { NETS, PROJECTS, type Lang, type Net, type NetGroup, type Period } from '../data';
import { fill, GROUP_ORDER, UI } from '../i18n/ui';

/** El dominio sale de `site` en astro.config.ts. */
export const SITE = import.meta.env.SITE.replace(/\/$/, '');
/** Ruta de cada idioma: el español es el predeterminado y no lleva prefijo. */
export const PATH: Record<Lang, string> = { es: '/', en: '/en/' };
export const url = (lang: Lang): string => new URL(PATH[lang], SITE).href;
export const otherLang = (lang: Lang): Lang => (lang === 'es' ? 'en' : 'es');

/** Un periodo es 'YYYY-MM' o 'YYYY'; el mes se escribe corto y localizado. */
function formatDate(value: string, lang: Lang): { date: Date; text: string } {
  const [year = '1970', month] = value.split('-');
  const date = new Date(Date.UTC(Number(year), month ? Number(month) - 1 : 0, 1));
  const options: Intl.DateTimeFormatOptions = month
    ? { month: 'short', year: 'numeric', timeZone: 'UTC' }
    : { year: 'numeric', timeZone: 'UTC' };
  return { date, text: new Intl.DateTimeFormat(lang, options).format(date) };
}

/**
 * Sin `end` el periodo está en curso («desde sep 2026»); con `end` igual a `start` es un solo mes o
 * año y se escribe una vez.
 */
export function formatPeriod(p: Period, lang: Lang): string {
  const start = formatDate(p.start, lang);
  if (!p.end) return fill(UI[lang].periodSince, { start: start.text });
  if (p.end === p.start) return start.text;
  const end = formatDate(p.end, lang);
  const options: Intl.DateTimeFormatOptions = p.start.includes('-')
    ? { month: 'short', year: 'numeric', timeZone: 'UTC' }
    : { year: 'numeric', timeZone: 'UTC' };
  return new Intl.DateTimeFormat(lang, options).formatRange(start.date, end.date);
}

export const netById = new Map<string, Net>(NETS.map((n) => [n.id, n]));
export const netLabel = (id: string): string => netById.get(id)?.label ?? id;

const projectUse = new Map<string, number>();
for (const p of PROJECTS)
  for (const id of p.nets) projectUse.set(id, (projectUse.get(id) ?? 0) + 1);

/** Las tecnologías que usa al menos un proyecto: solo ellas filtran. */
const filterable = NETS.filter((n) => projectUse.has(n.id));

export function stackGroups(): { group: NetGroup; nets: Net[] }[] {
  return GROUP_ORDER.map((group) => ({
    group,
    nets: filterable.filter((n) => n.group === group),
  })).filter((g) => g.nets.length > 0);
}

/** Las `count` tecnologías más usadas por los proyectos, en el orden de los grupos. */
export function topNets(count: number): Net[] {
  const byUse = [...filterable].sort(
    (a, b) => (projectUse.get(b.id) ?? 0) - (projectUse.get(a.id) ?? 0),
  );
  const picked = new Set(byUse.slice(0, count).map((n) => n.id));
  return GROUP_ORDER.flatMap((group) =>
    filterable.filter((n) => n.group === group && picked.has(n.id)),
  );
}
