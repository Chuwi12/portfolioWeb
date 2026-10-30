---
version: 1
slug: "src-app-pages-home-home-html"
primary_target: "src/app/pages/home/home.html"
related_targets: ["src/app/app.html"]
---

# Superficie: portfolio de una página (home)

Modo: Persuade. Audiencia: reclutadores y tech leads que deciden si entrevistar a Sergio.
Acción: descargar el CV (ES/EN según idioma) o escribir a sergio.rodriguez.ev@gmail.com.
Contenido: el confirmado en PRODUCT.md (proyectos, experiencia, formación). Fuera: sección
«Aprendiendo», fondo de estrellas, colaboraciones de Tau5. Se conservan ES/EN, tema claro/oscuro
y el filtro por tecnología.

## Direction contract

THESIS: La carrera de Sergio leída como `git log --graph` desde HEAD: el primer viewport es el commit HEAD (él hoy) y cada proyecto, empleo y título es un commit con fecha real, rama y estado de evidencia. Rechaza el portfolio dev por defecto: hero partido con foto, roles tecleados, nube de pastillas y rejilla de tarjetas iguales.

OWN-WORLD: Paleta teal fijada como única tinta cromática sobre neutros (oscuro #030712/#111827/#1F2937 con #4fdbc8/#14b8a6; claro #f3f4f6/#ffffff/#e5e7eb con #0f766e/#0d9488). Carriles verticales del grafo en tintes teal; nodos de commit cuyo estado es una marca y no un color (lleno = código público, anillo = demo en vivo, discontinuo = código bajo petición); refs como píldoras de contorno (HEAD → main, tags). Grotesk de titular con carácter; mono solo para hashes, fechas y stack. Una sola rejilla de carriles alinea toda la página; una sola interrupción a todo ancho, reservada a cuentas.

STORY: En un vistazo: quién es, rol Full Stack en Go, Rust y TypeScript, y CV o contacto sin hacer scroll. Al bajar recorre el historial: proyectos de 2026, prácticas y formación hasta el commit raíz. Cree que construye producto completo porque cada tecnología del stack lleva a commits que la usan.

FIRST VIEWPORT: Barra fina con chuwi-dev, enlaces, ES/EN, tema y Descargar CV. Carril a la izquierda que nace en el nodo HEAD: la foto de Sergio (~116px) como avatar del autor. A su derecha, refs «HEAD → main» y «open-to-work», hash y fecha en mono; nombre a ~104px; rol en teal ~34px; cuerpo de dos líneas; botones Descargar CV (primario) y Escribirme. Bajo el pliegue asoman las filas de invest-ai y cuentas unidas al carril.

FORM: Historial de commits (git log --graph), posición 7 de mi lista ordenada; seed:60071b14da3b23f6. Interacción firma: el filtro por tecnología funciona como `git log -- <tech>`: los commits que la usan quedan llenos y legibles y el resto se pliega en nodos fantasma, sin perder los carriles. Movimiento: un único trazado de los carriles al cargar, con prefers-reduced-motion respetado.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Referencia elegida

Boceto del primer viewport: `.impeccable/mocks/decision/assigned.html` (build code-led, sin comp).

## Ampliación (2026-10-27, pedida por el usuario)

El usuario pidió más interactividad y un fondo animado que agrade sin quitar atención a los datos. Eligió:
- Fondo «grafo vivo»: ramas tenues del grafo a pantalla completa, por las que viajan despacio commits que se fusionan. Opacidad muy baja, colores de los carriles del tema activo, pausa con la pestaña oculta y apagado con prefers-reduced-motion. Sustituye a la regla de «un único momento de movimiento»: el trazado al cargar se mantiene y el fondo es ambiental, nunca protagonista.
- «Rama que se ilumina»: al pasar el ratón o el foco por un commit se iluminan su rama y sus tecnologías en el stack; al pasar por una tecnología se iluminan sus commits. Es un resaltado, no un filtro.
- Atajos de teclado tipo git: j/k entre commits, / al filtro, c copia el email, Esc quita el filtro o cierra la ayuda, y ? abre la ayuda.
