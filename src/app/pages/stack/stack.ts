import { Component, inject } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { STACK_GROUPS } from '../../core/profile';
import { ProjectService } from '../../core/services/project.service';
import { ShortcutsService } from '../../core/shortcuts';

/** El stack es el filtro del historial: `git log -- <tech>`. */
@Component({
  selector: 'app-stack',
  imports: [I18NextModule],
  templateUrl: './stack.html',
  styleUrl: './stack.css',
})
export class Stack {
  protected readonly projects = inject(ProjectService);
  protected readonly shortcuts = inject(ShortcutsService);
  protected readonly groups = STACK_GROUPS;
}
