export const PROFILE = {
  email: 'sergio.rodriguez.ev@gmail.com',
  phone: '+34 640 870 770',
  github: 'https://github.com/Chuwi12',
  linkedin: 'https://es.linkedin.com/in/sergio-rodr%C3%ADguez-p%C3%A9rez-a57240392',
  /** CV por idioma activo. */
  cv: { es: '/CV.pdf', en: '/CV-en.pdf' },
} as const;

/** Tecnologías del stack. `id` es la clave de `stack.groups.<id>` en los locales. */
export const STACK_GROUPS = [
  { id: 'languages', techs: ['go', 'rust', 'typescript', 'java', 'python', 'kotlin'] },
  { id: 'frontend', techs: ['angular', 'react', 'vite', 'tailwindcss'] },
  { id: 'data', techs: ['postgresql', 'redis', 'mysql', 'sqlite'] },
  { id: 'infra', techs: ['docker', 'aws', 'vercel'] },
] as const;
