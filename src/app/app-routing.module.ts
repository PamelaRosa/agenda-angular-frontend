import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContatoComponent } from './components/contato/contato.component';


const routes: Routes = [
  {path: '', component: ContatoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
