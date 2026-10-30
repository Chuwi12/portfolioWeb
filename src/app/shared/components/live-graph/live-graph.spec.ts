import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fakeContext, stubCanvas } from '../../../core/dom-test';
import { ThemeService } from '../../../core/theme';
import {
  buildGraph,
  FADE_RAMP,
  fadeAt,
  fadeRamp,
  GraphNode,
  LANE_X,
  lanesFor,
  mulberry32,
} from './live-graph.model';
import { LiveGraph } from './live-graph';

describe('LiveGraph (componente)', () => {
  let fixture: ComponentFixture<LiveGraph>;

  afterEach(() => {
    fixture?.destroy();
    vi.restoreAllMocks();
    document.documentElement.classList.remove('dark');
    document.documentElement.removeAttribute('style');
    for (const name of ['requestAnimationFrame', 'cancelAnimationFrame', 'matchMedia']) {
      Reflect.deleteProperty(window, name);
    }
    Reflect.deleteProperty(document, 'hidden');
  });

  it('se crea en jsdom sin lanzar aunque no haya canvas (getContext devuelve null)', async () => {
    stubCanvas(null);
    fixture = TestBed.createComponent(LiveGraph);
    expect(() => fixture.detectChanges()).not.toThrow();
    await fixture.whenStable();
    const canvases = [...fixture.nativeElement.querySelectorAll('canvas')];
    expect(canvases).toHaveLength(2);
    expect(canvases.every((c) => c.getAttribute('aria-hidden') === 'true')).toBe(true);
    expect(() => fixture.destroy()).not.toThrow();
  });

  describe('con un contexto 2D', () => {
    type Frame = (now: number) => void;
    let raf: ReturnType<typeof vi.fn>;
    let cancel: ReturnType<typeof vi.fn>;
    /** Contexto del lienzo de ramas y del de commits (clase `dots`). */
    let fake: ReturnType<typeof fakeContext>;
    let dots: ReturnType<typeof fakeContext>;
    let frames: Frame[];
    const calls = (g: ReturnType<typeof fakeContext>, method: keyof CanvasRenderingContext2D) =>
      (g.ctx[method] as unknown as ReturnType<typeof vi.fn>).mock.calls.length;
    const arcs = () => calls(dots, 'arc');
    /** Alfas con los que se pinta de verdad (se descarta el 1 con que se restablece al acabar). */
    const painted = (g: ReturnType<typeof fakeContext>) => g.alphas.filter((a) => a > 0 && a < 1);
    /** Lanza los fotogramas pendientes (también los del planificador de Angular, que usa rAF). */
    const runFrames = (now: number) => frames.splice(0).forEach((cb) => cb(now));

    beforeEach(() => {
      fake = fakeContext();
      dots = fakeContext();
      stubCanvas(fake.ctx, dots.ctx);
      frames = [];
      raf = vi.fn((cb: Frame) => (frames.push(cb), 7));
      cancel = vi.fn();
      Object.assign(window, { requestAnimationFrame: raf, cancelAnimationFrame: cancel });
      document.documentElement.style.setProperty('--color-lane-0', '#aa0000');
      document.documentElement.style.setProperty('--color-lane-1', '#00aa00');
      document.documentElement.style.setProperty('--color-lane-2', '#0000aa');
    });

    const create = () => {
      fixture = TestBed.createComponent(LiveGraph);
      fixture.detectChanges();
    };
    const hide = (hidden: boolean) => {
      Object.defineProperty(document, 'hidden', { value: hidden, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    };

    it('pinta las ramas con los colores de los carriles y anima los commits con rAF', () => {
      create();
      expect(new Set(fake.strokes)).toEqual(new Set(['#aa0000', '#00aa00', '#0000aa']));
      const painted = arcs();
      expect(painted).toBeGreaterThan(0);
      runFrames(performance.now() + 100);
      expect(arcs()).toBeGreaterThan(painted);
    });

    it('la atenuación bajo el contenido va horneada en el lienzo de ramas, no en una máscara CSS', () => {
      create();
      expect(fake.ctx.createLinearGradient).toHaveBeenCalledWith(0, 0, window.innerWidth, 0);
      expect(fake.sets['globalCompositeOperation']).toEqual(['destination-in', 'source-over']);
      expect(calls(fake, 'fillRect')).toBe(1);
    });

    it('hay casi siempre un commit en tránsito por carril', () => {
      create();
      // jsdom mide 1024×768: 4 carriles y 3 commits por carril, y los de fuera de pantalla no se pintan.
      expect(arcs()).toBeGreaterThanOrEqual(6);
    });

    it('cada commit deja una estela que se desvanece, sin sombras ni halos', () => {
      create();
      runFrames(performance.now() + 100);
      expect(calls(dots, 'lineTo')).toBeGreaterThan(arcs());
      const alphas = painted(dots);
      expect(new Set(alphas.map((a) => a.toFixed(3))).size).toBeGreaterThan(5);
      expect(Math.max(...alphas)).toBeLessThanOrEqual(0.5);
      expect(Math.min(...alphas)).toBeLessThan(0.15);
      for (const prop of ['shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY']) {
        expect(dots.sets[prop], prop).toBeUndefined();
        expect(fake.sets[prop], prop).toBeUndefined();
      }
    });

    it('ajusta la opacidad por tema: claro 20 % y 50 %, oscuro 30 % y 70 %', () => {
      create();
      expect(fake.alphas).toContain(0.2);
      expect(Math.max(...painted(dots))).toBeLessThanOrEqual(0.5);
      fake.alphas.length = 0;
      dots.alphas.length = 0;
      TestBed.inject(ThemeService).toggle();
      fixture.detectChanges();
      runFrames(performance.now() + 100);
      expect(fake.alphas).toContain(0.3);
      expect(Math.max(...painted(dots))).toBeLessThanOrEqual(0.7);
    });

    it('limita el ritmo: dos fotogramas seguidos pintan solo uno', () => {
      create();
      runFrames(performance.now() + 100);
      const painted = arcs();
      runFrames(performance.now() + 105);
      expect(arcs()).toBe(painted);
    });

    it('se pausa con la pestaña oculta y reanuda al volver', () => {
      create();
      hide(true);
      expect(cancel).toHaveBeenCalledWith(7);
      runFrames(performance.now() + 100);
      const painted = arcs();
      runFrames(performance.now() + 200);
      expect(arcs()).toBe(painted);
      hide(false);
      runFrames(performance.now() + 400);
      expect(arcs()).toBeGreaterThan(painted);
    });

    it('con prefers-reduced-motion no anima: deja un fotograma estático', () => {
      Object.defineProperty(window, 'matchMedia', {
        value: () => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }),
        configurable: true,
      });
      create();
      const painted = arcs();
      expect(painted).toBeGreaterThan(0);
      expect(calls(fake, 'stroke')).toBeGreaterThan(0);
      runFrames(performance.now() + 1000);
      expect(arcs()).toBe(painted);
    });

    it('relee los colores y repinta las ramas al cambiar de tema', () => {
      create();
      fake.strokes.length = 0;
      document.documentElement.style.setProperty('--color-lane-0', '#112233');
      TestBed.inject(ThemeService).toggle();
      fixture.detectChanges();
      expect(fake.strokes).toContain('#112233');
    });

    it('al destruirse cancela el rAF y quita sus listeners', () => {
      const removeWindow = vi.spyOn(window, 'removeEventListener');
      const removeDoc = vi.spyOn(document, 'removeEventListener');
      create();
      fixture.destroy();
      expect(cancel).toHaveBeenCalledWith(7);
      expect(removeWindow).toHaveBeenCalledWith('resize', expect.any(Function));
      expect(removeDoc).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
    });
  });
});

describe('buildGraph', () => {
  const nodes = (graph: ReturnType<typeof buildGraph>) => {
    const all = new Set<GraphNode>();
    for (const e of graph.edges) all.add(e.from).add(e.to);
    return [...all];
  };

  it.each([3, 4, 5])(
    'con %i carriles solo baja y cada rama termina fuera de la pantalla',
    (lanes) => {
      const graph = buildGraph(lanes, mulberry32(2026));
      expect(graph.edges.every((e) => e.to.y > e.from.y)).toBe(true);
      expect(graph.sources.every((s) => s.y < 0 && s.out.length === 1)).toBe(true);
      const sinks = nodes(graph).filter((n) => n.out.length === 0);
      expect(sinks.length).toBeGreaterThan(0);
      expect(sinks.every((n) => n.y >= 1.3)).toBe(true);
      // Las curvas solo unen carriles vecinos y hay al menos una bifurcación y una fusión.
      const curves = graph.edges.filter((e) => e.curve);
      expect(curves.every((e) => Math.abs(e.to.lane - e.from.lane) === 1)).toBe(true);
      expect(curves.length).toBeGreaterThanOrEqual(3);
      expect(nodes(graph).some((n) => n.out.length > 1)).toBe(true);
    },
  );

  it('el diseño es determinista y los carriles caben según el ancho', () => {
    const a = buildGraph(5, mulberry32(2026));
    const b = buildGraph(5, mulberry32(2026));
    expect(a.edges.map((e) => [e.from.lane, e.from.y, e.to.lane, e.to.y])).toEqual(
      b.edges.map((e) => [e.from.lane, e.from.y, e.to.lane, e.to.y]),
    );
    expect([lanesFor(390), lanesFor(768), lanesFor(1440)]).toEqual([3, 4, 5]);
    for (const lanes of [3, 4, 5]) expect(LANE_X[lanes]).toHaveLength(lanes);
  });
});

describe('fadeAt', () => {
  const [width, margin, floor] = [1440, 64, 0.45];

  it('deja el fondo entero en los márgenes y a `floor` bajo la columna de contenido', () => {
    expect(fadeAt(0, width, margin, floor)).toBe(1);
    expect(fadeAt(50, width, margin, floor)).toBe(1);
    expect(fadeAt(width - 40, width, margin, floor)).toBe(1);
    for (const x of [margin, 226, 720, 1051, width - margin]) {
      expect(fadeAt(x, width, margin, floor), `x=${x}`).toBe(floor);
    }
  });

  it('la rampa cae dentro del margen y es simétrica: el texto nunca está en ella', () => {
    expect(fadeAt(margin - FADE_RAMP / 2, width, margin, floor)).toBeCloseTo((1 + floor) / 2);
    expect(fadeAt(width - margin + FADE_RAMP / 2, width, margin, floor)).toBeCloseTo(
      (1 + floor) / 2,
    );
    expect(fadeAt(margin - FADE_RAMP, width, margin, floor)).toBe(1);
    // Sin salirse del margen: la columna de contenido empieza en `margin`.
    expect(fadeAt(margin + 1, width, margin, floor)).toBe(floor);
  });

  it('los carriles de los extremos caen dentro del margen de su ancho de pantalla', () => {
    for (const [w, pad] of [
      [390, 16],
      [768, 32],
      [1440, 64],
      [1024, 64],
    ] as const) {
      const lanes = LANE_X[lanesFor(w)];
      const margin = Math.max(pad, (w - 1440) / 2 + pad);
      // En la zona entera (o a lo sumo 2px dentro de la rampa).
      const full = margin - fadeRamp(margin) + 2;
      expect(lanes[0] * w, `${w}px izq`).toBeLessThanOrEqual(full);
      expect(lanes.at(-1)! * w, `${w}px dcha`).toBeGreaterThanOrEqual(w - full);
    }
  });
});
