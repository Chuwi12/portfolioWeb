import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Proyect } from '../../core/models/project.model';
import { ProjectService } from '../../core/services/project.service';
import  { IconComponent } from '../../shared/components/icon/icon';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './projects.html'
})
export class Projects implements OnInit {
  // Inyectamos el servicio
  private projectService = inject(ProjectService);

  // Señales reactivas para controlar qué ve el usuario
  protected projects = signal<Proyect[]>([]);
  protected isLoading = signal<boolean>(true);
  protected hasError = signal<boolean>(false);

  // Variable que almacena el calculo que para que se ve
  protected filteredProjects = computed(() => {
    // Almacenamos todos los filtros y los proyectos
    const filter = this.projectService.selectedFilter();
    const all = this.projects();

    // Si no hay filtros no devolvemos
    if (!filter) return all;

    // si hay filtros, retornamos el proyecto, que contenga esa tecnologia
    return all.filter(project => 
      project.technologies.some(tech => tech.toLowerCase() === filter.toLowerCase())
    );
  });

  ngOnInit(): void {
    // Llamamos al servicio al cargar el componente
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar los proyectos:', err);
        this.hasError.set(true);
        this.isLoading.set(false);
      }
    });
  }
}