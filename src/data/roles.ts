import type { Role } from './types';

/** De más reciente a más antiguo dentro de cada tipo. Fechas del CV y del historial anterior. */
export const ROLES: readonly Role[] = [
  {
    id: 'galdeca',
    kind: 'job',
    title: { es: 'Desarrollador Full Stack y AI Engineer', en: 'Full Stack & AI Engineer' },
    org: { es: 'Galdeca TSF', en: 'Galdeca TSF' },
    detail: { es: 'Startup Factory', en: 'Startup Factory' },
    period: { start: '2026-11' },
    summary: {
      es: 'Desarrollo full stack de plataformas y productos digitales en la factoría de startups e integración de soluciones de IA aplicada y agentes en flujos de producción.',
      en: 'Full stack development of digital products and web platforms across startup factory ventures, integrating applied AI solutions and agents into production workflows.',
    },
    nets: ['typescript', 'python', 'react', 'rag', 'docker'],
  },
  {
    id: 'vass',
    kind: 'job',
    title: { es: 'Desarrollador Full Stack Salesforce', en: 'Salesforce Full Stack Developer' },
    org: { es: 'VASS', en: 'VASS' },
    detail: { es: 'Prácticas', en: 'Internship' },
    period: { start: '2026-03', end: '2026-05' },
    summary: {
      es: 'Desarrollé componentes Lightning (LWC) y lógica de negocio en Apex para portales de cliente. También gestioné permisos y el paso a preproducción.',
      en: 'I built Lightning Web Components (LWC) and Apex business logic for customer portals. I also managed permissions and releases to pre-production.',
    },
    nets: ['salesforce', 'apex', 'javascript'],
  },
  {
    id: 'crc',
    kind: 'job',
    title: { es: 'Desarrollador Frontend', en: 'Frontend Developer' },
    org: { es: 'CRC', en: 'CRC' },
    detail: { es: 'Prácticas', en: 'Internship' },
    period: { start: '2025-04', end: '2025-05' },
    summary: {
      es: 'Desarrollé una aplicación web en Angular desplegada en AWS EC2, con procesamiento paralelo de las respuestas de una API REST.',
      en: 'I built an Angular web app deployed on AWS EC2, with parallel processing of REST API responses.',
    },
    nets: ['angular', 'typescript', 'javascript', 'aws'],
  },
  {
    id: 'erasmus',
    kind: 'job',
    title: { es: 'Técnico de redes', en: 'Network Technician' },
    org: { es: 'Erasmus', en: 'Erasmus' },
    detail: { es: 'Estancia internacional', en: 'International placement' },
    // Primavera de 2024; el CV y el historial anterior solo dan el año.
    period: { start: '2024', end: '2024' },
    summary: {
      es: 'Di soporte y configuré redes durante la primavera de 2024, trabajando en inglés con clientes internacionales.',
      en: 'I provided network support and configuration in spring 2024, working in English with international clients.',
    },
    nets: [],
  },
  {
    id: 'dam',
    kind: 'education',
    title: {
      es: 'Desarrollo de Aplicaciones Multiplataforma',
      en: 'Multiplatform Application Development',
    },
    // Ninguna fuente nombra el centro del DAM: se deja el tipo de formación en lugar de inventarlo.
    org: { es: 'Formación profesional', en: 'Vocational training' },
    detail: { es: 'Grado superior', en: 'Higher vocational diploma (EQF 5)' },
    period: { start: '2024', end: '2026' },
    summary: {
      es: 'Trabajé con Java, Kotlin, Python y TypeScript. Cerré el ciclo con un proyecto final en equipo: un chatbot con Angular y PyTorch.',
      en: 'I worked with Java, Kotlin, Python and TypeScript. I closed the diploma with a team final project: a chatbot built with Angular and PyTorch.',
    },
    nets: ['java', 'kotlin', 'python', 'typescript'],
  },
  {
    id: 'smr',
    kind: 'education',
    title: { es: 'Sistemas Microinformáticos y Redes', en: 'Microcomputer Systems and Networks' },
    org: { es: 'IES Virgen de la Paloma', en: 'IES Virgen de la Paloma' },
    detail: { es: 'Grado medio', en: 'Vocational diploma (EQF 4)' },
    period: { start: '2022', end: '2024' },
    summary: {
      es: 'Ciclo sobre sistemas informáticos y redes. Es donde empieza mi trayectoria, antes de pasar a programar con el DAM.',
      en: 'A vocational diploma on computer systems and networks. This is where my path starts, before I moved on to programming with the DAM.',
    },
    nets: [],
  },
  {
    id: 'ciberseguridad',
    kind: 'education',
    title: { es: 'Ciberseguridad', en: 'Cybersecurity' },
    org: { es: 'Masterd Mind AC', en: 'Masterd Mind AC' },
    detail: { es: 'Formación', en: 'Training' },
    summary: {
      es: 'Formación en ciberseguridad con Masterd Mind AC.',
      en: 'Cybersecurity training with Masterd Mind AC.',
    },
    nets: [],
  },
];
