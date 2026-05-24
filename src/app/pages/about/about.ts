import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  
  protected readonly biography: string = 
    'Soy Sergio Rodríguez, un desarrollador enfocado en la realización de soluciones backend eficientes y escalables. ' +
    'Actualmente, me encuentro <strong>finalizando mis estudios en el Grado Superior de Desarrollo de Aplicaciones Multiplataforma (DAM)</strong>. ' +
    'Como apasionado de la tecnología, siempre estoy buscando aprender <strong>nuevas herramientas</strong>; ' + 
    'estoy especializado en desarrollos con <strong>Java</strong>, aunque también tengo experiencia desarrollando con <strong>Python</strong>. ' +
    'En estos momentos, estoy profundizando en el lenguaje Rust y en patrones de diseño, con el objetivo de diseñar arquitecturas de software robustas y resolver problemas complejos.'; 
}