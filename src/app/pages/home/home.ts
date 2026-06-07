import Typed from 'typed.js';
import { Component, AfterViewInit, ViewChild, ElementRef, PLATFORM_ID, inject, Inject, OnDestroy } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { About } from '../about/about';
import { Experience } from '../experience/experience';
import { Projects } from '../projects/projects';
import  { Skills } from '../skills/skills';
import { I18NextModule, I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, I18NextModule, About, Experience, Projects, Skills],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

// Home class
// Implements AfterViewInit, standard Angular interface, for events after the page has loaded
export class Home implements AfterViewInit, OnDestroy {
  
  // Get the HTML element to perform the animation
  @ViewChild('typingElement') typingElement!: ElementRef;

  // Variable where we store if we are on the server or in the browser 
  private platformId = inject(PLATFORM_ID);
  
  private typedInstance: any;
  private langSub?: Subscription;

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  ) {}

  // Function to perform the animation to show the information on the Home
  ngAfterViewInit(): void {

    // Perform the animation only if we are in the browser and not in a server runtime
    if (isPlatformBrowser(this.platformId)) {
      this.initTyped();
      
      this.langSub = this.i18NextService.events.languageChanged.subscribe(() => {
        this.initTyped();
      });
    }
  }

  initTyped() {
    if (this.typedInstance) {
      this.typedInstance.destroy();
    }

    const roles = this.i18NextService.t('home.roles', { returnObjects: true }) as string[];

    const options = { 
      strings: roles && roles.length ? roles : ['Desarrollador Backend', 'un apasionado por la tecnología'],
      typeSpeed: 80,
      backSpeed: 70,
      loop: true,
      showCursor: true,
      cursorChar: '|', 
    }

    this.typedInstance = new Typed(this.typingElement.nativeElement, options);
  }

  ngOnDestroy() {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
    if (this.typedInstance) {
      this.typedInstance.destroy();
    }
  }
}
