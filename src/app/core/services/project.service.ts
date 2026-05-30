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
    
    // Merge the primary language and GitHub topics so no tags are lost
    const extractedTechs = new Set<string>();
    
    if (repo.language) {
      extractedTechs.add(repo.language.toLowerCase());
    }
    
    if (repo.topics && repo.topics.length > 0) {
      repo.topics.forEach((t: string) => extractedTechs.add(t.toLowerCase()));
    }

    const finalTechs = extractedTechs.size > 0 ? Array.from(extractedTechs) : ['code'];

    // Convert to lowercase and remove spaces to standardize the file name
    const safeName = repo.name.toLowerCase().trim();
    const imagePath = `/projects/${safeName}.webp`;

    return {
      title: repo.name,
      description: repo.description || 'Repositorio sin descripción.',
      img: imagePath,
      technologies: finalTechs,
      repoUrl: repo.html_url,
      demoUrl: repo.homepage || undefined
    };
  }
}