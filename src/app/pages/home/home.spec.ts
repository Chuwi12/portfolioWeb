import { ComponentFixture, TestBed } from '@angular/core/testing';
import { i18nTestProviders } from '../../core/i18n/i18n-test';
import { LangService } from '../../core/i18n/lang';
import { PROFILE } from '../../core/profile';
import { Home } from './home';

describe('Home (HEAD)', () => {
  let fixture: ComponentFixture<Home>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [...i18nTestProviders()],
    }).compileComponents();
    fixture = TestBed.createComponent(Home);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('pinta el nombre como único h1, con el rol y los dos botones', () => {
    const h1 = el.querySelectorAll('h1');
    expect(h1).toHaveLength(1);
    expect(h1[0].textContent).toBe('Sergio Rodríguez');
    expect(el.querySelector('.role')?.textContent).toBe('Full stack en Go, Rust y TypeScript');
    expect(el.querySelector('.head .btn--outline')?.getAttribute('href')).toBe(
      `mailto:${PROFILE.email}`,
    );
  });

  it('HEAD no inventa hash ni fecha', () => {
    const refs = el.querySelector('.refs')!.textContent!;
    expect(refs).toContain('HEAD -> main');
    expect(refs).not.toMatch(/[0-9a-f]{7}|\d{4}/);
  });

  it('el CV de HEAD cambia con el idioma', async () => {
    const cv = () => el.querySelector('.head .btn--primary')!.getAttribute('href');
    expect(cv()).toBe(PROFILE.cv.es);
    await TestBed.inject(LangService).toggle();
    fixture.detectChanges();
    expect(cv()).toBe(PROFILE.cv.en);
  });
});
