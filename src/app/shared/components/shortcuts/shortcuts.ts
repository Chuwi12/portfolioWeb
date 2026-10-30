import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { PROFILE } from '../../../core/profile';
import { ShortcutsService } from '../../../core/shortcuts';
import { IconComponent } from '../icon/icon';

/** Panel de ayuda (`<dialog>` modal) y aviso de «Email copiado» (región aria-live). */
@Component({
  selector: 'app-shortcuts',
  imports: [I18NextModule, IconComponent],
  templateUrl: './shortcuts.html',
  styleUrl: './shortcuts.css',
})
export class Shortcuts {
  protected readonly shortcuts = inject(ShortcutsService);
  protected readonly mailto = `mailto:${PROFILE.email}`;
  protected readonly keys = [
    { key: 'j', label: 'shortcuts.next' },
    { key: 'k', label: 'shortcuts.prev' },
    { key: '/', label: 'shortcuts.filter' },
    { key: 'c', label: 'shortcuts.copy' },
    { key: 'Esc', label: 'shortcuts.escape' },
    { key: '?', label: 'shortcuts.help' },
  ];
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('help');

  constructor() {
    // El diálogo nativo se abre y se cierra desde la señal; al cerrar devuelve el foco solo.
    effect(() => {
      const open = this.shortcuts.helpOpen();
      const dialog = this.dialog().nativeElement;
      if (open && !dialog.open) dialog.showModal?.();
      else if (!open && dialog.open) dialog.close?.();
    });
  }
}
