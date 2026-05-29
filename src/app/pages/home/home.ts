import Typed from 'typed.js';
import { Component, AfterViewInit, ViewChild, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { About } from '../about/about';
import { Projects } from '../projects/projects';
import  { Skills } from '../skills/skills';

@Component({
  selector: 'app-home',
  imports: [About, Projects, Skills],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

// Home class
// Implements AfterViewInit, standard Angular interface, for events after the page has loaded
export class Home implements AfterViewInit {
  
  // Get the HTML element to perform the animation
  @ViewChild('typingElement') typingElement!: ElementRef;

  // Variable where we store if we are on the server or in the browser 
  private platformId = inject(PLATFORM_ID);

  // Function to perform the animation to show the information on the Home
  ngAfterViewInit(): void {

    // Perform the animation only if we are in the browser and not in a server runtime
    if (isPlatformBrowser(this.platformId)) {
      const options = { 
        strings: [
          'Desarrollador Backend',
          'un apasionado por la tecnología'
        ],
        typeSpeed: 80,
        backSpeed: 70,
        loop: true,
        showCursor: true,
        cursorChar: '|', 
      }

      new Typed(this.typingElement.nativeElement, options);
    };
  };

}
