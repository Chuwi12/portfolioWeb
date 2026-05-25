import { Injectable, inject } from '@angular/core';
import { Proyect } from '../models/project.model';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient); 
  
  // Lista de las APIs de los proyectos (Para añadir uno nuevo, solo añades la URL aquí)
  private apiUrls: string[] = [
    'https://api.github.com/repos/Chuwi12/TFG-',
  ];

  // FUncion para obtener y devolver los proyectosj
  getProjects(): Observable<Proyect[]> {
    const requests = this.apiUrls.map(url => this.http.get<any>(url));
    
    return forkJoin(requests).pipe(
      map((githubRepos: any[]) => {
        // Mapeamos cada JSON de GitHub pasándolo por nuestra función adaptadora
        return githubRepos.map(repo => this.mapToProyect(repo));
      })
    );
  }

  // Transforma el objeto crudo de GitHub a nuestra interfaz Proyect de forma dinámica.
  private mapToProyect(repo: any): Proyect {
    
    // Usamos los 'topics' de GitHub. Si no hay, usamos el 'language' principal.
    const extractedTechs = (repo.topics && repo.topics.length > 0) 
      ? repo.topics 
      : (repo.language ? [repo.language] : ['Code']);

    // Convertimos a minúsculas y quitamos espacios para estandarizar el nombre del archivo
    const safeName = repo.name.toLowerCase().trim();
    const imagePath = `/assets/${safeName}.jpg`;

    return {
      title: repo.name,
      description: repo.description || 'Repositorio sin descripción.',
      img: imagePath,
      technologies: extractedTechs,
      repoUrl: repo.html_url,
      demoUrl: repo.homepage || undefined
    };
  }
}