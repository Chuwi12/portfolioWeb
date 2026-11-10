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

Full stack y AI engineering (pedido por el usuario el 2026-11-09). Construye producto completo, de la
base de datos a la interfaz, y aplicaciones con LLM locales que se pueden comprobar: el código calcula
las cifras y el modelo las explica citando la fuente (invest-ai, asesor de Cuentas). Fuerte en backend
(Go, Rust), cómodo en frontend (React, Angular, TypeScript). El CV usa el mismo rol: «Full Stack y AI
Engineering · Go · Rust · TypeScript».

## Operating Context

- Llegan con el CV en la otra pestaña: los datos de la web y del PDF deben coincidir.
- Bilingüe ES/EN con selector; tema claro y oscuro con selector.
- El visitante puede filtrar los proyectos pulsando una tecnología del stack.

## Capabilities and Constraints

- Astro 7 estático con TypeScript (rediseño de 2026-11-09, sustituye a Angular), sin framework de
  cliente; desplegado en Vercel desde `master`; Bun como gestor de paquetes. Rutas: `/` (ES) y `/en/`.
- Proyectos que se muestran (confirmado por el usuario el 2026-10-26):
  - Públicos con código: invest-ai (análisis de inversión con IA local, Rust + React + Ollama;
    añadido el 2026-10-30), cuentas (React + Rust axum/sqlx + PostgreSQL; desde 2026-10-31 con un asesor con LLM local:
    servicio Node/TS con LangChain.js, Ollama y memoria en pgvector, cifras calculadas en Rust), TFG- (chatbot Angular +
    Python/PyTorch), url-state-monitor-go (Go), Art-Space (Android, Kotlin).
  - Privados con demo: Atelier Ledger (contabilidad, Rust/Axum + React, Turso, Clerk) y Cita Perfecta
    (React + Vite, web interactiva).
  - Privados sin código ni demo, «código bajo petición»: Suite HCM (Go, 17 microservicios),
    Nexora (CRM/ERP modular, Rust + Angular) y Cuadre (contabilidad, Rust + React).
  - Fuera: colaboraciones en repos de Tau5, Congreso, repoJava, el scraper y el fork.
- Experiencia: VASS (Full Stack Salesforce, prácticas), CRC (Frontend, prácticas), Erasmus
  (técnico de redes). Formación: DAM 2024–2026, SMR 2022–2024, Ciberseguridad (Masterd Mind AC).
- Contacto: sergio.rodriguez.ev@gmail.com, +34 640 870 770, github.com/Chuwi12, LinkedIn.
- CV descargable: `public/CV.pdf` y `public/CV-en.pdf`, según el idioma activo.

## Brand Commitments

- Del diseño anterior solo se conservan el selector ES/EN y el de tema claro/oscuro (pedido del usuario
  el 2026-11-09: diseño completamente nuevo). La escala teal ya no es compromiso de marca.
- Nombre «Chuwi-dev», dominio chuwi-dev.me.
- El diseño visual y los contenidos son propiedad de Sergio (ver README); el código es MIT.

## Evidence on Hand

- Foto: `src/assets/avatar.webp`.
- Capturas en `src/assets/projects/` (origen de cada una en su `.json`): invest-ai, del README del repo
  público Chuwi12/invest-ai (datos de mercado reales, sin datos personales); el asesor de Cuentas, del
  README del repo público Chuwi12/cuentas (datos ficticios de demostración); Atelier Ledger, Cita Perfecta
  y la demo pública de Taberna La Alcuza (restaurante ficticio).
- Cifras que el usuario ya publica en su CV: 17 microservicios y más de 300 commits (HCM),
  respuestas por debajo de 50 ms (Nexora), más de 1.200 tests (invest-ai).
- No hay capturas utilizables de HCM, Nexora ni Cuadre, ni testimonios, ni métricas de uso: no se
  inventan.

## Product Principles

1. Lo que dice la web coincide con el CV: mismo rol, stack, email y proyectos.
2. Probar antes que afirmar: cada tecnología del stack se respalda con un proyecto que la usa.
3. Honestidad sobre el alcance: lo privado se marca como privado y lo de prácticas, como prácticas.
4. El reclutador encuentra el CV y el contacto sin buscar.
