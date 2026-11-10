/**
 * Demo del verificador: el modelo escribe, el verificador tacha la cifra inventada y da su veredicto.
 * Se queda en el estado final con `prefers-reduced-motion: reduce` o si el visitante la pausa con su
 * botón (WCAG 2.2.2); si cambia cualquiera de las dos cosas, se detiene o arranca de nuevo.
 */
export function startDemo(demo: HTMLElement): void {
  const tokens = [...demo.querySelectorAll<HTMLElement>('.tok')];
  const bad = demo.querySelector<HTMLElement>('.bad');
  const verdict = demo.querySelector<HTMLElement>('.verdict');
  if (!bad || !verdict) return;
  const marked = [...tokens, bad, verdict];

  let inView = true;
  /** Bucles esperando a que la demo vuelva a estar a la vista (o a que los cancelen). */
  const wakers = new Set<() => void>();
  const active = () => inView && !document.hidden;
  const wakeAll = () => {
    for (const wake of wakers) wake();
    wakers.clear();
  };
  const resume = () => {
    if (active()) wakeAll();
  };
  new IntersectionObserver((entries) => {
    inView = !!entries.at(-1)?.isIntersecting;
    resume();
  }).observe(demo);
  document.addEventListener('visibilitychange', resume);

  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const button = demo.querySelector<HTMLButtonElement>('.pause');
  let paused = false;
  /** Cada arranque tiene su número: al cambiar de estado, el bucle anterior se corta solo. */
  let run = 0;

  /** Espera `ms`; si la demo está fuera de pantalla o la pestaña oculta, se queda parada. Vuelve en
   *  cuanto el bucle `id` deja de ser el actual. */
  const wait = async (ms: number, id: number) => {
    await new Promise((r) => setTimeout(r, ms));
    while (id === run && !active()) await new Promise<void>((r) => wakers.add(r));
  };

  async function play(id: number): Promise<void> {
    // La primera vuelta espera a que se abra la tela del piso 1 (la demo está debajo).
    let first = true;
    while (id === run) {
      for (const el of marked) el.classList.remove('on', 'flag');
      await wait(first ? 1900 : 500, id);
      first = false;
      for (const t of tokens) {
        if (id !== run) return;
        t.classList.add('on');
        await wait(65, id);
      }
      await wait(450, id);
      if (id !== run) return;
      bad?.classList.add('flag');
      await wait(300, id);
      if (id !== run) return;
      verdict?.classList.add('on');
      await wait(9000, id);
    }
  }

  const sync = () => {
    run++;
    wakeAll();
    const idle = motion.matches || paused;
    demo.classList.toggle('is-live', !idle);
    demo.classList.toggle('is-paused', paused);
    // Con movimiento reducido la demo ya está quieta: el botón no haría nada.
    if (button) button.hidden = motion.matches;
    // En reposo se ve el estado final, con la cifra tachada aunque el bucle se cortara a medias.
    if (idle) bad.classList.add('flag');
    else void play(run);
  };

  motion.addEventListener('change', sync);
  button?.addEventListener('click', () => {
    paused = !paused;
    button.setAttribute('aria-pressed', String(paused));
    sync();
  });
  sync();
}
