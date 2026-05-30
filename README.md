# Portfolio Web

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
   Para construir la aplicación para producción (con soporte SSR/Server-Side Rendering):
   ```bash
   bun run build
   # o con npm:
   npm run build
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
   To build the application for production (with SSR/Server-Side Rendering support):
   ```bash
   bun run build
   # or with npm:
   npm run build
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
