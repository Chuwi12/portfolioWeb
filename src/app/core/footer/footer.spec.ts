import { ComponentFixture, TestBed } from '@angular/core/testing';
import { i18nTestProviders } from '../i18n/i18n-test';
import { PROFILE } from '../profile';
import { Footer } from './footer';

describe('Footer', () => {
  let el: HTMLElement;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [...i18nTestProviders()],
    }).compileComponents();
    fixture = TestBed.createComponent(Footer);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  const href = (selector: string) => el.querySelector(selector)?.getAttribute('href');

  it('enlaza el email y el teléfono sin ningún espacio', () => {
    expect(href('.mail')).toBe(`mailto:${PROFILE.email}`);
    expect(href('.phone')).toBe('tel:+34640870770');
  });

  it('GitHub y LinkedIn son enlaces con nombre accesible', () => {
    const social = [...el.querySelectorAll('.social')];
    expect(social.map((a) => a.getAttribute('aria-label'))).toEqual(['GitHub', 'LinkedIn']);
    expect(social.every((a) => a.getAttribute('rel') === 'noopener noreferrer')).toBe(true);
  });

  it('cierra con el año y el nombre, sin eslóganes', () => {
    expect(el.querySelector('.legal')?.textContent?.trim()).toBe(
      `© ${new Date().getFullYear()} Sergio Rodríguez`,
    );
  });
});
