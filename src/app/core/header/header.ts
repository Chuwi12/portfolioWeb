import { Component, signal, HostListener, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { I18NextModule, I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, I18NextModule],
  templateUrl: './header.html'
})
export class Header implements AfterViewInit {
  isMobileMenuOpen = false;
  
  // Variables to control the Theme, Language, and Active Section
  isDarkMode = signal<boolean>(true); 
  currentLang = signal<string>('es');
  activeSection = signal<string>('');

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  ) {
    this.currentLang.set(this.i18NextService.language || 'es');
  }

  ngAfterViewInit() {
    // Set initial active section after a short delay to ensure DOM is ready
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.onWindowScroll(), 100);
    }
  }

  navLinks = [
    { name: 'header.nav.informacion', url: '#informacion' },
    { name: 'header.nav.experiencia', url: '#experiencia-laboral' },
    { name: 'header.nav.habilidades', url: '#habilidades' },
    { name: 'header.nav.proyectos', url: '#proyectos' },
    { name: 'header.nav.contacto', url: '#contacto' }
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

  // Toggles language between es and en
  toggleLanguage() {
    const nextLang = this.currentLang() === 'es' ? 'en' : 'es';
    this.i18NextService.changeLanguage(nextLang).then(() => {
      this.currentLang.set(nextLang);
    });
  }
}