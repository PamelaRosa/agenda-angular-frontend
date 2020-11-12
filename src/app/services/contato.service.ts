import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from '../models/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private http: HttpClient) { }

  baseURL = 'http://localhost:3000/contatos';

  listarContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.baseURL);
  }
}

