import { Component, Input, Output, TemplateRef, ViewChild, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
})

export class ModalComponent implements OnInit, OnDestroy {
    constructor(private modalService: BsModalService) { }
    @Input() title: string;

    // Texto do botão de ação principal do modal (exemplo: Salvar)
    @Input() action: string;

    // Texto do botão secundário usado para fechar o modal (exemplo: Cancelar)
    @Input() cancel: string;

    // Tamanho do modal, pode ser modal-xl(extra grande), 'modal-lg' (grande), 'modal-sm' (pequeno) ou vazio (medio)
    @Input()
    private _size: string;
    public get size(): string {
        return this._size;
    }
    public set size(value: string) {
        this._size = value;
    }

    // Define se o modal deve ser fechável ou não
    @Input() closeable = true;

    // Define se o modal é arrastável
    @Input() draggable = false;

    @Output() close: EventEmitter<any> = new EventEmitter();
    @Output() submit: EventEmitter<any> = new EventEmitter();

    // Recebe um subject para criar um orbeservable que recebe comandos
    @Input() subjectComandos?: Subject<any>;

    @ViewChild('template') template: TemplateRef<any>;

    subs: Subscription;

    modalRef: BsModalRef;
    config = {
        backdrop: true,
        ignoreBackdropClick: null,
        class: this.size,
        keyboard: null
    };
    ngOnInit(): void {
        if (this.subjectComandos != null) {
            this.subs = this.subjectComandos.subscribe(comando => {
                if (comando == 'fechar') {
                    this.hide();
                }
            });
        }

        this.config.class = this.size;
        this.config.ignoreBackdropClick = !this.closeable;
        this.config.keyboard = this.closeable;
    }
    ngOnDestroy(): void {
        if (this.subs != null) {
            this.subs.unsubscribe();
        } // se desinscreve do observable
    }

    open() {
        this.modalRef = this.modalService.show(this.template, this.config);
    }

    hide() {
        this.modalRef.hide();
    }

    cancelWasClicked() {
        this.hide();
        this.close.emit();
    }

    submitWasClicked() {
        this.submit.emit(this);
    }
}