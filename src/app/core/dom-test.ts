import { vi } from 'vitest';

/** Huecos de jsdom que las pruebas rellenan: `<dialog>` modal, lienzo 2D y scrollIntoView. */

/** jsdom no trae showModal() ni close(): reproducen lo que importa (atributo `open` y evento `close`). */
export function polyfillDialog() {
  const proto = HTMLDialogElement.prototype;
  proto.showModal = function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  };
  proto.close = function (this: HTMLDialogElement) {
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
}

/** Contexto 2D falso: cada método es un `vi.fn()` y recuerda los colores que se le asignan. */
export function fakeContext() {
  const strokes: string[] = [];
  const fills: string[] = [];
  const alphas: number[] = [];
  /** Todas las propiedades que se le han asignado (shadowBlur, lineWidth…). */
  const sets: Record<string, unknown[]> = {};
  const target: Record<string | symbol, unknown> = {
    canvas: { width: 0, height: 0 },
    createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  };
  const ctx = new Proxy(target, {
    get: (t, p) => (p in t ? t[p] : (t[p] = vi.fn())),
    set: (_t, p, v) => {
      (sets[String(p)] ??= []).push(v);
      if (p === 'strokeStyle') strokes.push(String(v));
      if (p === 'fillStyle') fills.push(String(v));
      if (p === 'globalAlpha') alphas.push(Number(v));
      return true;
    },
  });
  return { ctx: ctx as unknown as CanvasRenderingContext2D, strokes, fills, alphas, sets };
}

/**
 * El `getContext` que se le pide al lienzo (jsdom lo deja en null y avisa por consola). Si se dan
 * dos contextos, el canvas de clase `dots` recibe el segundo y los demás, el primero.
 */
export function stubCanvas(ctx: CanvasRenderingContext2D | null, dots = ctx) {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(function (
    this: HTMLCanvasElement,
  ) {
    return (this.classList.contains('dots') ? dots : ctx) as unknown as ReturnType<
      HTMLCanvasElement['getContext']
    >;
  } as HTMLCanvasElement['getContext']);
}

export function stubScrollIntoView() {
  const scroll = vi.fn();
  Element.prototype.scrollIntoView = scroll;
  return scroll;
}
