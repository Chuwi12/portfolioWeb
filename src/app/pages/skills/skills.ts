import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';
import { IconComponent } from '../../shared/components/icon/icon';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills {
  // Inyectamos el servicio para controlar el filtro
  private projectService = inject(ProjectService);
  
  // Accedemos al signal del servicio para saber cuál está activo
  protected activeFilter = this.projectService.selectedFilter;

  // Lista de tus habilidades principales
  // Asegúrate de que coincidan con los nombres que usas en los proyectos
  protected skillList = [
    'Angular', 'TypeScript', 'Python', 'Java', 'MySQL', 'NodeJS', 'CSS', 'HTML', 'TailwindCSS'
  ];

  // Función mágica para activar/desactivar filtros
  toggleFilter(tech: string) {
    const current = this.activeFilter();
    // Si ya está seleccionada, la quitamos
    // Si no, ponemos la nueva tecnología
    if (current?.toLowerCase() === tech.toLowerCase()) {
      this.projectService.selectedFilter.set(null);
    } else {
      this.projectService.selectedFilter.set(tech);
    }
  }
}