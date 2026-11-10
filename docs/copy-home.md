# Copy de la home (ES y EN)

Estrategia y textos de la portada. Los hechos salen de PRODUCT.md, del CV y de los README
de cada repo; nada de aquí se inventa. Donde falta un dato, la pregunta o el bloque se omite (no hay
marcadores en producción).

Reglas de voz: frases cortas y concretas, primera persona, sin guiones dentro de frase, mayúscula solo
inicial en titulares y botones, sin exclamaciones. Prohibido: revolucionar, potenciar, de vanguardia, sin
esfuerzo, transforma tu flujo, llevar al siguiente nivel, aprovecha el poder, de talla mundial (y sus
equivalentes en inglés).

## 1. Esquema (layout B, historia larga adaptada a portfolio)

1. Primer piso de la caja: nombre, rol, pitch, CV y email, demo viva del verificador, estado, stack y foto.
2. Zona IA: «IA que se puede comprobar», frase estática y tres proyectos (invest-ai, asesor de Cuentas, TFG).
3. Zona plataformas: HCM, Taberna La Alcuza, Nexora, Cuadre, Cita Perfecta, Atelier Ledger, URL State Monitor, Art Space y este portfolio.
4. Stack: filtro por tecnología.
5. Trayectoria: experiencia, formación e idiomas.
6. Preguntas frecuentes.
7. Contacto: CV, email, LinkedIn, GitHub, teléfono y la acción repetida.

«Cómo funciona» en tres pasos no aplica a un portfolio: su papel lo hace la zona IA, que enseña el método
con proyectos reales.

## 2. Primer viewport

| Pieza | ES | EN |
|---|---|---|
| Nombre (h1) | Sergio Rodríguez | Sergio Rodríguez |
| Rol | Full stack y AI engineering | Full stack & AI engineering |
| Línea de marcado | MADRID · ES / EN · 2026 | MADRID · ES / EN · 2026 |
| Pitch | Construyo producto completo, de la base de datos a la interfaz, y le añado IA que se puede comprobar: el código calcula las cifras y el modelo las explica citando la fuente. | I build complete products, from the database to the interface, and add AI you can check: the code computes the figures and the model explains them, citing its sources. |
| Detalle del estado | En Madrid. Español nativo e inglés B2. | Based in Madrid. Native Spanish and B2 English. |
| Estado | Disponible para trabajar | Open to work |
| Acción principal | Descargar CV (PDF) | Download CV (PDF) |
| Acción secundaria | Escribirme | Email me |
| Prueba | La demo del verificador (§2b) | The verifier demo (§2b) |

El CV enlaza a `/CV.pdf` en ES y `/CV-en.pdf` en EN. El email abre `mailto:sergio.rodriguez.ev@gmail.com`.

## 2b. Demo del verificador (compartimento del primer piso)

Animación ilustrativa del mecanismo de invest-ai con datos **ficticios** de una empresa inventada (ACME), rotulada
siempre como tal. No es una llamada real a ningún modelo.

| Pieza | ES | EN |
|---|---|---|
| Cabecera | invest-ai · verificador en directo | invest-ai · live verifier |
| Etiqueta | LLM local | Local LLM |
| Pregunta | Resume los márgenes de ACME | Summarise ACME's margins |
| Datos (D1, D2) | D1, Informe trimestral, margen bruto, 61,2 %; D2, Balance, deuda neta, −8 % (una fila por fuente) | D1, Quarterly report, gross margin, 61.2%; D2, Balance sheet, net debt, −8% (one row per source) |
| Respuesta del modelo | El margen bruto subió al 61,2 % [D1] y la deuda neta bajó un 8 % [D2]. El consenso espera un 74 % el año que viene. | Gross margin rose to 61.2% [D1] and net debt fell 8% [D2]. Consensus expects 74% next year. |
| Veredicto | «74 %» no está en los datos: descartada | "74%" is not in the data: dropped |
| Pie | Demostración ilustrativa con datos ficticios · Ver el proyecto | Illustrative demo with made-up data · See the project |
| Control | Pausar (botón conmutador con `aria-pressed`; el texto no cambia) | Pause (toggle button with `aria-pressed`; the label does not change) |

## 3. Zona IA

- Titular: «IA que se puede comprobar» / «AI you can check».
- Entradilla: «Uso modelos que corren en local y los ato a los datos: si el modelo da una cifra que no está
  en la fuente, se marca o se descarta.» / «I use models that run locally and tie them to the data: if the
  model states a figure that is not in the source, it gets flagged or dropped.»
- Frase grande, estática (B11 sin animación: el momento de autor es otro): «El código calcula. El modelo
  explica.» / «The code computes. The model explains.»

Proyectos (textos completos en `src/data/projects.ts`; estos son los puntos que deben salir):

- **invest-ai** (código público, captura `landing-dark.webp` o `asset-analysis-dark.webp` del repo):
  análisis de inversión con LLM local (Ollama). Verificador que marca o descarta cifras que no están en los
  datos; cada afirmación cita su fuente. Chat con tool calling sobre datos en vivo. RAG híbrido (FTS5 +
  embeddings). Más de 1.200 tests (931 backend + 286 frontend). Publica su propio backtest aunque no le
  favorece: ninguno de los 12 tests prerregistrados superó el umbral. Rust (axum), SQLite, React, TypeScript.
- **Cuentas, asesor con IA local** (código público, captura `asesor.png`, datos de demostración):
  finanzas personales 50/30/20 con un asesor que analiza cada mes. Rust calcula las cifras y el modelo solo
  las explica. Memoria con RAG: cada análisis y conversación se guarda con su embedding en pgvector. Los
  datos no salen de la máquina (Ollama local). Servicio Node/TS con LangChain.js; backend Rust (axum, sqlx)
  y PostgreSQL. 150 tests de backend y 73 del asesor.
- **Chatbot del proyecto final (TFG)** (código público, en equipo): interfaz Angular, API en Python
  (FastAPI) y un modelo de lenguaje propio entrenado con PyTorch.

## 4. Zona plataformas

- Titular: «Plataformas de punta a punta» / «End-to-end platforms».
- Entradilla: «SaaS completos: dominio, API, base de datos, interfaz y despliegue.» / «Complete SaaS
  products: domain, API, database, interface and deployment.»
- Proyectos: textos de los locales anteriores (`git show redesign/historial-commits:src/app/core/i18n/locales.ts`)
  y del CV, revisados con las reglas de voz. HCM y Nexora llevan las cifras del CV (17 microservicios, más
  de 300 commits, mensajería cifrada de extremo a extremo; menos de 50 ms, aislamiento entre clientes,
  facturación con numeración legal).
- Marcas de evidencia: «Código público» / «Public code», «Demo en vivo» / «Live demo», «Código bajo
  petición» / «Code on request». Acciones: «Ver código» / «View code», «Abrir demo» / «Open demo»,
  «Pedir el código» / «Request the code» (mailto con asunto «Código de {título}» / «{title} source code»).
- Etiquetas: «En equipo» / «Team project», «Datos de demostración» / «Demo data».

## 5. Stack

- Titular: «Stack» / «Stack».
- Ayuda: «Pulsa una tecnología para ver los proyectos que la usan.» / «Press a technology to see the
  projects that use it.»
- Estado: «{n} proyectos usan {tech}» / «{n} projects use {tech}»; singular «1 proyecto usa {tech}» /
  «1 project uses {tech}». Botón para quitarlo: «Ver todos» / «Show all».
- Grupos: Lenguajes / Languages, IA / AI, Frontend, Backend y datos / Backend & data, Infraestructura /
  Infrastructure. Solo entran tecnologías que usa al menos un proyecto o puesto.
- Líneas de texto bajo el conector: «Arquitectura: microservicios, hexagonal, multi-tenant, WebSockets.» /
  «Architecture: microservices, hexagonal, multi-tenant, WebSockets.» y «Seguridad: JWT, MFA/TOTP,
  cifrado de extremo a extremo.» / «Security: JWT, MFA/TOTP, end-to-end encryption.»

## 6. Trayectoria

- Titular: «Trayectoria» / «Background».
- Experiencia (del CV): VASS, Desarrollador Full Stack Salesforce, prácticas (2026); CRC, Desarrollador
  Frontend, prácticas (2025); Erasmus, técnico de redes (primavera de 2024).
- Formación: Desarrollo de Aplicaciones Multiplataforma, grado superior, 2024–2026; Sistemas
  Microinformáticos y Redes, IES Virgen de la Paloma, 2022–2024; Ciberseguridad, Masterd Mind AC.
- Idiomas: español nativo; inglés B2.

## 7. Preguntas frecuentes (en HTML visible y como FAQPage en JSON-LD)

| ES | EN |
|---|---|
| **¿Qué puesto buscas?** Full stack o AI engineer. Mi base es el backend en Go y Rust; también hago frontend con React y Angular, y aplicaciones con LLM. | **What role are you looking for?** Full stack or AI engineer. My base is the backend in Go and Rust; I also build frontends with React and Angular, and LLM applications. |
| **¿Qué haces con IA, en concreto?** Aplicaciones con modelos locales (Ollama): tool calling, RAG híbrido, memoria con embeddings en pgvector y un verificador que descarta cifras inventadas. En el TFG entrenamos un modelo propio con PyTorch. | **What do you do with AI, specifically?** Applications on local models (Ollama): tool calling, hybrid RAG, memory with embeddings in pgvector and a verifier that drops made-up figures. For my final-year project we trained our own model with PyTorch. |
| **¿Puedo ver el código de los proyectos privados?** Sí, bajo petición. Escríbeme y te lo enseño. | **Can I see the code of the private projects?** Yes, on request. Email me and I will show you. |
| **¿Qué experiencia profesional tienes?** Dos prácticas como desarrollador (VASS y CRC) y una estancia Erasmus como técnico de redes, además de dos años construyendo producto completo. | **What professional experience do you have?** Two developer internships (VASS and CRC) and an Erasmus placement as a network technician, plus two years building complete products. |
| **¿Qué nivel de inglés tienes?** B2. Trabajé en inglés con clientes internacionales durante el Erasmus. | **How good is your English?** B2. I worked in English with international clients during my Erasmus placement. |
| **¿Dónde estás?** En Madrid. | **Where are you based?** Madrid, Spain. |

## 8. Contacto

- Titular: «Hablemos» / «Let's talk».
- Texto: «Si buscas a alguien que lleve un producto de la base de datos a la IA, escríbeme o descarga el
  CV.» / «If you need someone who takes a product from the database to the AI, email me or download my CV.»
- Acciones: las del primer viewport, más «Copiar email» / «Copy email» con confirmación «Email copiado» /
  «Email copied» y error «No se pudo copiar. El email es sergio.rodriguez.ev@gmail.com.» / «Could not copy.
  The email is sergio.rodriguez.ev@gmail.com.»
- Datos: email, +34 640 870 770, LinkedIn, GitHub (Chuwi12), Madrid.
- Pie: «Sin cookies. Analítica anónima de Vercel.» / «No cookies. Anonymous Vercel analytics.» y «© 2026
  Sergio Rodríguez. Código MIT; diseño y contenidos reservados.» / «© 2026 Sergio Rodríguez. Code under
  MIT; design and content reserved.»

## 9. SEO y AEO

Indexar. Una URL por idioma con `hreflang` (es, en, x-default → `/`) y `canonical`.

- ES title: «Sergio Rodríguez | Full stack y AI engineering»
- ES description: «Desarrollador full stack en Go, Rust y TypeScript que construye aplicaciones con LLM
  locales comprobables y plataformas SaaS completas. Proyectos, código, CV y contacto.»
- EN title: «Sergio Rodríguez | Full stack & AI engineering»
- EN description: «Full stack developer in Go, Rust and TypeScript who builds checkable local LLM
  applications and complete SaaS platforms. Projects, code, CV and contact.»
- JSON-LD: `Person` (nombre, rol, url, sameAs GitHub y LinkedIn, knowsAbout) y `FAQPage`.
- 404 propio y bilingüe: «Compartimento vacío» / «Empty compartment», «Esta página no existe.» / «This page does not
  exist.», enlace «Volver al inicio» / «Back to home».
