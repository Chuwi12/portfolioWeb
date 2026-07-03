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
  
  private apiUrls: string[] = [
    'https://api.github.com/repos/Chuwi12/TFG-',
    'https://api.github.com/repos/Tau5/pizzeria-design',
    'https://api.github.com/repos/Tau5/dedede',
    'https://api.github.com/repos/Tau5/dedede-jdbc',
    'https://api.github.com/repos/Chuwi12/Art-Space',
    'https://api.github.com/repos/Chuwi12/url-state-monitor-go'
  ];

  // Function to fetch and return the projects
  getProjects(): Observable<Proyect[]> {
    const requests = this.apiUrls.map(url => this.http.get<any>(url));
    
    return forkJoin(requests).pipe(
      map((githubRepos: any[]) => {
        // Map each GitHub JSON by passing it through our adapter function
        const publicProjects = githubRepos.map(repo => this.mapToProyect(repo));

        // Inject the private projects manually so we don't fetch them from API
        const privateProjects: Proyect[] = [
          {
            title: 'Atelier Ledger',
            description: 'SaaS de contabilidad para autónomos, multi-inquilino y de acceso restringido. Permite registrar la caja diaria por canal (efectivo, tarjeta, aplicación, Bizum), gestionar gastos con historial de auditoría inmutable, importar ingresos desde Excel y generar informes con gráficos y exportación a PDF/Excel/CSV. Arquitectura desacoplada: backend en Rust (Axum) con base de datos Turso/libSQL en el Edge, aislamiento por usuario a nivel de consulta y autenticación JWT asimétrica mediante Clerk (validación de firmas vía JWKS). Frontend React desplegado en Vercel y API contenedorizada con Docker en Render.',
            img: '/projects/atelier-ledger.webp',
            technologies: ['rust', 'axum', 'react', 'typescript', 'turso', 'sqlite', 'clerk', 'docker', 'vercel'],
            repoUrl: 'https://contabilidad-frontend-three.vercel.app',
            demoUrl: 'https://contabilidad-frontend-three.vercel.app'
          },
          {
            title: 'Cita Perfecta',
            description: 'Una romántica y tierna aplicación web interactiva en formato "Scrapbook" (diario de recuerdos) para proponer una cita y organizar todos los detalles (plan, comida, vestimenta, fecha y hora). Incluye melodías retro en Web Audio y botones interactivos de evasión.',
            img: '/projects/cita-app.webp',
            technologies: ['react', 'typescript', 'vite', 'css', 'html5', 'vercel'],
            repoUrl: 'https://cita-app-amber.vercel.app',
            demoUrl: 'https://cita-app-amber.vercel.app'
          }
        ];

        return [...publicProjects, ...privateProjects];
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