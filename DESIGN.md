---
name: chuwi-dev
description: Portfolio de una página montado como una caja bento (jūbako) en índigo aizome con acento tamago.
colors:
  tamago: "#f2b92f"
  tamago-night: "#f5c24a"
  tamago-ink: "#7a5200"
  on-tamago: "#0b1022"
  furoshiki: "#22336f"
  furoshiki-deep: "#1a285a"
  on-cloth: "#eef1f8"
  on-cloth-muted: "#b9c2da"
  discard-red: "#c23b2e"
  discard-red-night: "#ff7464"
  available-green: "#2e9e62"
  available-green-night: "#4cc787"
  paper: "#e8ebf0"
  tray: "#d7dce6"
  compartment: "#f8f9fb"
  line: "#cbd1dc"
  ink: "#0b1022"
  ink-muted: "#465069"
  chip: "#edf0f5"
  night-paper: "#04060d"
  night-tray: "#0b1020"
  night-compartment: "#070b17"
  night-line: "#161d35"
  night-ink: "#eef1f8"
  night-ink-muted: "#9aa4c0"
  night-chip: "#0f1428"
typography:
  display:
    fontFamily: "Zen Kaku Gothic New, Hiragino Kaku Gothic ProN, Yu Gothic, system-ui, sans-serif"
    fontSize: "6rem"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.045em"
  headline-lg:
    fontFamily: "Zen Kaku Gothic New, Hiragino Kaku Gothic ProN, Yu Gothic, system-ui, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Zen Kaku Gothic New, Hiragino Kaku Gothic ProN, Yu Gothic, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.045em"
  role:
    fontFamily: "Zen Kaku Gothic New, Hiragino Kaku Gothic ProN, Yu Gothic, system-ui, sans-serif"
    fontSize: "2.125rem"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Zen Kaku Gothic New, Hiragino Kaku Gothic ProN, Yu Gothic, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Zen Kaku Gothic New, Hiragino Kaku Gothic ProN, Yu Gothic, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Zen Kaku Gothic New, Hiragino Kaku Gothic ProN, Yu Gothic, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "\"tnum\""
  body-sm:
    fontFamily: "Zen Kaku Gothic New, Hiragino Kaku Gothic ProN, Yu Gothic, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Zen Kaku Gothic New, Hiragino Kaku Gothic ProN, Yu Gothic, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.2
  chip:
    fontFamily: "Zen Kaku Gothic New, Hiragino Kaku Gothic ProN, Yu Gothic, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "Zen Kaku Gothic New, Hiragino Kaku Gothic ProN, Yu Gothic, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.5
  caption:
    fontFamily: "Zen Kaku Gothic New, Hiragino Kaku Gothic ProN, Yu Gothic, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.5
rounded:
  r: "3px"
  r-chip: "2px"
spacing:
  gap: "8px"
  sp-2: "2px"
  sp-4: "4px"
  sp-8: "8px"
  sp-12: "12px"
  sp-16: "16px"
  sp-24: "24px"
  sp-32: "32px"
  sp-48: "48px"
  sp-64: "64px"
components:
  tray:
    backgroundColor: "{colors.tray}"
    rounded: "{rounded.r}"
    padding: "8px"
  compartment:
    backgroundColor: "{colors.compartment}"
    textColor: "{colors.ink}"
    rounded: "{rounded.r}"
    padding: "32px"
  statement:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.compartment}"
    typography: "{typography.headline-lg}"
    rounded: "{rounded.r}"
    padding: "64px 48px"
  lid:
    backgroundColor: "{colors.furoshiki}"
    textColor: "{colors.on-cloth}"
    rounded: "{rounded.r}"
    padding: "64px 48px"
  button-primary:
    backgroundColor: "{colors.tamago}"
    textColor: "{colors.on-tamago}"
    typography: "{typography.button}"
    rounded: "{rounded.r}"
    padding: "0 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "color-mix(in srgb, #f2b92f 82%, white)"
    textColor: "{colors.on-tamago}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.r}"
    padding: "0 24px"
    height: "52px"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.compartment}"
  button-small:
    rounded: "{rounded.r}"
    padding: "0 16px"
    height: "44px"
  chip:
    backgroundColor: "{colors.chip}"
    textColor: "{colors.ink}"
    typography: "{typography.chip}"
    rounded: "{rounded.r-chip}"
    padding: "4px 12px"
  chip-small:
    rounded: "{rounded.r-chip}"
    padding: "2px 8px"
  chip-ai:
    backgroundColor: "color-mix(in srgb, #f2b92f 30%, #f8f9fb)"
    textColor: "{colors.ink}"
  chip-active:
    backgroundColor: "{colors.tamago}"
    textColor: "{colors.on-tamago}"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.r-chip}"
    padding: "2px 8px"
  segmented-cell:
    backgroundColor: "{colors.compartment}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    width: "44px"
    height: "34px"
  segmented-cell-hover:
    backgroundColor: "{colors.chip}"
    textColor: "{colors.ink}"
  segmented-cell-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.compartment}"
  filter-pill:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.compartment}"
    typography: "{typography.label}"
    rounded: "{rounded.r}"
    padding: "8px 8px 8px 16px"
---

# Design System: chuwi-dev

## Overview

**Creative North Star: "El jūbako que se monta"**

La página es una caja bento japonesa de pisos (jūbako) que se ensambla delante del visitante. Cada piso es una bandeja; dentro, compartimentos sin borde ni sombra en reposo, separados solo por un hueco de 8 px igual al padding de la bandeja. Cada compartimento guarda una sola cosa y su tamaño lo dicta su peso, no el deseo de igualar alturas: un proyecto principal ocupa 8 o 12 columnas, uno menor 4. La caja va envuelta en un furoshiki índigo (aizome) que se abre al cargar y vuelve a cerrarse como tapa al final, con un nudo cuadrado en tamago.

El sistema es moderno y minimal, cuadrado casi por completo (3 px y 2 px de radio) y de una sola familia tipográfica. La densidad es alta pero ordenada: la rejilla de 12 columnas y el hueco constante hacen el trabajo de los bordes y las sombras. El color está casi todo en grises azulados fríos; el tamago es un relleno escaso que marca la acción y la evidencia, y el índigo de la tela solo aparece en el envoltorio.

El movimiento es de montaje: la tela se abre, cada compartimento entra desde su lado ya opaco y los pisos siguientes se colocan al entrar en pantalla. Se rechaza de forma explícita la bento grid genérica de SaaS (icono, título y texto en celdas iguales, degradados, cristal, brillos) y el hero partido con foto.

**Key Characteristics:**
- Bandeja con compartimentos: hueco y padding de bandeja idénticos (8 px).
- Tamaño de compartimento proporcional al peso del contenido.
- Radios de 3 px en bandejas, compartimentos, botones y segmentados; 2 px en chips, etiquetas y citas.
- Una sola familia, Zen Kaku Gothic New, con titulares a peso 900 y tracking muy cerrado.
- Índigo aizome como tela y tamago como único acento de relleno.
- Tema oscuro profundo con compartimentos hundidos respecto a la bandeja.
- Una única curva de animación para todo el sistema.

## Colors

Grises azulados fríos para la caja, índigo para la tela y un amarillo tamago escaso como único acento.

### Primary
- **Tamago** (#f2b92f; #f5c24a en oscuro): relleno de la acción principal, chips de IA mezclados al 30 % sobre el compartimento, chip activo del filtro, citas de fuente de la demo, el nudo del furoshiki, el compartimento destacado del logotipo, el punto vivo de la demo y la selección de texto. El texto encima siempre es **Tinta sobre tamago** (#0b1022).
- **Ámbar profundo** (#7a5200 en claro; en oscuro el propio tamago, #f5c24a): tinta de enlaces de acción y anillo de foco (2 px, separado 3 px). Da 6,6:1 sobre el compartimento claro.

### Secondary
- **Furoshiki índigo** (#22336f) y **Furoshiki profundo** (#1a285a): la tela, igual en los dos temas. Pliegues alternos del furoshiki de carga, bandeja y compartimento de la tapa de contacto.
- **Texto sobre tela** (#eef1f8) y **Texto secundario sobre tela** (#b9c2da): titular y datos de la tapa; el secundario da 6,7:1 sobre la tela.

### Tertiary
- **Rojo de descarte** (#c23b2e; #ff7464 en oscuro): solo la cifra inventada tachada de la demo y su veredicto.
- **Verde disponible** (#2e9e62; #4cc787 en oscuro): solo el cuadrado de «Disponible».

### Neutral
- **Papel** (#e8ebf0 / #04060d): fondo de la página y del panel de menú móvil.
- **Bandeja** (#d7dce6 / #0b1020): cada piso.
- **Compartimento** (#f8f9fb / #070b17): toda celda de contenido, fondo de los segmentados y texto sobre rellenos de tinta.
- **Línea** (#cbd1dc / #161d35): bordes de segmentados, etiquetas y capturas, y filas separadoras de listas, tablas y puntos.
- **Tinta** (#0b1022 / #eef1f8): texto principal, relleno del estado activo y del compartimento de la frase.
- **Tinta secundaria** (#465069 / #9aa4c0): textos de apoyo, fechas, navegación en reposo y texto de lo que el filtro descarta (7,6:1 y 7,9:1 sobre el compartimento).
- **Chip** (#edf0f5 / #0f1428): fondo de chips, burbuja de la pregunta, hover de segmentados y fondo de las capturas mientras cargan.

### Named Rules
**The Tamago Fill Rule.** El tamago rellena superficies; en el tema claro nunca colorea texto, que usa el ámbar profundo. Sobre la tela puede además trazar el anillo de foco y el subrayado de los enlaces.

**The Ink Fill Rule.** El relleno de tinta con texto de compartimento significa «activo o seleccionado»: segmentado actual, pausa pulsada, hover del botón de contorno, píldora del filtro y enlace de salto. Fuera de esos estados solo lo llevan el compartimento de la frase a todo el ancho y tres de los rectángulos del logotipo.

**The Single Signal Rule.** Rojo y verde tienen un solo uso cada uno (la cifra descartada con su veredicto, el cuadrado de «Disponible»). No se reutilizan como colores de estado genéricos.

## Typography

**Display Font:** Zen Kaku Gothic New (con Hiragino Kaku Gothic ProN, Yu Gothic, system-ui, sans-serif)
**Body Font:** Zen Kaku Gothic New (la misma familia)

**Character:** Una gótica japonesa moderna en cuatro pesos (400, 500, 700 y 900). El contraste viene del peso y del tracking, no de mezclar familias: titulares a 900 muy apretados frente a un cuerpo amplio a 400. Las cifras usan numerales tabulares en toda la página.

### Hierarchy
- **Display** (900, 6rem; 4.5rem por debajo de 1200 px; 3rem en móvil; interlineado 0.92): solo el nombre del h1, partido en dos líneas.
- **Headline grande** (900, 4.5rem; 3rem o 2.25rem en móvil; interlineado 1): la frase a todo el ancho y el titular de la tapa de contacto.
- **Headline** (900, 3.75rem; 2.25rem en móvil; interlineado 1): titular de cada piso, dentro de la tira superior de la bandeja, y titular de la página 404.
- **Role** (500, 2.125rem; 1.5rem en móvil; interlineado 1.15): el rol bajo el nombre, entero en tinta.
- **Title** (900, 1.875rem; interlineado 1.05; tracking -0.03em): títulos de proyecto y de columna de trayectoria. En proyecto escala con el ancho del propio compartimento: 1.5rem por debajo de 400 px, 2.25rem desde 700 px y 3rem en el proyecto destacado.
- **Lead** (400, 1.1875rem; interlineado 1.6): el pitch, el texto de la tapa y la respuesta de la demo, con medida de 30 a 33em.
- **Body** (400, 1.125rem; interlineado 1.6): cuerpo base de la página y respuestas de preguntas; las introducciones de piso se limitan a 34em.
- **Body pequeño** (400, 1rem): resúmenes de proyecto, puntos, notas.
- **Label** (700, 0.875rem): etiquetas de evidencia, segmentados, enlaces de acción, cabeceras de grupo del stack y fechas (estas a 400).
- **Caption** (700, 0.75rem): citas de fuente de la demo y aviso de datos ficticios sobre capturas.

### Named Rules
**The One Family Rule.** Una sola familia; la jerarquía sale del peso (400 a 900) y del tracking (-0.045em en display y headlines). No hay monoespaciada ni segunda familia.

**The Whole Headline Rule.** Un titular va entero en un color; ninguna palabra suelta se resalta en otro color ni en otro peso.

## Layout

Contenedor de 1440 px como máximo, con 24 px de margen lateral (16 px por debajo de 640 px). Debajo de la barra de 76 px, la página es una pila de bandejas separadas solo por el hueco de 8 px; la tapa de contacto se separa 48 px para que su nudo asome sobre el borde. Cada bandeja lleva su titular en una tira superior (32/24/24 px de padding; 24/16/16 px en móvil) y debajo una rejilla de 12 columnas con hueco de 8 px.

Los compartimentos tienen 32 px de padding (24 px en móvil); el principal del primer piso, 48 px; la frase y la tapa, 64 por 48 px. Ocupaciones observadas: 3, 4, 5, 6, 7, 8, 9 y 12 columnas. El primer piso coloca el compartimento principal en las columnas 1 a 7 y la demo en 8 a 12, con una fila baja de estado (1 a 3), stack (4 a 9) y foto (10 a 12).

Respuesta por anchos: desde 1200 px, la rejilla completa; de 768 a 1199 px, los proyectos van de dos en dos y los de fila entera, de 8 columnas o terceros de una fila de tres ocupan el ancho; por debajo de 1024 px el resto va en una columna y el menú pasa a panel a altura completa; por debajo de 768 px, todo en una columna. Los proyectos se reorganizan con consultas de contenedor según su propio ancho: desde 700 px parten texto y captura en dos columnas.

La escala de espaciado es cerrada (2, 4, 8, 12, 16, 24, 32, 48 y 64 px) y los objetivos táctiles crecen a 44 px con puntero grueso.

### Named Rules
**The Equal Gap Rule.** El hueco entre compartimentos y el padding de la bandeja son el mismo valor (8 px). Nada separa compartimentos salvo ese hueco.

**The Weight Sizes Rule.** El tamaño de un compartimento lo decide el peso de lo que guarda; las capturas mantienen 16/10 y nunca se estiran para igualar alturas, el sobrante queda bajo el texto.

## Elevation & Depth

El sistema es plano en reposo y su profundidad es tonal: la bandeja es un tono más oscura que el papel y el compartimento se separa de ella por contraste. En claro el compartimento es más claro que la bandeja (asoma); en oscuro es más oscuro (se hunde). La sombra solo aparece como respuesta: el compartimento de proyecto que es enlace se levanta 3 px con una sombra difusa al pasar el ratón o con foco, y la píldora flotante del filtro lleva una sombra parecida mientras está abierta.

### Shadow Vocabulary
- **Levantar** (`box-shadow: 0 16px 28px -20px rgb(11 16 34 / 0.5)`; en oscuro `rgb(0 0 0 / 0.8)`): hover y foco de compartimentos de proyecto enlazados, junto con `translateY(-3px)`.
- **Flotar** (`box-shadow: 0 16px 28px -16px rgb(11 16 34 / 0.5)`; en oscuro `rgb(0 0 0 / 0.8)`): la píldora fija del filtro de stack.

### Named Rules
**The Flat At Rest Rule.** Ningún compartimento lleva sombra ni borde en reposo; la sombra es siempre difusa, nunca desplazada en bloque, y solo responde a hover, foco o a un elemento flotante.

**The Sunken Night Rule.** En oscuro el compartimento queda por debajo de la bandeja (#070b17 frente a #0b1020); no se invierte esa relación para «iluminar» tarjetas.

## Shapes

Todo es cuadrado: 3 px en bandejas, compartimentos, botones, segmentados y la píldora; 2 px en chips, etiquetas, citas, la burbuja de la pregunta y el botón de pausa. El único círculo es el del icono del sol. Los marcadores son cuadrados sin radio: el punto de «Disponible» (10 px), el punto vivo de la demo (8 px), el nudo del furoshiki (64 px en la carga, 56 px en la tapa) y el logotipo de cuatro rectángulos de tamaños distintos (8 y 12 px, con 2 px de hueco), uno en tamago. Los iconos son SVG de trazo de 2 px con remates cuadrados en una rejilla de 24. Las capturas van en un marco con borde de línea, 16/10, recortadas por arriba con `object-fit: cover`. La tela del furoshiki se dibuja con cuatro triángulos por `clip-path` que se juntan en el centro.

## Components

### Buttons
Cuadrados y firmes, con texto a 700.
- **Shape:** esquinas casi rectas (3 px), alto mínimo de 52 px, icono de 18 px a 8 px del texto.
- **Primary:** relleno tamago con tinta encima, padding lateral de 24 px. Un solo botón principal por grupo de acciones; en hover se aclara mezclando un 18 % de blanco.
- **Secondary:** contorno de 1 px en tinta, sin relleno; en hover se rellena de tinta con texto de compartimento. Sobre la tela el contorno y el texto pasan a texto sobre tela y el hover se rellena con ese mismo tono.
- **Small:** 44 px de alto, 16 px de padding, 14 px de texto; para «Pedir el código» y para quitar el filtro.
- **Press:** baja 1 px al pulsar. En móvil los botones de un grupo ocupan el ancho completo.

### Chips
- **Style:** fondo chip, 2 px de radio, texto a 500. Dos tamaños: 16 px con padding de 4 por 12 px en el stack del primer piso y en el filtro; 14 px con padding de 2 por 8 px dentro de proyectos y trayectoria.
- **State:** las tecnologías de IA llevan tamago al 30 % sobre el compartimento. En el filtro de stack los chips son botones con `aria-pressed`: hover oscurece un 12 % con tinta (el de IA sube al 50 % de tamago) y el activo se rellena de tamago con tinta encima.

### Tags
Etiqueta de metadato con borde de línea de 1 px, 2 px de radio, 14 px a 700 y padding de 2 por 8 px. Dice qué se puede comprobar de cada proyecto («Código público», «Demo en vivo», «Código bajo petición») con su icono de 14 px, si fue en equipo, y en trayectoria el tipo de puesto. Sin relleno y en minúsculas normales.

### Cards / Containers
- **Corner Style:** 3 px.
- **Background:** compartimento sobre bandeja; la frase usa tinta con texto de compartimento; la tapa usa la tela con texto sobre tela.
- **Shadow Strategy:** plano en reposo; ver Elevation & Depth.
- **Border:** ninguno. Las líneas solo separan filas internas (puntos, roles, preguntas, datos).
- **Internal Padding:** 32 px (24 px en móvil); 48 px en el principal; 64 por 48 px en la frase y la tapa.

### Segmented Switch
El mismo componente para idioma (ES|EN) y tema (sol|luna): borde de línea de 1 px y 3 px de radio, celdas de 44 por 34 px (36 px de alto total; 42 px por celda con puntero grueso) separadas por una línea, texto de 14 px a 700 o icono de 16 px, en tinta secundaria. Hover con fondo chip y tinta; activo relleno de tinta con texto de compartimento. Los dos van juntos con 8 px de separación, también en el panel móvil.

### Navigation
Barra de 76 px: logotipo de cuatro rectángulos y la marca a 18 px y 700; enlaces a 16 px y 500 en tinta secundaria que pasan a tinta en hover; los segmentados a la derecha. Por debajo de 1024 px los enlaces y los segmentados van en un panel `popover` a altura completa con fondo de papel, enlaces a 48 px y 900 con tracking -0.045em, botón de cerrar de 44 px, y el panel entra bajando 12 px con fundido.

### Project Compartment
Compartimento de proyecto con contenedor propio: fila de metadatos (etiquetas y periodo alineado a la derecha), título, frase de 18 px a 500, resumen en tinta secundaria, puntos separados por líneas y pie con chips y la acción. Si hay código o demo, el compartimento entero es el enlace (un `::after` cubre la celda) y lleva el enlace de acción en ámbar profundo con icono externo; el foco dibuja el anillo alrededor del compartimento. Al pasar el ratón se levanta 3 px y la captura escala a 1,03 en 0,6 s. Si el código es privado, en lugar de enlace lleva el botón pequeño de contorno. Con el filtro activo, lo que no usa la tecnología encoge a 0,98, baja su captura y sus chips al 35 % y pasa su texto a tinta secundaria, que sigue siendo legible y enlazable.

### Statement Compartment
Compartimento a todo el ancho con fondo de tinta, texto de compartimento y la frase en Headline grande, sin resaltar palabras. En oscuro se invierte con la tinta clara.

### Furoshiki and Lid
Al cargar, el primer piso queda cubierto por la tela partida en cuatro picos que se juntan en un nudo cuadrado tamago de 64 px. El nudo se suelta (escala 0 y 45° en 0,35 s) y los picos se abren hacia fuera con giros de 104° en perspectiva de 1600 px, escalonados de 0,22 a 0,45 s y 0,9 s cada uno. Es decorativo (`aria-hidden`, sin eventos de puntero) y no existe con movimiento reducido. La tapa final repite la tela como bandeja y compartimento, con un nudo de 56 px sobre su borde superior.

### Live Verifier Demo
Compartimento de la demo del primer piso: cabecera en Label con punto vivo tamago que parpadea y botón de pausa (2 px de radio, relleno de tinta al pulsarlo), mini tabla de datos con borde de línea y cifras a 700 alineadas a la derecha, pregunta en burbuja chip alineada a la derecha, respuesta en Lead que aparece palabra a palabra con citas tamago, la cifra inventada tachada en rojo de descarte con 2 px de grosor, el veredicto en rojo con icono de cierre y un pie separado por línea. El bucle mantiene el estado final 9 s antes de reiniciar, se pausa fuera de pantalla y con la pestaña oculta, y con movimiento reducido muestra el estado final quieto.

## Do's and Don'ts

### Do:
- **Do** separar compartimentos solo con el hueco de 8 px, igual al padding de la bandeja.
- **Do** dimensionar cada compartimento por el peso de su contenido, en la rejilla de 12 columnas.
- **Do** usar la curva cubic-bezier(0.22, 1, 0.36, 1) en toda animación y transición: 0,2 s al pulsar, 0,25 s en cambios de color de controles, 0,35 s en levantar y filtrar, 0,8 s en las entradas.
- **Do** hacer entrar los compartimentos desde su lado (22 px desde la izquierda, la derecha o abajo) siempre opacos, con 80 ms de escalonado en el primer piso y con `animation-timeline: view()` y `animation-range: entry 0% entry 55%` dentro de `@supports` en los siguientes.
- **Do** animar en entradas y en el furoshiki solo transform, opacity, clip-path y visibility; el color, el fondo y la sombra solo cambian como respuesta a hover, foco o filtro.
- **Do** quitar animaciones y transiciones con `prefers-reduced-motion: reduce` y dejar todo visible y quieto.
- **Do** mantener 4,5:1 en todo texto, también en el que el filtro atenúa: se cambia a tinta secundaria, nunca se baja su opacidad.
- **Do** usar iconos SVG de trazo de 2 px con remates cuadrados.

### Don't:
- **Don't** construir la bento grid genérica: celdas iguales con icono, título y texto, degradados, cristal o brillos.
- **Don't** partir el hero en texto a un lado y foto al otro.
- **Don't** dar borde ni sombra en reposo a un compartimento, ni usar sombras desplazadas en bloque.
- **Don't** redondear más de 3 px; el círculo del icono del sol es la única curva.
- **Don't** usar `ease` ni `linear`.
- **Don't** escribir texto en tamago en el tema claro.
- **Don't** colorear una palabra suelta de un titular.
- **Don't** poner etiquetas en mayúsculas con tracking abierto; las únicas mayúsculas son los códigos de idioma ES y EN y las siglas.
- **Don't** unir metadatos con puntos medios ni poner «→» como glifo en enlaces y botones; la dirección la da el icono externo dibujado.
- **Don't** usar el rojo y el verde fuera de su único uso.
