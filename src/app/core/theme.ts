import { inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/** Color de la barra del navegador en cada tema (el mismo fondo que la página). */
const THEME_COLOR = { dark: '#030712', light: '#f3f4f6' };

/** Tema claro/oscuro. El script de index.html pone la clase `dark` antes del primer pintado. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly dark = signal(this.doc.documentElement.classList.contains('dark'));

  toggle() {
    const dark = !this.dark();
    this.dark.set(dark);
    this.doc.documentElement.classList.toggle('dark', dark);
    // Si el visitante elige contra su sistema, los <meta theme-color> con media irían al revés.
    this.doc
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((m) => m.setAttribute('content', THEME_COLOR[dark ? 'dark' : 'light']));
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {
      // Sin almacenamiento (modo privado): la elección vale solo para esta visita.
    }
  }
}
