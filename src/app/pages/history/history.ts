import { Component, inject } from '@angular/core';
import { I18NEXT_SERVICE, I18NextModule } from 'angular-i18next';
import { formatRange } from '../../core/log-date';
import { LogEntry } from '../../core/models/log-entry.model';
import { PROFILE } from '../../core/profile';
import { ProjectService } from '../../core/services/project.service';
import { IconComponent } from '../../shared/components/icon/icon';

/** Carril del grafo: 0 es main (trayectoria); los proyectos se alternan entre el 1 y el 2. */
interface Row {
  entry: LogEntry;
  lane: 0 | 1 | 2;
}

@Component({
  selector: 'app-history',
  imports: [I18NextModule, IconComponent],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {
  protected readonly projects = inject(ProjectService);
  private readonly i18n = inject(I18NEXT_SERVICE);

  protected readonly rows: Row[] = this.projects.entries.map((entry, i, all) => {
    const before = all.slice(0, i).filter((e) => e.kind === 'project').length;
    return { entry, lane: entry.kind === 'project' ? (((before % 2) + 1) as 1 | 2) : 0 };
  });

  /** «Pedir el código»: un correo a Sergio con el proyecto en el asunto. */
  protected requestHref(subject: string): string {
    return `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}`;
  }

  protected range(entry: LogEntry): string {
    const months = String(this.i18n.t('log.months')).split(' ');
    return formatRange(entry.start, entry.end, months);
  }
}
