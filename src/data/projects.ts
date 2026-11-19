import type { Project } from './types';
import investAiShot from '../assets/projects/invest-ai.webp';
import cuentasShot from '../assets/projects/cuentas-asesor.png';
import atelierLedgerShot from '../assets/projects/atelier-ledger.webp';
import citaShot from '../assets/projects/cita-app.webp';
import tabernaShot from '../assets/projects/taberna-alcuza.webp';

/**
 * Orden de la placa: zona IA (U2 a U4) y zona plataformas (U5 a U13). U1 es Sergio.
 * Cada zona: el destacado primero y después por fecha de inicio, de más reciente a más antigua.
 * Los textos siguen docs/copy-home.md; cada cifra sale del CV, de los README o de PRODUCT.md.
 */
export const PROJECTS: readonly Project[] = [
  // Zona IA
  {
    id: 'invest-ai',
    ref: 'U2',
    zone: 'ai',
    title: { es: 'invest-ai', en: 'invest-ai' },
    tagline: {
      es: 'Análisis de inversión con un LLM local y cifras que se pueden rastrear',
      en: 'Investment analysis with a local LLM and figures you can trace',
    },
    summary: {
      es: 'Evalúa si un activo parece buena inversión con datos de mercado en vivo. Un verificador marca o descarta las cifras del modelo que no están en los datos, y cada afirmación cita su fuente.',
      en: 'It assesses whether an asset looks like a good investment using live market data. A verifier flags or drops any model figure that is not in the data, and every claim cites its source.',
    },
    highlights: [
      {
        es: 'Más de 1.200 tests: 931 de backend y 286 de frontend.',
        en: '1,200+ tests: 931 backend and 286 frontend.',
      },
      {
        es: 'Publica su backtest aunque no le favorece: ninguno de los 12 tests prerregistrados superó el umbral.',
        en: 'It publishes its own backtest even though the result is unflattering: none of the 12 preregistered tests cleared the threshold.',
      },
      {
        es: 'Chat con tool calling sobre datos en vivo y RAG híbrido (FTS5 y embeddings).',
        en: 'Chat with tool calling over live data, and hybrid RAG (FTS5 and embeddings).',
      },
    ],
    nets: ['rust', 'axum', 'sqlite', 'react', 'typescript', 'vite', 'ollama', 'rag'],
    evidence: 'code',
    repoUrl: 'https://github.com/Chuwi12/invest-ai',
    image: {
      src: investAiShot,
      alt: {
        es: 'Ficha de NVIDIA en invest-ai, en tema oscuro: cotización en vivo, gráfico de velas de un año y un informe con el veredicto Acumular, puntuaciones por factor y niveles de entrada, stop y objetivos.',
        en: 'NVIDIA asset page in invest-ai, dark theme: live quote, a one-year candlestick chart and a report with an Accumulate verdict, scores by factor and entry, stop and target levels. The interface is in Spanish.',
      },
      synthetic: false,
    },
    period: { start: '2026-10' },
    featured: true,
  },
  {
    id: 'cuentas',
    ref: 'U3',
    zone: 'ai',
    title: { es: 'Cuentas, asesor con IA local', en: 'Cuentas, local AI advisor' },
    tagline: {
      es: 'Finanzas personales 50/30/20 con un asesor que analiza cada mes',
      en: '50/30/20 personal finance with an advisor that reviews each month',
    },
    summary: {
      es: 'Rust calcula las cifras exactas y se las pasa al asesor, que no tiene acceso a la base de datos de finanzas. El modelo corre en Ollama, así que los datos no salen de la máquina.',
      en: 'Rust computes the exact figures and passes them to the advisor, which has no access to the finance database. The model runs on Ollama, so data never leaves the machine.',
    },
    highlights: [
      {
        es: '150 tests de backend y 73 del asesor.',
        en: '150 backend tests and 73 for the advisor.',
      },
      {
        es: 'Memoria con RAG: cada análisis y conversación se guarda con su embedding en pgvector.',
        en: 'Memory with RAG: every analysis and conversation is stored with its embedding in pgvector.',
      },
      {
        es: 'La captura es la salida real de un modelo de 4B sin retocar: las cifras son exactas, los fallos de lectura son del modelo.',
        en: "The screenshot is the untouched output of a 4B model: the figures are exact, the reading mistakes are the model's.",
      },
    ],
    nets: [
      'rust',
      'axum',
      'sqlx',
      'postgresql',
      'react',
      'typescript',
      'vite',
      'tailwindcss',
      'nodejs',
      'langchainjs',
      'ollama',
      'pgvector',
      'rag',
    ],
    evidence: 'code',
    repoUrl: 'https://github.com/Chuwi12/cuentas',
    image: {
      src: cuentasShot,
      alt: {
        es: 'Pantalla Asesor de Cuentas con el análisis de octubre de 2026 generado por el modelo local: resumen del mes, qué va bien, qué mejorar y próximos pasos, con datos de demostración.',
        en: 'The Cuentas advisor screen with the October 2026 analysis written by the local model: month summary, what is going well, what to improve and next steps, using demo data. The text is in Spanish.',
      },
      synthetic: true,
    },
    period: { start: '2026-09' },
  },
  {
    id: 'tfg',
    ref: 'U4',
    zone: 'ai',
    title: { es: 'Chatbot del proyecto final (TFG)', en: 'Final project chatbot (TFG)' },
    tagline: {
      es: 'Un chatbot con un modelo de lenguaje propio',
      en: 'A chatbot with our own language model',
    },
    summary: {
      es: 'El proyecto final con el que cerré el grado superior de DAM.',
      en: 'The final project that closed my DAM higher vocational diploma.',
    },
    highlights: [
      {
        es: 'Interfaz en Angular que habla con una API en Python (FastAPI).',
        en: 'An Angular interface that talks to a Python API (FastAPI).',
      },
      {
        es: 'El modelo de lenguaje se entrenó con PyTorch.',
        en: 'The language model was trained with PyTorch.',
      },
    ],
    nets: ['angular', 'typescript', 'python', 'fastapi', 'pytorch'],
    evidence: 'code',
    repoUrl: 'https://github.com/Chuwi12/TFG-',
    period: { start: '2026-03', end: '2026-06' },
    team: true,
  },

  // Zona plataformas
  {
    id: 'hcm',
    ref: 'U5',
    zone: 'platform',
    title: { es: 'Suite de gestión de personal (HCM)', en: 'HR management suite (HCM)' },
    tagline: {
      es: 'Plataforma de RR. HH. sobre 17 microservicios en Go',
      en: 'An HR platform on 17 Go microservices',
    },
    summary: {
      es: 'Cubre fichaje, turnos, nóminas, documentos y mensajería interna. Los servicios se comunican por eventos.',
      en: 'It covers time tracking, shift scheduling, payroll, documents and internal messaging. The services communicate through events.',
    },
    highlights: [
      { es: 'Más de 300 commits de desarrollo.', en: 'More than 300 commits.' },
      {
        es: 'Mensajes en tiempo real cifrados de extremo a extremo.',
        en: 'Real-time messages with end-to-end encryption.',
      },
      {
        es: 'Cliente web con organigrama interactivo.',
        en: 'Web client with an interactive org chart.',
      },
    ],
    nets: ['go', 'postgresql', 'react', 'typescript', 'docker'],
    evidence: 'private',
    period: { start: '2026-05', end: '2026-07' },
    featured: true,
  },
  {
    id: 'portfolio',
    ref: 'U6',
    zone: 'platform',
    title: { es: 'Este portfolio', en: 'This portfolio' },
    tagline: {
      es: 'Este mismo sitio: estático, bilingüe y con tema claro y oscuro',
      en: 'This very site: static, bilingual, with a light and a dark theme',
    },
    summary: {
      es: 'Hecho con Astro 7 y TypeScript, sin ningún framework en el cliente.',
      en: 'Built with Astro 7 and TypeScript, with no client framework.',
    },
    highlights: [
      {
        es: 'Una URL por idioma: español en / e inglés en /en/.',
        en: 'One URL per language: Spanish at / and English at /en/.',
      },
      {
        es: 'Al pulsar una tecnología del stack se encienden los proyectos que la usan.',
        en: 'Pressing a technology in the stack lights up the projects that use it.',
      },
      {
        es: 'Código con licencia MIT; diseño y contenidos reservados.',
        en: 'Code under the MIT license; design and content reserved.',
      },
    ],
    nets: ['astro', 'typescript', 'vercel'],
    evidence: 'code',
    repoUrl: 'https://github.com/Chuwi12/portfolioWeb',
    period: { start: '2026-11', end: '2026-11' },
  },
  {
    id: 'taberna-alcuza',
    ref: 'U7',
    zone: 'platform',
    title: { es: 'Taberna La Alcuza', en: 'Taberna La Alcuza' },
    tagline: {
      es: 'Web y reservas online de un restaurante ficticio, con panel de gestión en directo',
      en: 'Website and online booking for a fictional restaurant, with a live admin panel',
    },
    summary: {
      es: 'El nombre, la carta y las opiniones son inventados. En la demo pública las reservas no se guardan: cada instancia arranca con datos de ejemplo.',
      en: 'The name, menu and reviews are made up. On the public demo bookings are not kept: each instance starts with sample data.',
    },
    highlights: [
      {
        es: 'Una reserva nueva aparece en el panel en menos de 10 segundos, con aviso y sonido.',
        en: 'A new booking shows up in the admin panel in under 10 seconds, with a notification and a sound.',
      },
      {
        es: 'Sin overbooking: el aforo se comprueba dentro de una transacción de SQLite, probada con reservas simultáneas.',
        en: 'No overbooking: capacity is checked inside a SQLite transaction, tested with simultaneous bookings.',
      },
    ],
    nets: ['astro', 'react', 'typescript', 'tailwindcss', 'nodejs', 'sqlite', 'zod', 'vercel'],
    evidence: 'demo',
    demoUrl: 'https://taberna-alcuza.vercel.app',
    image: {
      src: tabernaShot,
      alt: {
        es: 'Portada de Taberna La Alcuza en tema oscuro: el titular «Aceite, brasa y cocina de siempre», un arroz con gambas y almejas, otras dos raciones y el botón Reservar. Restaurante ficticio.',
        en: 'Taberna La Alcuza home page in a dark theme: the Spanish headline "Aceite, brasa y cocina de siempre", a rice dish with prawns and clams, two more plates and a Reservar button. A fictional restaurant.',
      },
      synthetic: true,
    },
    period: { start: '2026-10', end: '2026-10' },
  },
  {
    id: 'nexora',
    ref: 'U8',
    zone: 'platform',
    title: { es: 'Nexora', en: 'Nexora' },
    tagline: {
      es: 'CRM/ERP modular donde cada cliente ve solo lo que contrata',
      en: 'Modular CRM/ERP where each client sees only what they subscribe to',
    },
    summary: {
      es: 'Incluye proyectos, tickets, contratos y facturación, con un panel en Angular 20.',
      en: 'It includes projects, tickets, contracts and invoicing, with an Angular 20 admin panel.',
    },
    highlights: [
      { es: 'Respuestas por debajo de 50 ms.', en: 'Response times under 50 ms.' },
      {
        es: 'La API en Rust aísla estrictamente los datos de cada cliente.',
        en: "The Rust API strictly isolates each client's data.",
      },
      {
        es: 'Numeración legal de facturas y rectificativas.',
        en: 'Legally compliant invoice numbering and credit notes.',
      },
    ],
    nets: ['rust', 'postgresql', 'angular', 'typescript', 'docker'],
    evidence: 'private',
    period: { start: '2026-09', end: '2026-10' },
  },
  {
    id: 'cuadre',
    ref: 'U9',
    zone: 'platform',
    title: { es: 'Cuadre', en: 'Cuadre' },
    tagline: {
      es: 'Contabilidad para autónomos y pymes españolas',
      en: 'Accounting for Spanish freelancers and small businesses',
    },
    summary: {
      es: 'Backend en Rust con arquitectura hexagonal e interfaz en React.',
      en: 'A Rust backend on a hexagonal architecture, with a React interface.',
    },
    highlights: [
      {
        es: 'Toda la lógica de negocio se prueba sin base de datos.',
        en: 'All business logic is tested without a database.',
      },
      {
        es: 'Acceso con doble factor (TOTP) y protección contra ataques de fuerza bruta.',
        en: 'Two-factor sign-in (TOTP) and brute-force protection.',
      },
    ],
    nets: ['rust', 'redis', 'react', 'typescript'],
    evidence: 'private',
    period: { start: '2026-07', end: '2026-07' },
  },
  {
    id: 'cita-perfecta',
    ref: 'U10',
    zone: 'platform',
    title: { es: 'Cita Perfecta', en: 'Cita Perfecta' },
    tagline: {
      es: 'Una web interactiva para proponer una cita, con aspecto de diario de recuerdos',
      en: 'An interactive page for asking someone on a date, styled as a scrapbook',
    },
    summary: {
      es: 'Permite elegir plan, comida, vestimenta, fecha y hora.',
      en: 'It lets you choose the plan, food, outfit, date and time.',
    },
    highlights: [
      {
        es: 'Melodías retro generadas con Web Audio.',
        en: 'Retro melodies generated with Web Audio.',
      },
      { es: 'Botones que esquivan al usuario.', en: 'Buttons that dodge the user.' },
    ],
    nets: ['react', 'typescript', 'vite'],
    evidence: 'demo',
    demoUrl: 'https://cita-app-amber.vercel.app',
    image: {
      src: citaShot,
      alt: {
        es: 'Portada de Cita Perfecta: una hoja de cuaderno con espiral, un corazón y un sobre cerrado bajo un saludo escrito a mano.',
        en: 'Cita Perfecta cover: a spiral notebook page with a heart and a closed envelope under a handwritten greeting in Spanish.',
      },
      synthetic: false,
    },
    period: { start: '2026-07', end: '2026-07' },
  },
  {
    id: 'atelier-ledger',
    ref: 'U11',
    zone: 'platform',
    title: { es: 'Atelier Ledger', en: 'Atelier Ledger' },
    tagline: {
      es: 'SaaS de contabilidad para autónomos con historial de auditoría inmutable',
      en: 'Accounting SaaS for freelancers with an immutable audit trail',
    },
    summary: {
      es: 'Caja diaria por canal, importación desde Excel e informes exportables a PDF, Excel y CSV. Backend en Rust sobre SQLite en Turso.',
      en: 'Daily takings per channel, Excel import and reports exportable to PDF, Excel and CSV. A Rust backend on SQLite in Turso.',
    },
    highlights: [
      { es: 'Aislamiento por usuario en cada consulta.', en: 'Per-user isolation in every query.' },
      { es: 'Tokens JWT de Clerk validados con JWKS.', en: 'Clerk JWTs verified through JWKS.' },
    ],
    nets: ['rust', 'axum', 'react', 'typescript', 'sqlite', 'clerk', 'docker', 'vercel'],
    evidence: 'demo',
    demoUrl: 'https://contabilidad-frontend-three.vercel.app',
    image: {
      src: atelierLedgerShot,
      alt: {
        es: 'Portada de Atelier Ledger: el nombre en una tipografía de puntos sobre fondo crema y un lema sobre control financiero para el autónomo.',
        en: 'Atelier Ledger home page: the name in a dot-matrix typeface on a cream background, with a tagline in Spanish about financial control for freelancers.',
      },
      synthetic: false,
    },
    period: { start: '2026-06', end: '2026-07' },
  },
  {
    id: 'url-state-monitor',
    ref: 'U12',
    zone: 'platform',
    title: { es: 'URL State Monitor', en: 'URL State Monitor' },
    tagline: { es: 'Monitor de URLs escrito en Go', en: 'A URL monitor written in Go' },
    summary: {
      es: 'Comprueba el estado de varias URLs.',
      en: 'It checks the status of several URLs.',
    },
    highlights: [
      {
        es: 'Lee las direcciones de un archivo .txt.',
        en: 'Reads the addresses from a .txt file.',
      },
      {
        es: 'Guarda las métricas de respuesta en una base de datos MySQL.',
        en: 'Stores the response metrics in a MySQL database.',
      },
    ],
    nets: ['go', 'mysql'],
    evidence: 'code',
    repoUrl: 'https://github.com/Chuwi12/url-state-monitor-go',
    period: { start: '2026-06', end: '2026-06' },
  },
  {
    id: 'art-space',
    ref: 'U13',
    zone: 'platform',
    title: { es: 'Art Space', en: 'Art Space' },
    tagline: {
      es: 'App Android en Kotlin con Jetpack Compose',
      en: 'Android app in Kotlin with Jetpack Compose',
    },
    summary: {
      es: 'Una galería de imágenes que se recorre con los botones anterior y siguiente.',
      en: 'An image gallery navigated with previous and next buttons.',
    },
    highlights: [
      {
        es: 'Cada obra muestra título, autor y año.',
        en: 'Each artwork shows its title, artist and year.',
      },
      {
        es: 'Interfaz declarativa y estado local de Compose.',
        en: "Compose's declarative UI and local state.",
      },
    ],
    nets: ['kotlin', 'android'],
    evidence: 'code',
    repoUrl: 'https://github.com/Chuwi12/Art-Space',
    period: { start: '2025-11', end: '2025-11' },
    team: true,
  },
];
