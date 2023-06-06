import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { PrincipalComponent } from './principal/principal.component';
import { MisReservasComponent } from './mis-reservas/mis-reservas.component';
import { ReservarClaseComponent } from './reservar-clase/reservar-clase.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrearClaseComponent } from './crear-clase/crear-clase.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { ConfiguracionComponent } from './usuarios/configuracion/configuracion.component';

const routes: Routes = [
  {path: '', redirectTo: 'principal', pathMatch: 'full'},
  {
    path: '',
    component: InicioComponent,
    children: [
      { path: 'principal', component: PrincipalComponent },
      { path: 'mis-reservas', component: MisReservasComponent },
      { path: 'reservar-clase', component: ReservarClaseComponent },
      { path: 'usuarios', component: UsuariosComponent, children: [
        { path: 'crear-usuario', component: CrearUsuarioComponent, pathMatch: 'full',},
        { path: 'configuracion', component: ConfiguracionComponent, pathMatch: 'full',}
      ] },
      { path: 'crear-clase', component: CrearClaseComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioRoutingModule {}
