import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { PrincipalComponent } from './principal/principal.component';
import { MisReservasComponent } from './mis-reservas/mis-reservas.component';
import { ReservarClaseComponent } from './reservar-clase/reservar-clase.component';
import { CrearClaseComponent } from './crear-clase/crear-clase.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { ConfiguracionComponent } from './usuarios/configuracion/configuracion.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
   { path: '', redirectTo: 'principal', pathMatch: 'full' },
  {
    path: '',
    component: InicioComponent,
    children: [
      {
        path: 'principal',
        component: PrincipalComponent,
        ...canActivate(redirectUnauthorizedToLogin),
      },
      {
        path: 'mis-reservas',
        component: MisReservasComponent,
        ...canActivate(redirectUnauthorizedToLogin),
      },
      {
        path: 'reservar-clase',
        component: ReservarClaseComponent,
        ...canActivate(redirectUnauthorizedToLogin),
      },

      {
        path: 'crear-usuario',
        component: CrearUsuarioComponent,
        pathMatch: 'full',
      },
      {
        path: 'configuracion',
        component: ConfiguracionComponent,
        pathMatch: 'full',
        ...canActivate(redirectUnauthorizedToLogin),
      },

      {
        path: 'crear-clase',
        component: CrearClaseComponent,
        ...canActivate(redirectUnauthorizedToLogin),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioRoutingModule {}
