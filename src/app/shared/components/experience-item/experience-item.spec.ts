import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceItemComponent } from './experience-item';

describe('ExperienceItemComponent', () => {
  let component: ExperienceItemComponent;
  let fixture: ComponentFixture<ExperienceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceItemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
