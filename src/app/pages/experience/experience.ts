import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceItemComponent } from '../../shared/components/experience-item/experience-item';
import { I18NextModule, I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, I18NextModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class Experience implements OnInit, OnDestroy {
  experiences: any[] = [];
  private langSub?: Subscription;

  constructor(@Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService) {}

  ngOnInit() {
    this.loadExperiences();
    this.langSub = this.i18NextService.events.languageChanged.subscribe(() => {
      this.loadExperiences();
    });
  }

  loadExperiences() {
    const jobs = this.i18NextService.t('experience.jobs', { returnObjects: true });
    this.experiences = Array.isArray(jobs) ? jobs : [];
  }

  ngOnDestroy() {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
  }
}
