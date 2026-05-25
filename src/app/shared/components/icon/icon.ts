import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.html'
})
export class IconComponent {
  @Input({ required: true }) name!: string;
  
  // Funcion para devolver el simbolo svg correspondiente
  get iconUrl(): string {
    const cleanName = this.name.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
    
    // Devolver la ruta del svg
    return `/assets/icons.svg#icon-${cleanName}`;
  }
}