# Procedencia de los ráster que se publican

Este fichero no se sirve: vive en `.impeccable/`, fuera de `public/`. Los ráster publicados no llevan
metadatos de herramienta.

| Fichero | Origen |
|---|---|
| `public/og.png` (1200×630) | Captura del primer viewport de chuwi-dev.me (ES, tema claro), generada desde el build con Chrome headless. Sin retoque; metadatos eliminados con `magick -strip`. |
| `src/assets/avatar.webp` (640×350) | Recorte apaisado de la foto original del repositorio (`public/avatar-hd.webp` en el commit 37ea31a), región x 520 a 1160 e y 48 a 398 de los 1600×722 originales. Sin retoque de color. |
| `src/assets/projects/*` | Capturas con procedencia en sus ficheros `*.json` contiguos (`*.webp.json` y `*.png.json`). |
