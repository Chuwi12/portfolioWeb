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
    'react', 'html', 'tailwindcss', 'kotlin', 'go', 'shellscript', 'code'
  ]);

  // Function to return the corresponding SVG symbol
  get iconUrl(): string {
    const cleanName = this.name.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
    const finalName = this.validIcons.has(cleanName) ? cleanName : 'code';
    
    // Return the SVG path with a cache-buster
    return `/assets/icons.svg?v=2#icon-${finalName}`;
  }
}