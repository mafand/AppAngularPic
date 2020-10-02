import { Directive, ElementRef, HostListener, Renderer, Input } from '@angular/core';

@Directive({
    selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective {

    @Input() brightness = '70%';

    //ElementRef. Elemento no DOM no qual a diretiva esta adicionada
    constructor(
        private el: ElementRef,
        private render: Renderer
    ) {

    }

    //Bind de evento do elemento no qual a diretiva esta adicionada
    @HostListener('mouseover')
    darkenOn() {
        this.render.setElementStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`)
    }

    @HostListener('mouseleave')
    darkenOff() {
        this.render.setElementStyle(this.el.nativeElement, 'filter', 'brightness(100%)')
    }

}