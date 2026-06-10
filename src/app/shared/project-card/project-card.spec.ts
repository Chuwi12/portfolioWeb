import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18N_MOCK_PROVIDERS } from '../../../testing/i18n-mock';

import { ProjectCard } from './project-card';

describe('ProjectCard', () => {
  let component: ProjectCard;
  let fixture: ComponentFixture<ProjectCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCard],
      providers: [I18N_MOCK_PROVIDERS],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
