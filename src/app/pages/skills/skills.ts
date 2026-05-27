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
  
  // Accedemos al signal del array del servicio (recuerda que en el servicio debe llamarse selectedFilters)
  protected activeFilters = this.projectService.selectedFilters;

  // Lista de habilidadades principales
  protected skillList = [
    'Angular', 'TypeScript', 'Python', 'Java', 'MySQL', 'NodeJS', 'CSS', 'HTML', 'TailwindCSS'
  ];

  // Función para activar/desactivar múltiples filtros
  toggleFilter(tech: string) {
    const currentFilters = this.activeFilters();
    
    // Comprobamos si la tecnología ya está seleccionada (ignorando mayúsculas/minúsculas)
    const isSelected = currentFilters.some(
      (filter) => filter.toLowerCase() === tech.toLowerCase()
    );

    if (isSelected) {
      // Si ya está seleccionada, la quitamos del array
      this.projectService.selectedFilters.set(
        currentFilters.filter((filter) => filter.toLowerCase() !== tech.toLowerCase())
      );
    } else {
      // Si no está seleccionada, creamos un nuevo array con las que ya había + la nueva
      this.projectService.selectedFilters.set([...currentFilters, tech]);
    }
  }
}