# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Empresas que contratan: reclutadores y tech leads de empresas de software que llegan desde el CV,
LinkedIn o GitHub y deciden en pocos minutos si merece la pena entrevistar a Sergio. Leen sobre
todo en escritorio, a veces en el móvil; en español o en inglés.

## Product Purpose

Portfolio personal de Sergio Rodríguez Pérez (chuwi-dev.me). Muestra quién es, su stack actual,
su experiencia y los proyectos que ha construido. Éxito: el visitante descarga el CV o le escribe.
Estado «Open to work».

## Positioning

Desarrollador full stack que aprende construyendo producto real: en los dos últimos años ha
diseñado y desarrollado plataformas SaaS completas, de la base de datos al despliegue. Fuerte en
backend (Go, Rust), cómodo en frontend (React, Angular, TypeScript). El posicionamiento del CV
actual (`~/CV/build.py`, 2026-10-22) es la fuente de verdad: «Full Stack · Go · Rust · TypeScript».

## Operating Context

- Llegan con el CV en la otra pestaña: los datos de la web y del PDF deben coincidir.
- Bilingüe ES/EN con selector; tema claro y oscuro con selector.
- El visitante puede filtrar los proyectos pulsando una tecnología del stack.

## Capabilities and Constraints

- Angular 21 con SSR (`@angular/ssr`), Tailwind v4, i18next (`src/app/core/i18n/locales.ts`),
  desplegado en Vercel desde `master`; Bun como gestor de paquetes. CI: prettier, tests y build.
- Proyectos que se muestran (confirmado por el usuario el 2026-10-26):
  - Públicos con código: cuentas (React + Rust axum/sqlx + PostgreSQL), TFG- (chatbot Angular +
    Python/PyTorch), url-state-monitor-go (Go), Art-Space (Android, Kotlin).
  - Privados con demo: Atelier Ledger (contabilidad, Rust/Axum + React, Turso, Clerk) y Cita Perfecta
    (React + Vite, web interactiva).
  - Privados sin código ni demo, «código bajo petición»: Suite HCM (Go, 17 microservicios),
    Nexora (CRM/ERP modular, Rust + Angular), Cuadre (contabilidad, Rust + React) e invest-ai
    (análisis de inversión con IA local, Rust + React + Ollama; añadido el 2026-10-30).
  - Fuera: colaboraciones en repos de Tau5, Congreso, repoJava, el scraper y el fork.
- Experiencia: VASS (Full Stack Salesforce, prácticas), CRC (Frontend, prácticas), Erasmus
  (técnico de redes). Formación: DAM 2024–2026, SMR 2022–2024, Ciberseguridad (Masterd Mind AC).
- Contacto: sergio.rodriguez.ev@gmail.com, +34 640 870 770, github.com/Chuwi12, LinkedIn.
- CV descargable: los PDF de `~/CV` (ES y EN), según el idioma activo.

## Brand Commitments

- La escala cromática teal actual (tema claro y oscuro) se mantiene: decisión del usuario.
- Nombre «Chuwi-dev», dominio chuwi-dev.me.
- El diseño visual y los contenidos son propiedad de Sergio (ver README); el código es MIT.

## Evidence on Hand

- Foto: `public/avatar-face.webp`, `public/avatar-hd.webp`.
- Capturas: `public/projects/` (cuentas, con datos ficticios de demostración; atelier-ledger;
  cita-app). Las de TFG y Art-Space eran capturas de GitHub y se retiraron.
- Cifras que el usuario ya publica en su CV: 17 microservicios y más de 300 commits (HCM),
  respuestas por debajo de 50 ms (Nexora).
- No hay capturas utilizables de HCM, Nexora ni Cuadre, ni testimonios, ni métricas de uso: no se
  inventan.

## Product Principles

1. Lo que dice la web coincide con el CV: mismo rol, stack, email y proyectos.
2. Probar antes que afirmar: cada tecnología del stack se respalda con un proyecto que la usa.
3. Honestidad sobre el alcance: lo privado se marca como privado y lo de prácticas, como prácticas.
4. El reclutador encuentra el CV y el contacto sin buscar.
