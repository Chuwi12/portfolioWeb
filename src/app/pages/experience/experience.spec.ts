import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18N_MOCK_PROVIDERS } from '../../../testing/i18n-mock';

import { Experience } from './experience';

describe('Experience', () => {
  let component: Experience;
  let fixture: ComponentFixture<Experience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Experience],
      providers: [I18N_MOCK_PROVIDERS],
    }).compileComponents();

    fixture = TestBed.createComponent(Experience);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
