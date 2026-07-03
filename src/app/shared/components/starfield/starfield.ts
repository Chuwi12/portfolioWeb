import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-starfield',
  standalone: true,
  template: `<canvas #canvas class="fixed inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true"></canvas>`
})
export class Starfield implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private stars: { x: number; y: number; z: number }[] = [];
  private raf = 0;
  private ro?: ResizeObserver;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const seed = () => {
      const n = Math.max(120, Math.min(500, Math.round((canvas.width * canvas.height) / 9000)));
      this.stars = Array.from({ length: n }, () => ({
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: Math.random()
      }));
    };

    resize();
    seed();

    this.ro = new ResizeObserver(() => { resize(); seed(); });
    this.ro.observe(document.body);

    const draw = () => {
      const { width: w, height: h } = canvas;
      this.ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2, f = Math.min(w, h) * 0.9;

      for (const s of this.stars) {
        s.z -= 0.0016;
        if (s.z <= 0.02) {
          s.z = 1;
          s.x = (Math.random() - 0.5) * 2;
          s.y = (Math.random() - 0.5) * 2;
        }
        const px = cx + (s.x / s.z) * f * 0.5;
        const py = cy + (s.y / s.z) * f * 0.5;
        if (px < 0 || px > w || py < 0 || py > h) continue;

        const size = (1 - s.z) * 2.4 + 0.3;
        const alpha = (1 - s.z) * 0.85 + 0.1;
        this.ctx.beginPath();
        this.ctx.arc(px, py, size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(79, 219, 200, ${alpha.toFixed(2)})`;
        this.ctx.fill();
      }
      this.raf = requestAnimationFrame(draw);
    };
    this.raf = requestAnimationFrame(draw);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.ro?.disconnect();
  }
}
