import type { L10n } from './types';

const location: L10n = { es: 'Madrid', en: 'Madrid, Spain' };

const languages: readonly { name: L10n; level: L10n }[] = [
  { name: { es: 'Español', en: 'Spanish' }, level: { es: 'Nativo', en: 'Native' } },
  { name: { es: 'Inglés', en: 'English' }, level: { es: 'B2', en: 'B2' } },
];

export const PROFILE = {
  name: 'Sergio Rodríguez',
  email: 'sergio.rodriguez.ev@gmail.com',
  phone: '+34 640 870 770',
  github: 'https://github.com/Chuwi12',
  linkedin: 'https://es.linkedin.com/in/sergio-rodr%C3%ADguez-p%C3%A9rez-a57240392',
  location,
  cv: { es: '/CV.pdf', en: '/CV-en.pdf' },
  languages,
  openToWork: true,
} as const;
