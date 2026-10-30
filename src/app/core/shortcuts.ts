import { DOCUMENT } from '@angular/common';
import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { PROFILE } from './profile';
import { ProjectService } from './services/project.service';

/** Donde se escribe, las teclas son del texto, no atajos. */
const TYPING = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';

export type Notice = 'copied' | 'failed' | null;

/** Clave de localStorage: 'off' apaga los atajos de una sola tecla (WCAG 2.1.4). */
const STORAGE_KEY = 'shortcuts';

/** Atajos de teclado tipo git. `App` le pasa los `keydown` del documento. */
@Injectable({ providedIn: 'root' })
export class ShortcutsService implements OnDestroy {
  private readonly doc = inject(DOCUMENT);
  private readonly projects = inject(ProjectService);
  private timer?: ReturnType<typeof setTimeout>;

  readonly helpOpen = signal(false);
  /** Atajos de un solo carácter: activados por defecto; el visitante puede apagarlos (WCAG 2.1.4). */
  readonly enabled = signal(this.stored() !== 'off');
  /** Aviso de la tecla `c`; se apaga solo. */
  readonly notice = signal<Notice>(null);

  setEnabled(on: boolean) {
    this.enabled.set(on);
    try {
      localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off');
    } catch {
      // Sin almacenamiento (modo privado): la elección vale solo para esta visita.
    }
  }

  private stored(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  handle(e: KeyboardEvent) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.target instanceof Element && e.target.closest(TYPING)) return;
    // Apagados, solo queda Esc: cerrar la ayuda o quitar el filtro no es un atajo de un carácter.
    if (!this.enabled() && e.key !== 'Escape') return;

    // Con la ayuda abierta (modal) solo Esc y ? hacen algo: cerrarla.
    if (this.helpOpen()) {
      if (e.key === 'Escape' || e.key === '?') {
        e.preventDefault();
        this.helpOpen.set(false);
      }
      return;
    }

    switch (e.key) {
      case 'j':
      case 'k':
        e.preventDefault();
        this.move(e.key === 'j' ? 1 : -1);
        break;
      case '/':
        e.preventDefault();
        this.focusFilter();
        break;
      case 'c':
        void this.copyEmail();
        break;
      case 'Escape':
        this.projects.clear();
        break;
      case '?':
        e.preventDefault();
        this.helpOpen.set(true);
        break;
    }
  }

  /** Foco al commit siguiente o anterior (los plegados por el filtro no cuentan). */
  private move(step: 1 | -1) {
    const rows = [...this.doc.querySelectorAll<HTMLElement>('li.entry:not(.is-folded)')];
    if (!rows.length) return;
    const current = rows.findIndex((r) => r.contains(this.doc.activeElement));
    let target: number;
    if (current >= 0) {
      target = Math.min(rows.length - 1, Math.max(0, current + step));
    } else {
      // Sin foco en el historial: el primer commit que queda por debajo (j) o el último por
      // encima (k) de la mitad de la pantalla.
      const mid = (this.doc.defaultView?.innerHeight ?? 0) / 2;
      const rect = (r: HTMLElement) => r.getBoundingClientRect();
      target = step === 1 ? rows.findIndex((r) => rect(r).bottom > mid) : -1;
      if (step === -1) rows.forEach((r, i) => rect(r).top < mid && (target = i));
      if (target < 0) target = step === 1 ? rows.length - 1 : 0;
    }
    this.reveal(rows[target].querySelector<HTMLElement>('h3') ?? rows[target]);
  }

  private focusFilter() {
    const chip = this.doc.querySelector<HTMLElement>('app-stack .chip');
    if (chip) this.reveal(chip);
  }

  /** Foco sin salto y desplazamiento centrado, suave salvo con reduced-motion. */
  private reveal(el: HTMLElement) {
    const reduced = this.doc.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.focus({ preventScroll: true });
    el.scrollIntoView?.({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
  }

  private async copyEmail() {
    try {
      await this.doc.defaultView!.navigator.clipboard.writeText(PROFILE.email);
      this.show('copied');
    } catch {
      this.show('failed');
    }
  }

  private show(kind: Exclude<Notice, null>) {
    clearTimeout(this.timer);
    this.notice.set(kind);
    this.timer = setTimeout(() => this.notice.set(null), 5000);
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }
}
