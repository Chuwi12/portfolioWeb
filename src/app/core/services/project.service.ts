import { Injectable, inject, signal } from '@angular/core';
import { Proyect } from '../models/project.model';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);

  // Public variable to store what is selected and what is not
  public selectedFilters = signal<string[]>([]);
  
  // List of project APIs (To add a new one, just add the URL here)
  private apiUrls: string[] = [
    'https://api.github.com/repos/Chuwi12/TFG-',
    'https://api.github.com/repos/Tau5/pizzeria-design',
    'https://api.github.com/repos/Tau5/dedede',
    'https://api.github.com/repos/Tau5/dedede-jdbc',
    'https://api.github.com/repos/Chuwi12/Art-Space'
  ];

  // Function to fetch and return the projects
  getProjects(): Observable<Proyect[]> {
    const requests = this.apiUrls.map(url => this.http.get<any>(url));
    
    return forkJoin(requests).pipe(
      map((githubRepos: any[]) => {
        // Map each GitHub JSON by passing it through our adapter function
        return githubRepos.map(repo => this.mapToProyect(repo));
      })
    );
  }

  // Transforms the raw GitHub object to our Project interface dynamically.
  private mapToProyect(repo: any): Proyect {
    
    // We use GitHub tags. If there are none, we use mine.
    const extractedTechs = (repo.topics && repo.topics.length > 0) 
      ? repo.topics 
      : (repo.language ? [repo.language] : ['Code']);

    // Convert to lowercase and remove spaces to standardize the file name
    const safeName = repo.name.toLowerCase().trim();
    const imagePath = `/projects/${safeName}.jpg`;

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