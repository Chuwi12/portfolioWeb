import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18N_MOCK_PROVIDERS } from '../../../../testing/i18n-mock';

import { ExperienceItemComponent } from './experience-item';

describe('ExperienceItemComponent', () => {
  let component: ExperienceItemComponent;
  let fixture: ComponentFixture<ExperienceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceItemComponent],
      providers: [I18N_MOCK_PROVIDERS],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceItemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
