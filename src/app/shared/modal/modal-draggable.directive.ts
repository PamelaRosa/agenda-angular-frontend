import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';

// Código original: https://gist.github.com/markleusink/7af171d5f17e7dc9714e69965fdabab9

@Directive({
    selector: '[appModalDraggable]'
})
export class ModalDraggableDirective implements AfterViewInit {
    @Input('appModalDraggable') isDraggable: boolean;
    private modalElement: HTMLElement;
    private topStart: number;
    private leftStart: number;
    private isBeingDragged: boolean;
    private handleElement: HTMLElement;

    constructor(public element: ElementRef) { }

    ngAfterViewInit() {
        if (!this.isDraggable) {
            return;
        }
        let element = this.element.nativeElement;

        // only make the modal header draggable
        this.handleElement = this.element.nativeElement;

        // change cursor on the header
        this.handleElement.style.cursor = 'move';

        // get the modal parent container element: that's the element we're going to move around
        for (let level = 3; level > 0; level--) {
            element = element.parentNode;
        }

        this.modalElement = element;
        this.modalElement.style.position = 'relative';
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
        if (event.button === 2 || (this.handleElement && event.target !== this.handleElement) || !this.isDraggable) {
            return; // prevents right click drag
        }

        // enable dragging
        this.isBeingDragged = true;

        // store original position
        this.topStart = event.clientY - Number(this.modalElement.style.top.replace('px', ''));
        this.leftStart = event.clientX - Number(this.modalElement.style.left.replace('px', ''));
        event.preventDefault();
    }

    @HostListener('document:mouseup', ['$event'])
    onMouseUp(event: MouseEvent) {
        this.isBeingDragged = false;
    }

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        if (this.isBeingDragged && this.isDraggable) {
            // on moving the mouse, reposition the modal
            this.modalElement.style.top = event.clientY - this.topStart + 'px';
            this.modalElement.style.left = event.clientX - this.leftStart + 'px';
        }
    }

    @HostListener('document:mouseleave', ['$event'])
    onMouseLeave(event: MouseEvent) {
        this.isBeingDragged = false;
    }
}