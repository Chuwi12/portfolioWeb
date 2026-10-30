import { computed, Injectable, signal } from '@angular/core';
import { LogEntry } from '../models/log-entry.model';
import { LOG_ENTRIES } from './log-entries';

const normalize = (tech: string) => tech.toLowerCase().replace(/[^a-z0-9]/g, '');

/** Lo que el visitante señala con el ratón o el foco: una entrada del historial o una tecnología. */
export type Highlight = { kind: 'entry' | 'tech'; id: string } | null;

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  readonly entries: readonly LogEntry[] = LOG_ENTRIES;

  /** Tecnologías activas en el filtro; vacío = sin filtro. */
  readonly selectedFilters = signal<string[]>([]);

  /** `git log -- <tech>`: una entrada pasa si usa alguna de las tecnologías activas. */
  matches(entry: LogEntry): boolean {
    const filters = this.selectedFilters();
    return filters.length === 0 || filters.some((f) => entry.stack.includes(normalize(f)));
  }

  /** Entradas que pasan el filtro. */
  readonly shown = computed(() => this.entries.filter((e) => this.matches(e)).length);

  /** Entradas que usan la tecnología, con o sin filtro activo. */
  count(tech: string): number {
    return this.entries.filter((e) => e.stack.includes(normalize(tech))).length;
  }

  isActive(tech: string): boolean {
    return this.selectedFilters().some((f) => normalize(f) === normalize(tech));
  }

  toggle(tech: string) {
    this.selectedFilters.update((filters) =>
      this.isActive(tech)
        ? filters.filter((f) => normalize(f) !== normalize(tech))
        : [...filters, tech],
    );
  }

  clear() {
    this.selectedFilters.set([]);
  }

  /** Resaltado, no filtro: no pliega nada. Lo fijan el ratón y el foco, y lo limpian al salir. */
  readonly highlight = signal<Highlight>(null);

  highlightEntry(id: string) {
    this.highlight.set({ kind: 'entry', id });
  }

  highlightTech(id: string) {
    this.highlight.set({ kind: 'tech', id });
  }

  clearHighlight() {
    this.highlight.set(null);
  }

  /** ¿Está resaltada su rama? La señalada, o las que usan la tecnología señalada. */
  isEntryLit(entry: LogEntry): boolean {
    const h = this.highlight();
    if (!h) return false;
    return h.kind === 'entry' ? h.id === entry.id : entry.stack.includes(normalize(h.id));
  }

  /** ¿Está resaltada su tecnología? La señalada, o las del commit señalado. */
  isTechLit(tech: string): boolean {
    const h = this.highlight();
    if (!h) return false;
    if (h.kind === 'tech') return normalize(h.id) === normalize(tech);
    return !!this.entries.find((e) => e.id === h.id)?.stack.includes(normalize(tech));
  }
}
