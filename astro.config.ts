import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.chuwi-dev.me',
  trailingSlash: 'always',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false },
  },
  // Sin scripts en línea (la CSP solo admite el hash del script de tema): CSS y JS van siempre en
  // ficheros de /_astro/, sin estilos incrustados ni módulos inlinados por tamaño.
  build: { inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
  devToolbar: { enabled: false },
});
