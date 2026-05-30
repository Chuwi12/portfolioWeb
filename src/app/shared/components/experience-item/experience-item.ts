import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience-item',
  imports: [CommonModule],
  templateUrl: './experience-item.html',
  styleUrl: './experience-item.css'
})
export class ExperienceItemComponent {
  @Input({ required: true }) position!: string;
  @Input({ required: true }) company!: string;
  @Input({ required: true }) duration!: string;
  @Input({ required: true }) description!: string;
}
