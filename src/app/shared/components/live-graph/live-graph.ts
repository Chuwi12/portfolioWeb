import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  untracked,
  viewChild,
} from '@angular/core';
import { ThemeService } from '../../../core/theme';
import {
  BackgroundGraph,
  buildGraph,
  fadeAt,
  fadeRamp,
  GraphEdge,
  LANE_X,
  lanesFor,
  mulberry32,
} from './live-graph.model';

const FPS = 30;
/** Opacidad por tema: el claro necesita un poco más para sentirse igual de presente. */
const ALPHA = {
  dark: { line: 0.3, dot: 0.7 },
  light: { line: 0.2, dot: 0.5 },
};
const DOT_RADIUS = 4;
/** Estela: unos 50px de rama tras el commit, con el alfa bajando hasta cero. */
const TRAIL_LENGTH = 50;
const TRAIL_STEP = 3;
const TRAIL_POINTS = Math.ceil(TRAIL_LENGTH / TRAIL_STEP);
/** La estela se pinta en este número de trazos, de alfa creciente hacia la cabeza. */
const TRAIL_BANDS = 5;
/** Commits en tránsito por carril: casi siempre hay uno. */
const PER_LANE = 3;
/** Intensidad bajo la columna de contenido (1 en los márgenes): las ramas y, además, los commits. */
const FLOOR = { desktop: 0.45, phone: 0.5 };
const DOT_FLOOR = { desktop: 0.5, phone: 0.22 };
/** Los commits van en un lienzo a media resolución: son manchas suaves y cuesta 4 veces menos. */
const DOT_SCALE = 0.5;

interface Dot {
  edge: GraphEdge;
  /** Px recorridos dentro del tramo. */
  s: number;
  /** Px por segundo. */
  speed: number;
  /** 1 mientras vive; baja a 0 al llegar a un extremo sin salida. */
  life: number;
  /** Últimas posiciones del commit, de la más antigua a la más reciente: x0, y0, x1, y1… */
  trail: number[];
}

/**
 * Fondo ambiental: ramas tenues de un grafo a pantalla completa por las que viajan despacio
 * commits que se funden en otra rama. Solo en navegador; se apaga con la pestaña oculta y con
 * prefers-reduced-motion (queda un fotograma estático).
 */
@Component({
  selector: 'app-live-graph',
  template: `
    <canvas #lines class="lines" aria-hidden="true"></canvas>
    <canvas #dots class="dots" aria-hidden="true"></canvas>
  `,
  styleUrl: './live-graph.css',
})
export class LiveGraph implements AfterViewInit, OnDestroy {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly theme = inject(ThemeService);
  private readonly linesCanvas = viewChild.required<ElementRef<HTMLCanvasElement>>('lines');
  private readonly dotsCanvas = viewChild.required<ElementRef<HTMLCanvasElement>>('dots');

  private ctx: CanvasRenderingContext2D | null = null;
  private lines: CanvasRenderingContext2D | null = null;
  private graph!: BackgroundGraph;
  private lanes = 0;
  private dots: Dot[] = [];
  private colors = ['#14b8a6', '#14b8a6', '#14b8a6'];
  private rnd = mulberry32(2026);
  private w = 0;
  private h = 0;
  private dpr = 1;
  /** Ancho del margen de la página (el área de `.page` empieza ahí) y atenuación bajo ella. */
  private margin = 16;
  private floor = FLOOR.desktop;
  private dotFloor = DOT_FLOOR.desktop;
  private raf = 0;
  private last = 0;
  private spawnIn = 0;
  private running = false;
  private reducedQuery?: MediaQueryList;
  private resizeTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    // Al cambiar de tema, los carriles pasan a los colores del nuevo.
    effect(() => {
      this.theme.dark();
      untracked(() => {
        if (!this.ctx) return;
        this.readColors();
        this.drawLines();
        if (!this.running) this.paint();
      });
    });
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    this.lines = this.linesCanvas().nativeElement.getContext('2d');
    this.ctx = this.dotsCanvas().nativeElement.getContext('2d');
    if (!this.lines || !this.ctx) return; // jsdom y navegadores sin canvas: sin fondo, sin error.

    this.readColors();
    this.measure(true);
    window.addEventListener('resize', this.onResize);
    document.addEventListener('visibilitychange', this.onVisibility);
    this.reducedQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    this.reducedQuery?.addEventListener?.('change', this.onVisibility);
    this.onVisibility();
  }

  ngOnDestroy() {
    this.stop();
    clearTimeout(this.resizeTimer);
    window.removeEventListener?.('resize', this.onResize);
    document.removeEventListener?.('visibilitychange', this.onVisibility);
    this.reducedQuery?.removeEventListener?.('change', this.onVisibility);
  }

  private get reduced() {
    return !!this.reducedQuery?.matches;
  }

  private readonly onResize = () => {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => this.measure(false), 150);
  };

  /** Anima solo con la pestaña visible y sin reduced-motion; si no, un fotograma estático. */
  private readonly onVisibility = () => {
    if (document.hidden) return this.stop();
    if (this.reduced) {
      this.stop();
      this.paint();
    } else {
      this.start();
    }
  };

  private readColors() {
    const style = getComputedStyle(document.documentElement);
    this.colors = this.colors.map(
      (fallback, i) => style.getPropertyValue(`--color-lane-${i}`).trim() || fallback,
    );
  }

  /** Ajusta el lienzo a la ventana (DPR máx. 2) y recalcula el diseño. */
  private measure(first: boolean) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    // La barra de direcciones de los móviles cambia el alto al hacer scroll: no es un resize.
    if (!first && Math.abs(w - this.w) < 2 && Math.abs(h - this.h) < 150) return;
    this.w = w;
    this.h = h;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pad = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--page-pad'),
    );
    this.margin = Math.max(pad || 16, (w - 1440) / 2 + (pad || 16));
    const phone = w < 640;
    this.floor = phone ? FLOOR.phone : FLOOR.desktop;
    this.dotFloor = phone ? DOT_FLOOR.phone : DOT_FLOOR.desktop;
    const lines = this.linesCanvas().nativeElement;
    lines.width = Math.round(w * this.dpr);
    lines.height = Math.round(h * this.dpr);
    const dots = this.dotsCanvas().nativeElement;
    dots.width = Math.round(w * DOT_SCALE);
    dots.height = Math.round(h * DOT_SCALE);

    const lanes = lanesFor(w);
    if (lanes !== this.lanes) {
      this.lanes = lanes;
      this.rnd = mulberry32(2026);
      this.graph = buildGraph(lanes, this.rnd);
      this.dots = [];
    }
    for (const edge of this.graph.edges) edge.len = this.length(edge);
    if (!this.dots.length) this.seed();
    for (const dot of this.dots) {
      dot.s = Math.min(dot.s, dot.edge.len);
      this.backfill(dot);
    }

    this.drawLines();
    if (!this.running) this.paint();
  }

  private get alpha() {
    return this.theme.dark() ? ALPHA.dark : ALPHA.light;
  }

  private x(lane: number) {
    return LANE_X[this.lanes][lane] * this.w;
  }

  private length(e: GraphEdge) {
    const dy = (e.to.y - e.from.y) * this.h;
    return e.curve ? Math.hypot(this.x(e.to.lane) - this.x(e.from.lane), dy) * 1.08 : dy;
  }

  /** Las líneas no cambian entre fotogramas: se pintan al medir o al cambiar de tema, no en el bucle. */
  private drawLines() {
    const g = this.lines;
    if (!g) return;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.clearRect(0, 0, g.canvas.width, g.canvas.height);
    g.scale(this.dpr, this.dpr);
    g.lineWidth = 1.5;
    g.globalAlpha = this.alpha.line;
    for (const e of this.graph.edges) {
      g.strokeStyle = this.colors[e.to.lane % 3];
      g.beginPath();
      const [xa, ya] = [this.x(e.from.lane), e.from.y * this.h];
      const [xb, yb] = [this.x(e.to.lane), e.to.y * this.h];
      g.moveTo(xa, ya);
      if (e.curve) g.bezierCurveTo(xa, ya + (yb - ya) / 2, xb, yb - (yb - ya) / 2, xb, yb);
      else g.lineTo(xb, yb);
      g.stroke();
    }

    // La atenuación bajo el contenido se hornea una vez aquí: una máscara CSS cuesta en cada fotograma.
    g.globalAlpha = 1;
    g.globalCompositeOperation = 'destination-in';
    const mask = g.createLinearGradient(0, 0, this.w, 0);
    const ramp = fadeRamp(this.margin);
    const stops = [
      [0, 1],
      [(this.margin - ramp) / this.w, 1],
      [this.margin / this.w, this.floor],
      [1 - this.margin / this.w, this.floor],
      [1 - (this.margin - ramp) / this.w, 1],
      [1, 1],
    ];
    for (const [at, a] of stops) mask.addColorStop(at, `rgba(0, 0, 0, ${a})`);
    g.fillStyle = mask;
    g.fillRect(0, 0, this.w, this.h);
    g.globalCompositeOperation = 'source-over';
  }

  /** Commits repartidos de entrada, para que el fondo no empiece vacío. */
  private seed() {
    const visible = this.graph.edges.filter((e) => e.from.y < 1 && e.to.y > 0);
    for (let i = 0; i < this.lanes * PER_LANE; i++) {
      const edge = visible[Math.floor(this.rnd() * visible.length)];
      const dot = this.dot(edge, this.rnd() * edge.len);
      this.backfill(dot);
      this.dots.push(dot);
    }
  }

  private dot(edge: GraphEdge, s = 0): Dot {
    return { edge, s, speed: 20 + this.rnd() * 20, life: 1, trail: [] };
  }

  /** Estela inicial de un commit que ya va por la rama: los tramos de atrás en su mismo tramo. */
  private backfill(dot: Dot) {
    dot.trail = [];
    for (let back = TRAIL_LENGTH; back > 0; back -= TRAIL_STEP) {
      if (dot.s - back >= 0) dot.trail.push(...this.at(dot.edge, dot.s - back));
    }
  }

  /** Cada TRAIL_STEP px de avance deja un punto; el más viejo sale por el otro extremo. */
  private extendTrail(dot: Dot) {
    const [x, y] = this.point(dot);
    const t = dot.trail;
    const n = t.length;
    if (n >= 2 && Math.hypot(x - t[n - 2], y - t[n - 1]) < TRAIL_STEP) return;
    t.push(x, y);
    if (t.length > TRAIL_POINTS * 2) t.splice(0, 2);
  }

  private step(dt: number) {
    for (const dot of this.dots) {
      if (dot.life < 1) {
        dot.life -= dt / 1.5;
        continue;
      }
      dot.s += dot.speed * dt;
      while (dot.s >= dot.edge.len) {
        const next = dot.edge.to.out;
        if (!next.length) {
          dot.life = 0.99; // llegó al final de una rama: se desvanece
          break;
        }
        // En una fusión o bifurcación sigue por uno de los caminos y se funde en esa rama.
        dot.s -= dot.edge.len;
        dot.edge = next[Math.floor(this.rnd() * next.length)];
      }
      this.extendTrail(dot);
    }
    this.dots = this.dots.filter((d) => d.life > 0);

    this.spawnIn -= dt;
    if (this.spawnIn <= 0 && this.dots.length < this.lanes * PER_LANE) {
      const sources = this.graph.sources;
      this.dots.push(this.dot(sources[Math.floor(this.rnd() * sources.length)].out[0]));
      this.spawnIn = 0.8 + this.rnd() * 1.4;
    }
  }

  private point(dot: Dot): [number, number] {
    return this.at(dot.edge, dot.s);
  }

  /** Posición a `s` px del inicio de un tramo. */
  private at(e: GraphEdge, s: number): [number, number] {
    const [xa, ya] = [this.x(e.from.lane), e.from.y * this.h];
    if (!e.curve) return [xa, ya + s];
    const [xb, yb] = [this.x(e.to.lane), e.to.y * this.h];
    const t = e.len ? s / e.len : 0;
    const u = 1 - t;
    const half = (yb - ya) / 2;
    // Bézier cúbica con tangentes verticales en los dos extremos, como las curvas del grafo.
    return [
      u ** 3 * xa + 3 * u * u * t * xa + 3 * u * t * t * xb + t ** 3 * xb,
      u ** 3 * ya + 3 * u * u * t * (ya + half) + 3 * u * t * t * (yb - half) + t ** 3 * yb,
    ];
  }

  /** Intensidad de un commit (o su estela) en la columna `x`: la de las ramas por la de los commits. */
  private dotFade(x: number) {
    return (
      fadeAt(x, this.w, this.margin, this.floor) * fadeAt(x, this.w, this.margin, this.dotFloor)
    );
  }

  private paint() {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.scale(DOT_SCALE, DOT_SCALE);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const dot of this.dots) {
      const [x, y] = this.point(dot);
      if (y < -TRAIL_LENGTH || y > this.h + TRAIL_LENGTH) continue;
      const alpha = this.alpha.dot * Math.min(1, dot.life);
      // Los commits van siempre en el color más vivo del tema; las ramas, cada una en el suyo.
      const color = this.colors[0];
      ctx.strokeStyle = color;
      ctx.fillStyle = color;

      // Estela: la polilínea se parte en tramos cuyo alfa baja de la cabeza a la cola, sin sombras ni
      // halos. Unos pocos trazos largos en vez de uno por segmento: el bucle corre 30 veces por segundo.
      const points = [...dot.trail, x, y];
      const last = points.length / 2 - 1;
      for (let k = 0; k < TRAIL_BANDS; k++) {
        const from = Math.floor((k * last) / TRAIL_BANDS);
        const to = Math.floor(((k + 1) * last) / TRAIL_BANDS);
        if (to <= from) continue;
        ctx.globalAlpha = alpha * ((k + 1) / (TRAIL_BANDS + 1)) * this.dotFade(points[2 * to]);
        ctx.beginPath();
        ctx.moveTo(points[2 * from], points[2 * from + 1]);
        for (let i = from + 1; i <= to; i++) ctx.lineTo(points[2 * i], points[2 * i + 1]);
        ctx.stroke();
      }
      ctx.globalAlpha = alpha * this.dotFade(x);
      ctx.beginPath();
      ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  private readonly frame = (now: number) => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.frame);
    if (now - this.last < 1000 / FPS - 3) return;
    const dt = Math.min((now - this.last) / 1000, 0.1);
    this.last = now;
    this.step(dt);
    this.paint();
  };

  private start() {
    if (this.running || !window.requestAnimationFrame) return;
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }
}
