import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input('appHighlight') color?: string;

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = '';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.color || '#005dbb1a');
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
