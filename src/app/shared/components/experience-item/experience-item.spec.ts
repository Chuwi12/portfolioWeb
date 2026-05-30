import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceItem } from './experience-item';

describe('ExperienceItem', () => {
  let component: ExperienceItem;
  let fixture: ComponentFixture<ExperienceItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceItem],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
