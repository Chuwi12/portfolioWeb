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
      es: 'Evalúa si un activo parece buena inversión con datos de mercado en vivo y un LLM local con Ollama. El código calcula las cifras y el modelo las explica. Un verificador marca o descarta las cifras del modelo que no están en los datos, y cada afirmación cita su fuente.',
      en: 'It assesses whether an asset looks like a good investment using live market data and a local LLM on Ollama. The code computes the figures and the model explains them. A verifier flags or drops any model figure that is not in the data, and every claim cites its source.',
    },
    highlights: [
      {
        es: 'Más de 1.200 tests: 931 de backend y 286 de frontend.',
        en: '1,200+ tests: 931 backend and 286 frontend.',
      },
      {
        es: 'Publica su propio backtest aunque no le favorece: los factores de precio de su puntuación no mostraron ventaja y ninguno de los 12 tests prerregistrados superó el umbral.',
        en: 'It publishes its own backtest even though the result is unflattering: the price factors of its score showed no edge, and none of the 12 preregistered tests cleared the threshold.',
      },
      {
        es: 'Chat con tool calling sobre datos en vivo y RAG híbrido (FTS5 y embeddings).',
        en: 'Chat with tool calling over live data, and hybrid RAG (FTS5 and embeddings).',
      },
      {
        es: 'Privada por construcción: el modelo corre en local y el servidor solo escucha en loopback.',
        en: 'Private by construction: the model runs locally and the server only listens on loopback.',
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
      es: 'Reparte los ingresos entre necesidades, deseos y ahorro, y un asesor con LLM local analiza cada mes. Rust calcula las cifras y el modelo solo las explica. Los datos no salen de la máquina porque el modelo corre en Ollama.',
      en: 'It splits income between needs, wants and savings, and an advisor on a local LLM reviews each month. Rust computes the figures and the model only explains them. Data never leaves the machine because the model runs on Ollama.',
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
        es: 'Servicio Node y TypeScript con LangChain.js, sin acceso a la base de datos de finanzas: solo ve las cifras que le pasa Rust.',
        en: 'A Node and TypeScript service with LangChain.js and no access to the finance database: it only sees the figures Rust passes to it.',
      },
      {
        es: 'La captura es la salida real de un modelo de 4B sin retocar: las cifras son exactas porque las calcula Rust; los fallos de lectura son del modelo.',
        en: "The screenshot is the untouched output of a 4B model: the figures are exact because Rust computes them; the reading mistakes are the model's.",
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
      es: 'Un chatbot con un modelo de lenguaje propio, hecho en equipo',
      en: 'A chatbot with our own language model, built as a team',
    },
    summary: {
      es: 'Proyecto final de ciclo hecho en equipo. Interfaz en Angular, API en Python con FastAPI y un modelo de lenguaje propio entrenado con PyTorch.',
      en: 'The final project of my higher vocational diploma, built as a team. An Angular interface, a Python API with FastAPI and our own language model trained with PyTorch.',
    },
    highlights: [
      {
        es: 'Interfaz en Angular que habla con una API en Python (FastAPI).',
        en: 'An Angular interface that talks to a Python API (FastAPI).',
      },
      {
        es: 'Modelo de lenguaje propio entrenado con PyTorch.',
        en: 'Our own language model, trained with PyTorch.',
      },
      {
        es: 'Proyecto en equipo con el que cerré el grado superior de DAM.',
        en: 'The team project that completed my DAM higher vocational diploma.',
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
      es: 'Plataforma de RR. HH. para empresas: fichaje, turnos, nóminas, documentos y mensajería interna. Son 17 microservicios en Go que se comunican por eventos, con PostgreSQL, Docker y un cliente web en React.',
      en: 'HR platform for companies: time tracking, shift scheduling, payroll, documents and internal messaging. It is 17 Go microservices that communicate through events, with PostgreSQL, Docker and a React web client.',
    },
    highlights: [
      {
        es: '17 microservicios en Go comunicados por eventos.',
        en: '17 Go microservices communicating through events.',
      },
      { es: 'Más de 300 commits de desarrollo.', en: 'More than 300 commits.' },
      {
        es: 'Mensajería interna en tiempo real cifrada de extremo a extremo.',
        en: 'Real-time internal messaging with end-to-end encryption.',
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
      es: 'El sitio que estás leyendo. Está hecho con Astro 7 y TypeScript, se genera de forma estática y no usa ningún framework en el cliente. Va en español y en inglés, con tema claro y oscuro.',
      en: 'The site you are reading. It is built with Astro 7 and TypeScript, generated statically with no client framework. It comes in Spanish and English, with a light and a dark theme.',
    },
    highlights: [
      {
        es: 'Una URL por idioma: español en / e inglés en /en/.',
        en: 'One URL per language: Spanish at / and English at /en/.',
      },
      {
        es: 'Selector de idioma y selector de tema claro y oscuro.',
        en: 'A language switch and a light and dark theme switch.',
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
      es: 'Web de un restaurante ficticio (nombre, carta y opiniones inventados) con reservas online y un panel que las muestra en directo. En la demo pública las reservas no se guardan: cada instancia arranca con datos de ejemplo.',
      en: 'Website for a fictional restaurant (made-up name, menu and reviews) with online booking and a panel that shows bookings live. On the public demo bookings are not kept: each instance starts with sample data.',
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
      es: 'Cada cliente accede solo a los módulos que tiene contratados: proyectos, tickets, contratos y facturación. La API en Rust aísla los datos de cada cliente y el panel está en Angular 20.',
      en: "Each client only accesses the modules they subscribe to: projects, tickets, contracts and invoicing. The Rust API isolates each client's data and the admin panel is built in Angular 20.",
    },
    highlights: [
      { es: 'Respuestas por debajo de 50 ms.', en: 'Response times under 50 ms.' },
      {
        es: 'Aislamiento estricto de los datos entre clientes.',
        en: 'Strict data isolation between clients.',
      },
      {
        es: 'Facturación con numeración legal y rectificativas.',
        en: 'Invoicing with legally compliant numbering and credit notes.',
      },
      {
        es: 'Despliegue propio con HTTPS automático.',
        en: 'Self-managed deployment with automatic HTTPS.',
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
      es: 'Contabilidad para autónomos y pymes españolas. Backend en Rust con arquitectura hexagonal e interfaz en React.',
      en: 'Accounting for Spanish freelancers and small businesses. A Rust backend on a hexagonal architecture and a React interface.',
    },
    highlights: [
      {
        es: 'Arquitectura hexagonal: toda la lógica de negocio se prueba sin base de datos.',
        en: 'Hexagonal architecture: all business logic is tested without a database.',
      },
      { es: 'Acceso con doble factor (TOTP).', en: 'Two-factor sign-in (TOTP).' },
      {
        es: 'Protección contra ataques de fuerza bruta.',
        en: 'Protection against brute-force attacks.',
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
      es: 'Web interactiva en formato scrapbook para proponer una cita y elegir plan, comida, vestimenta, fecha y hora. Está hecha con React y Vite.',
      en: 'Interactive scrapbook-style page for asking someone on a date and choosing the plan, food, outfit, date and time. Built with React and Vite.',
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
      es: 'Caja diaria por canal, gastos con historial de auditoría, importación desde Excel e informes exportables. Backend en Rust (axum) sobre SQLite en Turso y acceso con Clerk.',
      en: 'Daily takings per channel, expenses with an audit trail, Excel import and exportable reports. Rust (axum) backend on SQLite in Turso, with Clerk handling sign-in.',
    },
    highlights: [
      {
        es: 'Gastos con historial de auditoría inmutable.',
        en: 'Expenses with an immutable audit trail.',
      },
      {
        es: 'Aislamiento por usuario en cada consulta.',
        en: 'Per-user isolation in every query.',
      },
      {
        es: 'Tokens JWT de Clerk validados con JWKS.',
        en: 'Clerk JWTs verified through JWKS.',
      },
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
    tagline: {
      es: 'Monitor de URLs en Go con métricas en MySQL',
      en: 'URL monitor in Go with metrics in MySQL',
    },
    summary: {
      es: 'Aplicación en Go que comprueba el estado de varias URLs y guarda cómo responden.',
      en: 'A Go application that checks the status of several URLs and records how they respond.',
    },
    highlights: [
      {
        es: 'Lee las direcciones desde un archivo .txt.',
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
      es: 'App Android en Kotlin con Jetpack Compose, hecha en equipo',
      en: 'Android app in Kotlin with Jetpack Compose, built as a team',
    },
    summary: {
      es: 'Galería de imágenes con título, autor y año que se recorre con los botones anterior y siguiente. Usa la interfaz declarativa y el estado local de Compose.',
      en: "An image gallery with title, artist and year, navigated with previous and next buttons. It uses Compose's declarative UI and local state.",
    },
    highlights: [
      { es: 'Kotlin con Jetpack Compose.', en: 'Kotlin with Jetpack Compose.' },
      {
        es: 'Cada obra muestra título, autor y año.',
        en: 'Each artwork shows its title, artist and year.',
      },
    ],
    nets: ['kotlin', 'android'],
    evidence: 'code',
    repoUrl: 'https://github.com/Chuwi12/Art-Space',
    period: { start: '2025-11', end: '2025-11' },
    team: true,
  },
];
