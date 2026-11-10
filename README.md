# Portfolio Web

## Qué es / What it is

### Español

Portfolio personal de Sergio Rodríguez ([chuwi-dev.me](https://www.chuwi-dev.me)), full stack y AI engineering. Es una caja bento japonesa que se monta por pisos: quién es, una demo del verificador de invest-ai, los proyectos con lo que se puede comprobar de cada uno (código público, demo en vivo o código bajo petición), un stack que filtra los proyectos por tecnología, trayectoria, preguntas y contacto. Está en español (`/`) e inglés (`/en/`), con tema claro y oscuro, y permite descargar el CV en el idioma activo.

- **Astro 7** con salida estática y **TypeScript** estricto; sin framework de cliente.
- **CSS propio** con tokens en variables (dos temas) y estilos con ámbito de Astro; sin Tailwind.
- **i18n de Astro** para ES/EN: una sola página compartida que recibe el idioma; las cadenas de interfaz están en `src/i18n/ui.ts`.
- **Datos estáticos** en `src/data/` (perfil, tecnologías, proyectos, puestos y preguntas). No consulta ninguna API externa.
- **JavaScript de cliente mínimo** (tema, filtro de stack, demo del verificador, menú móvil y copiar email), empaquetado por Astro.
- **Vitest** para los tests, **Prettier** para el formato y **Bun** como gestor de paquetes.
- Fuentes autoalojadas (Zen Kaku Gothic New) e imágenes optimizadas con `astro:assets`.
- Desplegado en **Vercel** desde `master`, con Vercel Analytics y Speed Insights. El HTML y los ficheros de `/_astro/` se sirven con la CSP de `vercel.json` (sin scripts en línea salvo el del tema, que va por hash) y caché inmutable de un año.

### English

Personal portfolio of Sergio Rodríguez ([chuwi-dev.me](https://www.chuwi-dev.me)), full stack and AI engineering. It is a Japanese bento box that assembles floor by floor: who he is, a demo of the invest-ai verifier, the projects with what visitors can check on each one (public code, a live demo or code on request), a stack that filters the projects by technology, background, questions and contact. It is available in Spanish (`/`) and English (`/en/`), with light and dark themes, and lets visitors download the CV in the active language.

- **Astro 7** with static output and strict **TypeScript**; no client framework.
- **Hand-written CSS** with custom-property tokens (two themes) and Astro scoped styles; no Tailwind.
- **Astro i18n** for ES/EN: one shared page that receives the language; interface strings live in `src/i18n/ui.ts`.
- **Static data** in `src/data/` (profile, technologies, projects, roles and questions). It calls no external API.
- **Minimal client JavaScript** (theme, stack filter, verifier demo, mobile menu and copy email), bundled by Astro.
- **Vitest** for tests, **Prettier** for formatting and **Bun** as package manager.
- Self-hosted fonts (Zen Kaku Gothic New) and images optimised with `astro:assets`.
- Deployed on **Vercel** from `master`, with Vercel Analytics and Speed Insights. HTML and the files in `/_astro/` are served with the CSP in `vercel.json` (no inline scripts except the theme one, allowed by hash) and a one-year immutable cache.

---

## Desarrollo Local / Local Development

### Español 🇪🇸

Para ejecutar y desarrollar este proyecto en tu entorno local, sigue estos pasos:

#### Prerrequisitos
- Tener instalado [Node.js](https://nodejs.org/) (versión 22 o superior recomendada).
- Tener instalado [Bun](https://bun.sh/) (el proyecto está configurado con Bun de forma predeterminada), aunque también puedes usar `npm`.

#### Pasos para la ejecución

1. **Instalar Dependencias:**
   Instala todas las librerías necesarias ejecutando:
   ```bash
   bun install
   # o con npm:
   npm install
   ```

2. **Servidor de Desarrollo:**
   Inicia el servidor local de desarrollo con soporte para cambios en tiempo real:
   ```bash
   bun run dev
   # o con npm:
   npm run dev
   ```
   Abre tu navegador y entra en [http://localhost:4321](http://localhost:4321).

3. **Compilación de Producción:**
   Para construir el sitio estático en `dist/` y previsualizarlo:
   ```bash
   bun run build
   bun run preview
   # o con npm:
   npm run build && npm run preview
   ```

4. **Comprobaciones:**
   ```bash
   bun run check          # tipos de Astro y TypeScript
   bun run test
   bun run format:check   # bun run format para corregir
   node scripts/check-csp.mjs   # tras el build: la CSP de vercel.json cubre el HTML
   ```
   Si cambia `src/scripts/theme-init.js`, el script de tema en línea cambia de hash: `check-csp.mjs` imprime el nuevo para ponerlo en la CSP de `vercel.json`.

---

### English 🇬🇧

To run and develop this project in your local environment, follow these steps:

#### Prerequisites
- Installed [Node.js](https://nodejs.org/) (version 22 or higher recommended).
- Installed [Bun](https://bun.sh/) is preferred (the project defaults to Bun), though you can also use `npm`.

#### Execution Steps

1. **Install Dependencies:**
   Install all the required packages by running:
   ```bash
   bun install
   # or with npm:
   npm install
   ```

2. **Development Server:**
   Start the local dev server with hot reloading:
   ```bash
   bun run dev
   # or with npm:
   npm run dev
   ```
   Open your browser and navigate to [http://localhost:4321](http://localhost:4321).

3. **Production Build:**
   To build the static site into `dist/` and preview it:
   ```bash
   bun run build
   bun run preview
   # or with npm:
   npm run build && npm run preview
   ```

4. **Checks:**
   ```bash
   bun run check          # Astro and TypeScript types
   bun run test
   bun run format:check   # bun run format to fix
   node scripts/check-csp.mjs   # after the build: the CSP in vercel.json covers the HTML
   ```
   If `src/scripts/theme-init.js` changes, the inline theme script gets a new hash: `check-csp.mjs` prints it so it can be copied into the CSP in `vercel.json`.

---

## Licencia y Uso / License & Usage

El código fuente (estructura de Astro, componentes e integraciones) de este sitio web está bajo la **licencia MIT** (ver el archivo `LICENSE`). Eres libre de bifurcar (*fork*) este repositorio, aprender de la arquitectura y usar el código para construir tu propio portfolio personal.

### Importante (Excepciones a la licencia)

Las fotografías, logotipos, textos, información de proyectos (incluyendo descripciones y enlaces), la historia personal y el diseño visual (UI) son propiedad exclusiva de **Sergio Rodríguez** (Copyright © 2026) y **no están cubiertos por la licencia MIT**. No tienes permiso para reutilizarlos, distribuirlos ni publicarlos.

**Si decides usar este código como base para tu propia web, te exijo amablemente que:**
1. Elimines mi información personal y profesional.
2. Quites mi fotografía de avatar.
3. Cambies los colores y tipografías para crear tu propia identidad.
4. No intentes hacer pasar mis proyectos como tuyos.
