import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [UsuariosModule, CrearUsuarioComponent, ConfiguracionComponent],
  imports: [CommonModule],
})
export class UsuariosModule {}
