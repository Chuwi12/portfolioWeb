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
  
  // Variables para controlar el Tema y el Idioma
  isDarkMode = signal<boolean>(true); 
  currentLang = signal<string>('ES');

  navLinks = [
    { name: 'Sobre mí', url: '#informacion' },
    { name: 'Skills', url: '#habilidades' },
    { name: 'Proyectos', url: '#proyectos' },
    { name: 'Contacto', url: '#contacto' }
  ];

  // Despliega el menú en móviles
  toggleMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Alterna entre modo claro y oscuro
  toggleTheme() {
    this.isDarkMode.set(!this.isDarkMode());
    
    // Si isDarkMode es true, ponemos la clase dark. Si no, la quitamos.
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}