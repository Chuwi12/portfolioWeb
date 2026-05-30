import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceItemComponent } from '../../shared/components/experience-item/experience-item';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ExperienceItemComponent],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class Experience {
  experiences = [
    {
      position: 'FullStack Developer Salesforce',
      company: 'VASS',
      duration: 'Marzo 2026 - Mayo 2026',
      description: 'Desarrollé varios Lightning Web Components para la visualización de datos recogidos con integraciones externas en portales de la comunidad. Desarrollé clases Apex para la lógica de negocio del backend. Creé, configuré y administré Permission Sets y mantuve responsabilidades DevOps.'
    },
    {
      position: 'Frontend Developer',
      company: 'CRC',
      duration: 'Abril 2025 - Mayo 2025',
      description: 'Desarrollé una app web frontend con Angular. Desplegué servicios web en AWS e implementé una app en JavaScript paralelizada para manejar respuestas de una API REST.'
    }
  ];
}
