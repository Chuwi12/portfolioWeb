import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18NextModule } from 'angular-i18next';
import { Tilt } from '../../shared/directives/tilt';

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [CommonModule, I18NextModule, Tilt],
  templateUrl: './learning.html'
})
export class Learning {
  protected items = [
    { key: 'rust', progress: 68 },
    { key: 'patterns', progress: 52 }
  ];
}
