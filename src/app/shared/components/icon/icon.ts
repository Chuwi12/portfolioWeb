import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.html'
})
export class IconComponent {
  @Input({ required: true }) name!: string;
  
  // Valid icons set
  private validIcons = new Set([
    'angular', 'python', 'css', 'typescript', 'java', 'mysql', 'nodejs',
    'react', 'html', 'html5', 'tailwindcss', 'kotlin', 'go', 'shellscript',
    'rust', 'docker', 'vercel', 'vite', 'sqlite', 'clerk', 'turso',
    'pytorch', 'mermaid', 'express', 'code'
  ]);

  // Aliases: distintos nombres que apuntan al mismo icono de marca
  private aliases: Record<string, string> = {
    golang: 'go',
    nodejs: 'nodejs',
    node: 'nodejs',
    nextjs: 'vercel',
    libsql: 'turso',
    postgres: 'mysql',
    postgresql: 'mysql'
  };

  // Function to return the corresponding SVG symbol
  get iconUrl(): string {
    let cleanName = this.name.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
    cleanName = this.aliases[cleanName] ?? cleanName;
    const finalName = this.validIcons.has(cleanName) ? cleanName : 'code';

    // Return the SVG path with a cache-buster
    return `/assets/icons.svg?v=3#icon-${finalName}`;
  }
}