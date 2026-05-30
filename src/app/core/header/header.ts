import { Component, signal, HostListener, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html'
})
export class Header implements AfterViewInit {
  isMobileMenuOpen = false;
  
  // Variables to control the Theme, Language, and Active Section
  isDarkMode = signal<boolean>(true); 
  currentLang = signal<string>('ES');
  activeSection = signal<string>('');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // Set initial active section after a short delay to ensure DOM is ready
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.onWindowScroll(), 100);
    }
  }

  navLinks = [
    { name: 'Sobre mí', url: '#informacion' },
    { name: 'Experiencia', url: '#experiencia-laboral' },
    { name: 'Skills', url: '#habilidades' },
    { name: 'Proyectos', url: '#proyectos' },
    { name: 'Contacto', url: '#contacto' }
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const sections = this.navLinks.map(link => link.url.substring(1));
    let current = '';
    
    // We check from bottom to top so the lowest visible section takes precedence
    for (const section of [...sections].reverse()) {
      const element = document.getElementById(section);
      if (element) {
        if (window.scrollY >= (element.offsetTop - 150)) {
          current = section;
          break;
        }
      }
    }
    
    this.activeSection.set(current);
  }

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