import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';
import { Proyect } from '../../core/models/project.model';
import { IconComponent } from '../../shared/components/icon/icon';

@Component({
  selector: 'app-projects',
  standalone: true,
  // 2. Registramos el IconComponent aquí
  imports: [CommonModule, IconComponent], 
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements OnInit {
  private projectService = inject(ProjectService);

  rawProjects = signal<Proyect[]>([]);
  
  // Variables para comprobar si ha sido cargado o si ha habido un error
  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);

  filteredProjects = computed(() => {
    const filters = this.projectService.selectedFilters(); 
    const allProjects = this.rawProjects(); 

    if (filters.length === 0) {
      return allProjects; 
    }

    return allProjects.filter(project => 
      project.technologies.some(tech => 
        filters.map(f => f.toLowerCase()).includes(tech.toLowerCase())
      )
    );
  });

  ngOnInit() {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.rawProjects.set(data);
        this.isLoading.set(false); 
      },
      error: (err) => {
        console.error('Error al cargar los repositorios de GitHub:', err);
        // Si hay un error, mostramos tu mensaje rojo y apagamos la carga
        this.hasError.set(true);
        this.isLoading.set(false);
      }
    });
  }
}