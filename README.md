# Portfolio Web

## Qué es / What it is

### Español

Portfolio personal de Sergio Rodríguez ([chuwi-dev.me](https://www.chuwi-dev.me)), desarrollador full stack en Go, Rust y TypeScript. Presenta proyectos, prácticas y formación como un historial de commits, con una marca que indica qué se puede comprobar de cada uno: código público, demo en vivo o código bajo petición. Está en español e inglés, con tema claro y oscuro, y permite descargar el CV en el idioma activo.

- **Angular 21** con prerenderizado estático (`@angular/ssr`, sin servidor).
- **Tailwind CSS v4** para los estilos.
- **i18next** (`angular-i18next`) para ES/EN; los textos están en `src/app/core/i18n/locales.ts`.
- **Datos estáticos**: el historial está en `src/app/core/services/log-entries.ts` y los datos de contacto y el stack en `src/app/core/profile.ts`. No consulta ninguna API externa.
- **Vitest** para los tests, **Prettier** para el formato y **Bun** como gestor de paquetes.
- Desplegado en **Vercel** desde `master`, con Vercel Analytics y Speed Insights.
- Las fuentes de `public/fonts` se sirven con caché inmutable de un año: si se sustituye una, hay que renombrarla.

### English

Personal portfolio of Sergio Rodríguez ([chuwi-dev.me](https://www.chuwi-dev.me)), a full stack developer in Go, Rust and TypeScript. It presents projects, internships and education as a commit history, with a mark showing what visitors can check for each one: public code, a live demo or code on request. It is available in Spanish and English, with light and dark themes, and lets visitors download the CV in the active language.

- **Angular 21** with static prerendering (`@angular/ssr`, no server).
- **Tailwind CSS v4** for styling.
- **i18next** (`angular-i18next`) for ES/EN; the copy lives in `src/app/core/i18n/locales.ts`.
- **Static data**: the history lives in `src/app/core/services/log-entries.ts`, and contact details and the stack in `src/app/core/profile.ts`. It calls no external API.
- **Vitest** for tests, **Prettier** for formatting and **Bun** as package manager.
- Deployed on **Vercel** from `master`, with Vercel Analytics and Speed Insights.
- The fonts in `public/fonts` are served with a one-year immutable cache: if one is replaced, rename it.

---

## Desarrollo Local / Local Development

### Español 🇪🇸

Para ejecutar y desarrollar este proyecto en tu entorno local, sigue estos pasos:

#### Prerrequisitos
- Tener instalado [Node.js](https://nodejs.org/) (versión 20 o superior recomendada).
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
   bun start
   # o con npm:
   npm start
   ```
   Abre tu navegador y entra en [http://localhost:4200](http://localhost:4200).

3. **Compilación de Producción:**
   Para construir la aplicación para producción (prerenderizado estático):
   ```bash
   bun run build
   # o con npm:
   npm run build
   ```

4. **Tests y formato:**
   ```bash
   bun run test --watch=false
   bun run format:check   # bun run format para corregir
   ```

---

### English 🇬🇧

To run and develop this project in your local environment, follow these steps:

#### Prerequisites
- Installed [Node.js](https://nodejs.org/) (version 20 or higher recommended).
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
   bun start
   # or with npm:
   npm start
   ```
   Open your browser and navigate to [http://localhost:4200](http://localhost:4200).

3. **Production Build:**
   To build the application for production (static prerendering):
   ```bash
   bun run build
   # or with npm:
   npm run build
   ```

4. **Tests and formatting:**
   ```bash
   bun run test --watch=false
   bun run format:check   # bun run format to fix
   ```

---

## Licencia y Uso / License & Usage

El código fuente (arquitectura de Angular, componentes, integraciones y Tailwind CSS) de este sitio web está bajo la **licencia MIT** (ver el archivo `LICENSE`). Eres libre de bifurcar (*fork*) este repositorio, aprender de la arquitectura y usar el código para construir tu propio portfolio personal.

### Importante (Excepciones a la licencia)

Las fotografías, logotipos, textos, información de proyectos (incluyendo descripciones y enlaces), la historia personal y el diseño visual (UI) son propiedad exclusiva de **Sergio Rodríguez** (Copyright © 2026) y **no están cubiertos por la licencia MIT**. No tienes permiso para reutilizarlos, distribuirlos ni publicarlos.

**Si decides usar este código como base para tu propia web, te exijo amablemente que:**
1. Elimines mi información personal y profesional.
2. Quites mi fotografía de avatar.
3. Cambies los colores y tipografías para crear tu propia identidad.
4. No intentes hacer pasar mis proyectos como tuyos.
