import { createHash } from 'node:crypto';

/**
 * Términos vetados de la web, guardados solo como SHA-256 en hex (minúsculas) para que ni el
 * repositorio ni los registros de CI los contengan en claro.
 */
const VETOED = new Set([
  '8a011a57e663f18c0c1607d3e824769fe1f2037d2e52c340fa23e898894e8038',
  '56c856e38e9a948599a8a7827a0f84ec9a25bbef2ff601f6242d019fe3ffe441',
  'fbcc8dda03f67274a0cd191b6d25a9d40178ade02972a318c147142c7f69d85a',
  '50d7a64a8e0661ae7ef4af9fa3b545dbab8c482f8cd69419e92738282a4e2d3b',
  '5137e995498d3e2a763f789d80fe5cdc629d4c5f79d43ca7be3727b7025e2eb7',
  '8c6e8e8b9a0eb98305639756502e98756b16f2ee31ce90c2df072ca2e354ec08',
]);

const sha256 = (s: string) => createHash('sha256').update(s).digest('hex');

/**
 * Devuelve el hash abreviado de cada palabra de `text` que sea un término vetado. Se compara cada
 * palabra en minúsculas y también su prefijo de 5 letras, por los términos que son un prefijo.
 * Nunca devuelve el texto de la palabra, para que un fallo no lo imprima.
 */
export function vetoed(text: string): string[] {
  const found: string[] = [];
  for (const word of text.toLowerCase().split(/[^\p{L}\p{N}]+/u)) {
    for (const candidate of new Set([word, word.slice(0, 5)])) {
      const hash = sha256(candidate);
      if (word && VETOED.has(hash)) found.push(hash.slice(0, 8));
    }
  }
  return found;
}
