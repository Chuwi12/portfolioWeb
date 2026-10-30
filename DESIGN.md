---
name: chuwi-dev
description: "Portfolio leído como git log --graph desde HEAD: carriles teal sobre neutros, nodos cuyo relleno es la evidencia, Archivo ancho para titulares y Martian Mono solo para datos."
colors:
  teal-deep: "#0f766e"
  teal-pressed: "#115e59"
  teal-mid: "#0d9488"
  teal-signal: "#14b8a6"
  teal-bright: "#2dd4bf"
  teal-glow: "#4fdbc8"
  teal-ink: "#03241f"
  night: "#030712"
  ink: "#111827"
  graphite: "#1f2937"
  paper: "#f3f4f6"
  white: "#ffffff"
  mist: "#e5e7eb"
  slate: "#4b5563"
  slate-muted: "#586070"
  dusk: "#9ca3af"
  sea-fog: "#bbcac6"
  cold-white: "#dde2f3"
typography:
  display:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(44px, 7vw, 96px)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 120"
  headline:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(28px, 3.2vw, 38px)"
    fontWeight: 750
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 110"
  title:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(22px, 2.2vw, 26px)"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 110"
  role:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(24px, 2.4vw, 34px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 105"
  brand:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "21px"
    fontWeight: 800
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 118"
  contact:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(19px, 4.6vw, 46px)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 110"
  body:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
    fontVariation: "'wdth' 100"
  body-sm:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 650
    lineHeight: 1
    fontVariation: "'wdth' 105"
  data:
    fontFamily: "Martian Mono Variable, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
    fontFeature: "'tnum'"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  pill: "999px"
  full: "50%"
spacing:
  avatar: "116px"
  lane-step: "32px"
  graph-gap: "28px"
  page-pad: "64px"
  header-height: "64px"
  page-max: "1440px"
  control: "44px"
components:
  button-primary:
    backgroundColor: "{colors.teal-deep}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "{spacing.control}"
  button-primary-hover:
    backgroundColor: "{colors.teal-pressed}"
  button-primary-dark:
    backgroundColor: "{colors.teal-signal}"
    textColor: "{colors.teal-ink}"
  button-primary-dark-hover:
    backgroundColor: "{colors.teal-bright}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.teal-deep}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "{spacing.control}"
  button-outline-dark:
    textColor: "{colors.teal-glow}"
  pill-ref:
    backgroundColor: "transparent"
    textColor: "{colors.teal-deep}"
    typography: "{typography.data}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  pill-ref-head:
    backgroundColor: "{colors.teal-deep}"
    textColor: "{colors.white}"
  chip-tech:
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.md}"
    padding: "5px 8px"
    height: "36px"
  chip-tech-pressed:
    backgroundColor: "{colors.teal-deep}"
    textColor: "{colors.white}"
  commit-band-featured:
    backgroundColor: "{colors.white}"
    textColor: "{colors.slate}"
  shortcut-key:
    textColor: "{colors.teal-deep}"
    typography: "{typography.data}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  shortcuts-dialog:
    backgroundColor: "{colors.white}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.lg}"
  toast:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
---

# Design System: chuwi-dev

## Overview

**Creative North Star: "El historial desde HEAD"**

La página es un `git log --graph` leído hacia atrás: arriba está HEAD (Sergio hoy, con su foto como nodo del carril principal) y cada entrada es un commit sobre un carril teal que baja hasta el commit raíz. El sistema entero se deriva de esa metáfora: una sola rejilla de carriles que alinea todo lo demás, un único tono cromático (teal) sobre neutros azul-grisáceos, y un vocabulario de marcas (lleno, anillo, discontinuo) que dice qué se puede comprobar de cada commit sin recurrir a más color. Es una interfaz de datos en calma: líneas finas, mucho aire entre filas, el titular grande como único gesto de volumen.

La densidad es de registro, no de tarjetas: las filas se separan con una línea de 1px y no se encierran en cajas. El tono es técnico y sobrio; el carácter lo pone Archivo en su eje de ancho (titulares anchos y apretados, cuerpo a ancho normal) frente a Martian Mono, que queda reservado a lo que de verdad es un dato o un comando. La escala teal (oscura y clara) es una decisión fija del propietario: se conserva.

El rechazo confirmado es el portfolio de desarrollador por defecto: hero partido con foto, roles tecleados, nube de pastillas de tecnología y rejilla de tarjetas iguales. El fondo es ambiental (ramas casi invisibles con commits que viajan despacio) y nunca compite con los datos.

**Key Characteristics:**
- Un único tono cromático, teal, en dos temas (claro y oscuro) con la misma estructura.
- Una rejilla `[carriles | contenido]` compartida por hero, stack, historial y pie.
- La evidencia de cada commit es una forma (lleno, anillo, discontinuo), nunca un color añadido.
- Plano: sin sombras de caída; la profundidad es un escalón tonal más líneas de 1px.
- Archivo variable con eje de ancho para titulares; Martian Mono solo para datos.
- Movimiento contenido: el trazado de carriles al cargar, el plegado de filas y un fondo ambiental; todo apagado con `prefers-reduced-motion`.

## Colors

Un teal único sobre neutros azul-grisáceos fríos; el tema oscuro invierte la rampa de carriles para que el principal siempre sea el de más contraste con el fondo.

### Primary
- **Verdín profundo** (`teal-deep`, #0f766e): tinta principal del tema claro. Enlaces, texto del rol, carril 0, botón primario, píldoras de ref, aro del avatar, foco, chips pulsados y selección. En el tema oscuro pasa a ser el carril 2.
- **Verdín luminoso** (`teal-glow`, #4fdbc8): el mismo papel en el tema oscuro (texto de acento, carril 0, aro, foco, contorno de botón). 11,8:1 sobre el fondo oscuro.

### Secondary
- **Verdín medio** (`teal-mid`, #0d9488): carril 1 del tema claro.
- **Verdín señal** (`teal-signal`, #14b8a6): carril 2 del tema claro, carril 1 del oscuro y fondo del botón primario oscuro.
- **Verdín pulsado** (`teal-pressed`, #115e59) y **Verdín claro de hover** (`teal-bright`, #2dd4bf): hover del botón primario en claro y en oscuro.
- **Tinta verdín** (`teal-ink`, #03241f): texto sobre el botón primario oscuro (6,6:1).

### Neutral
- **Noche** (`night`, #030712): fondo del tema oscuro.
- **Tinta** (`ink`, #111827): titulares y enlaces de texto en claro; superficie de tarjeta (banda destacada, diálogo, aviso) en oscuro.
- **Grafito** (`graphite`, #1f2937): texto de cuerpo en claro; línea de 1px en oscuro.
- **Papel** (`paper`, #f3f4f6): fondo del tema claro.
- **Blanco** (`white`, #ffffff): superficie de tarjeta y texto sobre el botón teal en claro; titulares en oscuro.
- **Bruma** (`mist`, #e5e7eb): línea de 1px del tema claro.
- **Pizarra** (`slate`, #4b5563) y **Pizarra apagada** (`slate-muted`, #586070): texto secundario y texto atenuado en claro (6,9:1 y 5,7:1 sobre papel).
- **Crepúsculo** (`dusk`, #9ca3af): texto atenuado en oscuro (7,9:1 sobre noche).
- **Niebla marina** (`sea-fog`, #bbcac6): texto secundario en oscuro.
- **Blanco frío** (`cold-white`, #dde2f3): texto de cuerpo en oscuro.

### Named Rules
**The One Ink Rule.** El teal es la única tinta cromática. No existe un segundo tono ni un color de estado: lo que cambia entre estados es la forma, el grosor o el relleno, nunca el matiz.

**The Mark Not Color Rule.** La evidencia de un commit (código público, demo, código bajo petición) se dice con la forma del nodo: lleno, anillo, discontinuo. Un estado nuevo pide una forma nueva, no un color nuevo.

**The Lane Ramp Rule.** Los tres carriles recorren la escala teal. En claro: #0f766e, #0d9488, #14b8a6; en oscuro: #4fdbc8, #14b8a6, #0f766e. El carril principal (0) siempre es el extremo de más contraste con el fondo.

## Typography

**Display Font:** Archivo Variable (con `ui-sans-serif, system-ui, sans-serif`), autoalojada, eje de peso 100–900 y de ancho 62–125%.
**Body Font:** Archivo Variable al ancho normal (100%).
**Label/Mono Font:** Martian Mono Variable (con `ui-monospace, SFMono-Regular, Menlo, monospace`), autoalojada.

**Character:** Archivo ensanchado y apretado en los titulares da una voz de grotesca técnica y segura; a ancho normal es un cuerpo neutro y legible. La mono aparece como la tipografía de la terminal dentro de la página.

### Hierarchy
- **Display** (800, `clamp(44px, 7vw, 96px)`, 0.95, ancho 120%, -0.03em): el nombre en el commit HEAD. Por debajo de 480px el ancho baja a 105% para no desbordar.
- **Headline** (750, `clamp(28px, 3.2vw, 38px)`, 1.1, ancho 110%, -0.02em): títulos de sección (Stack, Historial, Contacto) y título de la entrada destacada.
- **Title** (650, `clamp(22px, 2.2vw, 26px)`, 1.2, ancho 110%, -0.01em): título de cada commit.
- **Role** (600, `clamp(24px, 2.4vw, 34px)`, 1.2, ancho 105%): línea de rol en teal bajo el nombre.
- **Contact** (700, `clamp(19px, 4.6vw, 46px)`, 1.15, ancho 110%): el correo como enlace tipográfico con subrayado teal de 2px.
- **Body** (400, 17px, 1.6): texto corrido; resúmenes y presentación en `on-surface-variant`, con medida máxima de 68ch.
- **Body-sm** (400, 15px): estado del filtro, aclaraciones del stack, organización y rol de cada commit, filas plegadas, acciones; 14px para la pista de atajos y el pie legal.
- **Button** (650, 16px, ancho 105%): texto de botones; 15px en el botón de la barra.
- **Data** (Martian Mono 400, 13px, 1.5, cifras tabulares): hashes, rangos de fecha, marca de evidencia, ids y conteos de tecnología, refs, el comando `git log -- <tech>`, teclas, teléfono y el conmutador de idioma. Divergencia respecto al contrato, que la limitaba a hashes, fechas y stack: la build la usa para todo texto que se teclea o se copia.

### Named Rules
**The Mono Is Data Rule.** Martian Mono solo para texto que parezca de terminal o de registro: hashes, fechas, ids, refs, comandos, teclas. Nunca para titulares ni para párrafos.

**The Width Axis Rule.** Peso y ancho suben juntos: cuanto mayor el titular, más ancho (105–120%) y más tracking negativo (-0.01 a -0.03em); el cuerpo se queda a 100% y sin tracking.

## Layout

Una sola rejilla de dos columnas, `[carriles | contenido]`, es la estructura de todas las secciones: hero, cabecera del stack, cada commit del historial y (desde 768px) el pie, que se sangra para caer en la misma columna de contenido. El contenedor va hasta 1440px con margen lateral de 16px (base), 32px (≥640px) y 64px (≥1024px).

La anchura de carriles se deriva del avatar: el carril 0 está en el centro del avatar (`avatar/2`), el 1 y el 2 a un `lane-step` cada uno, y la columna mide `x2 + 12px`. Valores por tramo: avatar 64px, paso 10px, hueco 12px (base); 88px, 24px, 20px (≥640px); 116px, 32px, 28px (≥1024px). Cabecera fija de 56px (64px desde 1024px).

Asignación de carriles: la trayectoria (prácticas, formación) va en el carril 0 (main); los proyectos alternan entre el 1 y el 2 con una curva que sale de main y otra que vuelve. El carril 0 baja continuo desde el centro del avatar hasta el commit raíz, donde termina en el nodo.

El commit completo es una fila de tres zonas: metadatos (184px) | asunto (flexible) | evidencia (320px) desde 1100px; metadatos | asunto con captura y acciones debajo entre 720 y 1099px; una columna por debajo. La entrada destacada se rompe a todo ancho en una banda y, desde 1100px, reparte texto 5fr | captura 6fr. El stack es una rejilla de grupos con etiqueta de 11rem (≥768px) y una columna lateral de 17rem para las notas (≥1100px). Puntos de corte usados: 480, 640, 720, 768, 1024 y 1100px.

No hay escala de espaciado formal; el ritmo recurrente es 8, 12, 16, 20, 24px entre elementos, 22–26px de relleno vertical en una fila completa (28–32px en la destacada) y títulos de sección con `clamp(24px, 2.6vw, 36px)` de aire superior. Controles táctiles de 44px, salvo los de barra, chips y acciones de fila (36–40px).

### Named Rules
**The One Grid Rule.** Todo bloque de página cuelga de la rejilla de carriles y comparte su borde izquierdo de contenido; ningún bloque define su propio margen.

**The Single Interruption Rule.** Una sola banda a todo ancho cruza los carriles, la de la entrada destacada. El resto del historial es filas planas separadas por una línea.

## Elevation & Depth

Plano por defecto. La build no tiene sombras de caída: la profundidad es un escalón tonal (fondo → superficie de tarjeta) más líneas de 1px (`mist` en claro, `graphite` en oscuro). La banda destacada, el diálogo de atajos y el aviso usan la superficie de tarjeta; el diálogo añade un velo del color del fondo al 78% detrás.

### Shadow Vocabulary
- **Aro de resaltado** (`box-shadow: inset 0 0 0 1px var(--color-primary)`): contorno fino de un chip de tecnología iluminado por el commit señalado. Es la única `box-shadow` de la build y no proyecta nada.
- **Foco** (`outline: 2px solid var(--color-primary); outline-offset: 2px`): anillo de teclado único en toda la página.

### Named Rules
**The Flat Ledger Rule.** Sin sombras de caída ni elevaciones: los estados se marcan con contorno, grosor de trazo o relleno, nunca con sombra.

## Shapes

Geometría de línea y círculo. Controles con esquina suave de 6px (botones, herramientas de barra, capturas, aviso); 4px en teclas; 8px en el diálogo; píldora completa (999px) en refs; círculo perfecto en nodos y avatar. Las líneas del grafo miden 2px (3px al iluminarse); las separaciones, 1px. Los carriles se unen con curvas Bézier de tangente vertical (curva cúbica `M0 0 C0 .6 1 .4 1 1`) y trazo no escalable. Las capturas llevan borde de 1px y esquina de 6px, recortadas desde arriba a la izquierda con proporción 16:10.

## Components

### Buttons
Carácter: seguros y planos, mismo alto en toda la página.
- **Shape:** esquina suave (6px), 44px de alto, relleno horizontal de 20px, icono de sprite de 1.15em a la izquierda con 8px de hueco.
- **Primary:** relleno teal (claro #0f766e con texto blanco; oscuro #14b8a6 con texto #03241f). Hover: oscurece en claro (#115e59) y aclara en oscuro (#2dd4bf), con transición de 150ms. En la barra mide 40px con texto de 15px.
- **Outline:** contorno de 1px en el teal de acento y texto del mismo color; hover con relleno del 12% de ese teal.
- **Focus:** anillo único de la página (2px teal, offset 2px).

### Ref pills
Las refs de git del commit HEAD. Píldora de contorno de 1px teal con texto mono 13px; la de `HEAD -> main` va rellena (peso 700). Solo representan refs reales (rama, estado); no se usan como etiqueta de otras secciones.

### Tech chips
El argumento de `git log -- <tech>`: nombre y conteo en mono, subrayados con una línea de 1px en `text-muted` al 70%, sin caja.
- **Default:** texto de titular, conteo atenuado. Hover: línea y texto pasan a teal.
- **Pulsado (filtro):** relleno teal con texto de contraste y conteo heredado; `aria-pressed` lo expresa.
- **Iluminado (resaltado, no filtro):** contorno de 1px teal dentro del chip; nunca relleno.

### Commit graph (signature)
- **Avatar de HEAD:** foto recortada a la cara, círculo con borde de 3px teal; es el nodo del carril 0 y el carril nace en su centro.
- **Carriles:** líneas verticales de 2px en el tono del carril; el carril de cada fila usa `--lk`/`--xk`.
- **Nodos:** lleno 10px (trayectoria en main), mayores en carriles 1 y 2 (14px base, 18px desde 720px). Marca de evidencia: lleno = código público, anillo de 2px = demo en vivo, anillo discontinuo de 2px = código bajo petición; relleno del anillo con el color de fondo de la fila para tapar el carril.
- **Iluminado (rama que se ilumina):** trazo de 2px a 3px y aro de 2px teal con offset 3px en el nodo, por ratón o foco sobre el commit, o por una tecnología señalada en el stack. No cambia tamaños ni coloca nada.
- **Plegado (filtro):** la fila que no cumple se pliega a una línea fantasma (hash mono de 7ch + título con elipsis, 15px atenuado, 11px de relleno vertical); el nodo pasa a anillo de 10px y la curva se acorta de 22px a 12px. Los carriles no se interrumpen. Transición de 200ms `ease-out` sobre `grid-template-rows`.

### Commit row
Fila plana separada por 1px de línea en la parte superior. Metadatos en mono (hash, rango, marca con su etiqueta), título de 22–26px, organización y rol en 15px (la organización en peso 600 y color de titular), resumen a 68ch, tecnologías en mono atenuado (las activas en teal y peso 700) y acciones en teal de 15px/600 con iconos de sprite (código, demo, pedir el código por correo).

### Featured band
La única interrupción a todo ancho: la superficie de tarjeta cruza los carriles con 1px de línea arriba y abajo, título de 28–38px, resumen de 18px y captura a ancho completo. Plegada, la banda desaparece y la fila vuelve a ser fantasma.

### Navigation
Barra fija de 56/64px, fondo del tema con 1px de línea abajo. Marca `chuwi-dev` en teal, 21px, peso 800, ancho 118%. Desde 768px, enlaces de 15px/500 en atenuado (hover teal), herramientas de idioma (mono) y tema, y el botón primario de CV a la derecha. Por debajo, un botón de menú despliega un panel bajo la barra con enlaces de 18px/600 y las herramientas separadas por una línea.

### Shortcuts dialog and toast
Diálogo nativo de 26rem máx. con superficie de tarjeta, línea de 1px y esquina de 8px; lista de teclas en `kbd` mono teal (contorno de 1px, esquina de 4px) y descripción de 15px. El aviso (copiado o fallo) es una caja de superficie con contorno teal de 1px y esquina de 6px, abajo y centrada.

### Live graph (ambient)
Fondo fijo detrás de todo, sin capturar el puntero, de 3 a 5 carriles según el ancho (<640, <1024, ≥1024px). Líneas de 1.5px al 7% de opacidad en los colores de carril del tema activo y puntos de 3.5px al 18% que viajan a 20–40px/s en un lienzo a media resolución, a 30 fps. Se detiene con la pestaña oculta; con `prefers-reduced-motion` queda un fotograma estático; no se imprime. Semilla fija: el mismo fondo en cada visita.

## Do's and Don'ts

### Do:
- **Do** usar el teal como única tinta cromática y cambiar de estado por forma, grosor o relleno (The One Ink Rule).
- **Do** decir la evidencia con la forma del nodo: lleno, anillo, discontinuo (The Mark Not Color Rule).
- **Do** colgar cada bloque nuevo de la rejilla `[carriles | contenido]` y respetar los valores por tramo de `avatar`, `lane-step`, `graph-gap` y `page-pad`.
- **Do** separar filas con una línea de 1px (`mist` en claro, `graphite` en oscuro) y mantener la profundidad como un escalón tonal.
- **Do** componer los titulares con peso 650–800, ancho 105–120% y tracking negativo, y el cuerpo a 17px, 1.6, ancho 100%, con medida máxima de 68ch.
- **Do** reservar Martian Mono (13px, cifras tabulares) para hashes, fechas, ids, refs, comandos y teclas.
- **Do** usar iconos del sprite propio (trazo de 2px, extremos redondeados, 1.15em) y respetar `prefers-reduced-motion` en todo movimiento.
- **Do** diferenciar el resaltado (contorno fino, trazo más grueso) del filtro (relleno y plegado).

### Don't:
- **Don't** introducir un segundo tono ni colores de estado (verde de éxito, rojo de error, ámbar de aviso).
- **Don't** usar sombras de caída ni elevaciones para destacar un elemento.
- **Don't** convertir el historial en una rejilla de tarjetas iguales ni encerrar las filas en cajas; la única banda a todo ancho es la de la entrada destacada.
- **Don't** usar el relleno de un chip para un resaltado: el relleno es el filtro.
- **Don't** subir la opacidad ni la velocidad del fondo vivo, ni colocar sobre él nada que compita con los datos.
- **Don't** usar Martian Mono en titulares ni en párrafos, ni Archivo ensanchado por encima de 125%.
- **Don't** romper el carril principal al plegar una fila: los carriles siguen siempre.
