import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { SharedModule } from '../../shared/shared.module';
import { InicioRoutingModule } from '../inicio-routing.module';
@NgModule({
  declarations: [CrearUsuarioComponent, ConfiguracionComponent],
  imports: [CommonModule, SharedModule, InicioRoutingModule],
})
export class UsuariosModule {}
