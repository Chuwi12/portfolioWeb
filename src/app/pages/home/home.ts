import Typed from 'typed.js';
import { Component, AfterViewInit, ViewChild, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { About } from '../about/about';
import { Projects } from '../projects/projects';


@Component({
  selector: 'app-home',
  imports: [About, Projects],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

// Clase de inicio
// Implemente AfterViewInit, interfaz estandar de Angular, para eventos una vez se haya cargado la pagina
export class Home implements AfterViewInit {
  
  // Obtener el elemento HTML para realizar la animación
  @ViewChild('typingElement') typingElement!: ElementRef;

  // Variable en la que almacenamos si estamos en el servidor o en la web 
  private platformId = inject(PLATFORM_ID);

  // Funcion para realizar la animacion para mostrar la informacion en el Home
  ngAfterViewInit(): void {

    // Realiza la animación solo si nos encontramos en el navegador y no en un runtime en el servidor
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
