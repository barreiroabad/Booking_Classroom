import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared/shared.module';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { CrearUsuarioComponent } from './components/inicio/usuarios/crear-usuario/crear-usuario.component';




@NgModule({
  declarations: [AppComponent, LoginComponent, CrearUsuarioComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
