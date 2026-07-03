import { Directive, ElementRef, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class Tilt {
  constructor(
    private el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;
    const node = this.el.nativeElement;
    const r = node.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    node.style.transform = `perspective(900px) rotateY(${(x * 8).toFixed(2)}deg) rotateX(${(-y * 8).toFixed(2)}deg) translateY(-4px)`;
    node.style.boxShadow = '0 18px 40px rgba(0,0,0,0.45), 0 0 24px rgba(79,219,200,0.15)';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    const node = this.el.nativeElement;
    node.style.transform = 'perspective(900px)';
    node.style.boxShadow = 'none';
  }
}
