import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html'
})
export class Header {
  isMobileMenuOpen = false;
  
  // Variables to control the Theme and Language
  isDarkMode = signal<boolean>(true); 
  currentLang = signal<string>('ES');

  navLinks = [
    { name: 'Sobre mí', url: '#informacion' },
    { name: 'Skills', url: '#habilidades' },
    { name: 'Proyectos', url: '#proyectos' },
    { name: 'Contacto', url: '#contacto' }
  ];

  // Toggles the mobile menu
  toggleMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Toggles between light and dark mode
  toggleTheme() {
    this.isDarkMode.set(!this.isDarkMode());
    
    // If isDarkMode is true, we add the dark class. Otherwise, we remove it.
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}