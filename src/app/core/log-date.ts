/** '2026-09' → 'sep 2026'; 'YYYY' se deja tal cual. `months` son las 12 abreviaturas del idioma. */
const month = (date: string, months: string[]) => {
  const [year, m] = date.split('-');
  return m ? `${months[+m - 1] ?? m} ${year}` : year;
};

/** Rango de una entrada: 'sep – oct 2026' si cae en un mismo año, y si no, cada extremo con su año. */
export function formatRange(start: string, end: string | undefined, months: string[]): string {
  if (!end || end === start) return month(start, months);
  const from = month(start, months);
  if (start.slice(0, 4) === end.slice(0, 4) && start.length > 4) {
    return `${from.slice(0, -5)} – ${month(end, months)}`;
  }
  return `${from} – ${month(end, months)}`;
}
