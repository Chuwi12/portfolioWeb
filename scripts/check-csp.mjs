// Comprueba que el HTML construido cumple la CSP de vercel.json: todo <script> inline ejecutable
// debe tener su hash en script-src y no puede haber manejadores on*="" ni URLs javascript:.
// Uso: node scripts/check-csp.mjs [carpeta-del-build]  (por defecto dist)
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const buildDir = process.argv[2] ?? join(root, 'dist');
const errors = [];

const config = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'));
const csp = (config.headers ?? [])
  .flatMap((rule) => rule.headers ?? [])
  .find((h) => h.key.toLowerCase() === 'content-security-policy')?.value;
if (!csp) {
  console.error('vercel.json no define Content-Security-Policy');
  process.exit(1);
}

const directives = Object.fromEntries(
  csp
    .split(';')
    .map((d) => d.trim().split(/\s+/))
    .filter(([name]) => name)
    .map(([name, ...values]) => [name, values]),
);
const scriptSrc = directives['script-src'] ?? directives['default-src'] ?? [];
if (scriptSrc.includes("'unsafe-inline'") || scriptSrc.includes("'unsafe-eval'")) {
  errors.push("script-src permite 'unsafe-inline' o 'unsafe-eval'");
}
const allowed = new Set(
  scriptSrc.filter((s) => s.startsWith("'sha256-")).map((s) => s.slice(1, -1)),
);
const used = new Set();

if (!existsSync(buildDir)) {
  console.error(`No existe ${buildDir}: ejecuta antes bun run build`);
  process.exit(1);
}
const pages = readdirSync(buildDir, { recursive: true })
  .map(String)
  .filter((f) => f.endsWith('.html'));
if (pages.length === 0) errors.push(`No hay ningún .html en ${buildDir}`);

for (const name of pages) {
  const html = readFileSync(join(buildDir, name), 'utf8');

  for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const src = attrs.match(/(?:^|\s)src\s*=\s*["']?([^\s"'>]+)/i)?.[1];
    if (src) {
      if (/^(https?:)?\/\//i.test(src)) errors.push(`${name}: script externo ${src}`);
      continue;
    }
    // Los bloques de datos (JSON-LD, plantillas) no se ejecutan ni pasan por la CSP.
    if (/(?:^|\s)type\s*=\s*["']?(application\/(ld\+)?json|text\/(plain|template))/i.test(attrs))
      continue;
    const hash = `sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}`;
    used.add(hash);
    if (!allowed.has(hash)) {
      errors.push(`${name}: script inline sin hash en script-src; hash esperado: '${hash}'`);
    }
  }

  const markup = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '');
  for (const [tag, handler] of markup.matchAll(/<[a-z][^>]*?[\s/](on[a-z]+)\s*=/gi)) {
    errors.push(`${name}: manejador ${handler}="" en ${tag.slice(0, 80)}`);
  }
  // style-src 'self': ni atributos style ni bloques <style> (el CSS va en ficheros de /_astro/).
  if (/<style\b/i.test(html.replace(/<!--[\s\S]*?-->/g, '')))
    errors.push(`${name}: bloque <style> en el HTML`);
  for (const [tag] of markup.matchAll(/<[a-z][^>]*?\sstyle\s*=/gi))
    errors.push(`${name}: atributo style en ${tag.slice(0, 80)}`);
  if (/\b(href|src|action|formaction)\s*=\s*["']?\s*javascript:/i.test(markup)) {
    errors.push(`${name}: URL javascript:`);
  }
}

for (const hash of allowed) {
  if (!used.has(hash))
    console.warn(`Aviso: el hash ${hash} de la CSP no corresponde a ningún script inline`);
}

if (errors.length) {
  console.error(errors.map((e) => `- ${e}`).join('\n'));
  process.exit(1);
}
console.log(
  `CSP correcta: ${pages.length} página(s), ${used.size} script(s) inline con hash en vercel.json`,
);
