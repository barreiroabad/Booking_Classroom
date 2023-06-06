import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InicioComponent } from './inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PrincipalComponent } from './principal/principal.component';


@NgModule({
  declarations: [
    InicioComponent,
    NavbarComponent,
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    SharedModule
  ]
})
export class InicioModule { }
