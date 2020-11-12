import { Component, OnInit } from '@angular/core';
import { Contato } from 'src/app/models/contato';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  contatos: Contato[];

  constructor(private contatoService: ContatoService) { }

  ngOnInit(): void {
    this.contatoService.listarContatos().subscribe((contato) => (this.contatos = contato));
  }

}
