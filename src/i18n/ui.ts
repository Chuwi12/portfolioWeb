import type { Lang, NetGroup } from '../data';

/** Cadenas de interfaz no ligadas a proyectos. Origen: docs/copy-home.md. */
const es = {
  htmlLang: 'es',
  locale: 'es_ES',
  seoTitle: 'Sergio Rodríguez | Full stack y AI engineering',
  seoDescription:
    'Desarrollador full stack en Go, Rust y TypeScript que construye aplicaciones con LLM locales comprobables y plataformas SaaS completas. Proyectos, código, CV y contacto.',
  skipLink: 'Saltar al contenido',
  homeLabel: 'Inicio',
  navLabel: 'Principal',
  navProjects: 'Proyectos',
  navStack: 'Stack',
  navBackground: 'Trayectoria',
  navContact: 'Contacto',
  menuOpen: 'Abrir menú',
  menuClose: 'Cerrar menú',
  langSwitchLabel: 'Idioma',
  themeGroupLabel: 'Tema',
  themeLightLabel: 'Tema claro',
  themeDarkLabel: 'Tema oscuro',

  heroRole: 'Full stack y AI engineering',
  heroPitch:
    'Construyo producto completo, de la base de datos a la interfaz, y le añado IA que se puede comprobar: el código calcula las cifras y el modelo las explica citando la fuente.',
  openToWork: 'Disponible para trabajar',
  statusDetail: 'En Madrid. Español nativo e inglés B2.',
  cvDownload: 'Descargar CV (PDF)',
  emailMe: 'Escribirme',

  aiTitle: 'IA que se puede comprobar',
  aiIntro:
    'Uso modelos que corren en local y los ato a los datos: si el modelo da una cifra que no está en la fuente, se marca o se descarta.',
  aiStatement: 'El código calcula. El modelo explica.',
  platformsTitle: 'Plataformas de punta a punta',
  platformsIntro: 'SaaS completos: dominio, API, base de datos, interfaz y despliegue.',

  evidenceCode: 'Código público',
  evidenceDemo: 'Demo en vivo',
  evidencePrivate: 'Código bajo petición',
  actionCode: 'Ver código',
  actionDemo: 'Abrir demo',
  actionRequest: 'Pedir el código',
  requestSubject: 'Código de {title}',
  team: 'En equipo',
  synthetic: 'Datos de demostración',
  periodSince: 'desde {start}',
  externalLink: '(se abre en una pestaña nueva)',

  stackTitle: 'Stack',
  stackHelp: 'Pulsa una tecnología para ver los proyectos que la usan.',
  stackOne: '1 proyecto usa {tech}',
  stackMany: '{n} proyectos usan {tech}',
  stackClear: 'Ver todos',
  stackMatches: 'Proyectos que la usan',
  stackBuilt: 'Con lo que construyo',
  techListLabel: 'Tecnologías',
  stackArchitecture: 'Arquitectura: microservicios, hexagonal, multi-tenant, WebSockets.',
  stackSecurity: 'Seguridad: JWT, MFA/TOTP, cifrado de extremo a extremo.',

  backgroundTitle: 'Trayectoria',
  backgroundJobs: 'Experiencia',
  backgroundEducation: 'Formación',
  backgroundLanguages: 'Idiomas',

  faqTitle: 'Preguntas frecuentes',

  contactTitle: 'Hablemos',
  contactText:
    'Si buscas a alguien que lleve un producto de la base de datos a la IA, escríbeme o descarga el CV.',
  copyEmail: 'Copiar email',
  copied: 'Email copiado',
  copyError: 'No se pudo copiar. El email es {email}.',
  contactEmail: 'Email',
  contactPhone: 'Teléfono',
  contactLocation: 'Ubicación',
  avatarAlt: 'Retrato de Sergio Rodríguez',

  footerCookies: 'Sin cookies. Analítica anónima de Vercel.',
  footerRights: '© 2026 Sergio Rodríguez. Código MIT; diseño y contenidos reservados.',

  notFoundTitle: 'Compartimento vacío',
  notFoundText: 'Esta página no existe.',
  notFoundBack: 'Volver al inicio',
  jobTitle: 'Full stack y AI engineering',
};

export type UiKey = keyof typeof es;

const en: Record<UiKey, string> = {
  htmlLang: 'en',
  locale: 'en_US',
  seoTitle: 'Sergio Rodríguez | Full stack & AI engineering',
  seoDescription:
    'Full stack developer in Go, Rust and TypeScript who builds checkable local LLM applications and complete SaaS platforms. Projects, code, CV and contact.',
  skipLink: 'Skip to content',
  homeLabel: 'Home',
  navLabel: 'Main',
  navProjects: 'Projects',
  navStack: 'Stack',
  navBackground: 'Background',
  navContact: 'Contact',
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
  langSwitchLabel: 'Language',
  themeGroupLabel: 'Theme',
  themeLightLabel: 'Light theme',
  themeDarkLabel: 'Dark theme',

  heroRole: 'Full stack & AI engineering',
  heroPitch:
    'I build complete products, from the database to the interface, and add AI you can check: the code computes the figures and the model explains them, citing its sources.',
  openToWork: 'Open to work',
  statusDetail: 'Based in Madrid. Native Spanish and B2 English.',
  cvDownload: 'Download CV (PDF)',
  emailMe: 'Email me',

  aiTitle: 'AI you can check',
  aiIntro:
    'I use models that run locally and tie them to the data: if the model states a figure that is not in the source, it gets flagged or dropped.',
  aiStatement: 'The code computes. The model explains.',
  platformsTitle: 'End-to-end platforms',
  platformsIntro: 'Complete SaaS products: domain, API, database, interface and deployment.',

  evidenceCode: 'Public code',
  evidenceDemo: 'Live demo',
  evidencePrivate: 'Code on request',
  actionCode: 'View code',
  actionDemo: 'Open demo',
  actionRequest: 'Request the code',
  requestSubject: '{title} source code',
  team: 'Team project',
  synthetic: 'Demo data',
  periodSince: 'since {start}',
  externalLink: '(opens in a new tab)',

  stackTitle: 'Stack',
  stackHelp: 'Press a technology to see the projects that use it.',
  stackOne: '1 project uses {tech}',
  stackMany: '{n} projects use {tech}',
  stackClear: 'Show all',
  stackMatches: 'Projects that use it',
  stackBuilt: 'What I build with',
  techListLabel: 'Technologies',
  stackArchitecture: 'Architecture: microservices, hexagonal, multi-tenant, WebSockets.',
  stackSecurity: 'Security: JWT, MFA/TOTP, end-to-end encryption.',

  backgroundTitle: 'Background',
  backgroundJobs: 'Experience',
  backgroundEducation: 'Education',
  backgroundLanguages: 'Languages',

  faqTitle: 'Frequently asked questions',

  contactTitle: "Let's talk",
  contactText:
    'If you need someone who takes a product from the database to the AI, email me or download my CV.',
  copyEmail: 'Copy email',
  copied: 'Email copied',
  copyError: 'Could not copy. The email is {email}.',
  contactEmail: 'Email',
  contactPhone: 'Phone',
  contactLocation: 'Location',
  avatarAlt: 'Portrait of Sergio Rodríguez',

  footerCookies: 'No cookies. Anonymous Vercel analytics.',
  footerRights: '© 2026 Sergio Rodríguez. Code under MIT; design and content reserved.',

  notFoundTitle: 'Empty compartment',
  notFoundText: 'This page does not exist.',
  notFoundBack: 'Back to home',
  jobTitle: 'Full stack & AI engineering',
};

export const UI: Record<Lang, Record<UiKey, string>> = { es, en };

/**
 * Demo del verificador (docs/copy-home.md §2b): datos ficticios de una empresa inventada.
 * En `answer`, `{D1}` es una cita y `[74 %]` la cifra que el verificador descarta.
 */
export interface Demo {
  label: string;
  title: string;
  subtitle: string;
  tag: string;
  question: string;
  tableCaption: string;
  rows: { id: string; source: string; value: string }[];
  answer: string;
  verdict: string;
  note: string;
  link: string;
  /** Botón para pausar el bucle de la demo (WCAG 2.2.2) y para reanudarlo. */
  pause: string;
}

export const DEMO: Record<Lang, Demo> = {
  es: {
    label: 'Demostración del verificador de invest-ai',
    title: 'invest-ai',
    subtitle: 'verificador en directo',
    tag: 'LLM local',
    question: 'Resume los márgenes de ACME',
    tableCaption: 'Datos que recibe el modelo',
    rows: [
      { id: 'D1', source: 'Informe trimestral, margen bruto', value: '61,2\u00a0%' },
      { id: 'D2', source: 'Balance, deuda neta', value: '−8\u00a0%' },
    ],
    answer:
      'El margen bruto subió al 61,2\u00a0% {D1} y la deuda neta bajó un 8\u00a0% {D2}. El consenso espera un [74\u00a0%] el año que viene.',
    verdict: '«74\u00a0%» no está en los datos: descartada',
    note: 'Demostración ilustrativa con datos ficticios',
    link: 'Ver el proyecto',
    pause: 'Pausar',
  },
  en: {
    label: 'Demo of the invest-ai verifier',
    title: 'invest-ai',
    subtitle: 'live verifier',
    tag: 'Local LLM',
    question: "Summarise ACME's margins",
    tableCaption: 'Data the model receives',
    rows: [
      { id: 'D1', source: 'Quarterly report, gross margin', value: '61.2%' },
      { id: 'D2', source: 'Balance sheet, net debt', value: '−8%' },
    ],
    answer:
      'Gross margin rose to 61.2% {D1} and net debt fell 8% {D2}. Consensus expects [74%] next year.',
    verdict: '"74%" is not in the data: dropped',
    note: 'Illustrative demo with made-up data',
    link: 'See the project',
    pause: 'Pause',
  },
};

export const GROUP_LABEL: Record<Lang, Record<NetGroup, string>> = {
  es: {
    languages: 'Lenguajes',
    ai: 'IA',
    frontend: 'Frontend',
    backend: 'Backend y datos',
    infra: 'Infraestructura',
  },
  en: {
    languages: 'Languages',
    ai: 'AI',
    frontend: 'Frontend',
    backend: 'Backend & data',
    infra: 'Infrastructure',
  },
};

export const GROUP_ORDER: readonly NetGroup[] = ['languages', 'ai', 'frontend', 'backend', 'infra'];

/** Rellena `{clave}` en una plantilla. */
export const fill = (tpl: string, vars: Record<string, string | number>): string =>
  tpl.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ''));
