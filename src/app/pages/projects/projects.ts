import { Component, OnInit, inject, signal } from '@angular/core';
import { Proyect } from '../../core/models/project.model';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.html'
})
export class Projects implements OnInit {
  // Inyectamos el servicio
  private projectService = inject(ProjectService);

  // Señales reactivas para controlar qué ve el usuario
  protected projects = signal<Proyect[]>([]);
  protected isLoading = signal<boolean>(true);
  protected hasError = signal<boolean>(false);

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