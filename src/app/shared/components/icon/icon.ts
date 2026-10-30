import { Component, computed, input } from '@angular/core';

export type IconName =
  | 'download'
  | 'mail'
  | 'external'
  | 'code'
  | 'sun'
  | 'moon'
  | 'menu'
  | 'close'
  | 'github'
  | 'linkedin';

/** El sprite va en /assets con caché `immutable` de un año: súbele la versión al cambiarlo. */
const SPRITE = '/assets/icons.svg?v=4';

/** Icono de interfaz del sprite propio; hereda color y tamaño (1em) del texto. */
@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
})
export class IconComponent {
  readonly name = input.required<IconName>();
  protected readonly href = computed(() => `${SPRITE}#icon-${this.name()}`);
}
