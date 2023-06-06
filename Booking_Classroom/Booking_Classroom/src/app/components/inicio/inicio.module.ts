import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InicioComponent } from './inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PrincipalComponent } from './principal/principal.component';
import { MisReservasComponent } from './mis-reservas/mis-reservas.component';
import { ReservarClaseComponent } from './reservar-clase/reservar-clase.component';
import { CrearClaseComponent } from './crear-clase/crear-clase.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ConfiguracionComponent } from './usuarios/configuracion/configuracion.component';


@NgModule({
  declarations: [
    InicioComponent,
    NavbarComponent,
    PrincipalComponent,
    MisReservasComponent,
    ReservarClaseComponent,
    CrearClaseComponent,
    UsuariosComponent,
    ConfiguracionComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    SharedModule
  ]
})
export class InicioModule { }
