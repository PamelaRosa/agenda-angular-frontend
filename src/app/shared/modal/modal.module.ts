import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalDraggableDirective } from './modal-draggable.directive';
import { ModalComponent } from './modal.component';

@NgModule({
    declarations: [ModalComponent, ModalDraggableDirective],
    imports: [CommonModule],
    exports: [ModalComponent]
})

export class ModalModule {}