import { NgModule } from '@angular/core';
import { ModalModule } from './modal/modal.module';

@NgModule({
    declarations: [
    ],
    imports: [
        ModalModule,
    ],
    exports: [ModalModule],
    providers: [],
})
export class SharedModule { }
