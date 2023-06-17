import { Component, OnInit } from '@angular/core';
import { ObservableInput, catchError, finalize, of, switchMap, tap } from 'rxjs';
import { Administradores } from 'src/app/models/administradores.model';

import { AuthService } from 'src/app/services/auth.service';
import { MostrarNavbarService } from 'src/app/services/mostrar-navbar.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  emailAdmin: Administradores[] = [];
  emailUsuario: string = '';
  mostrarBoton = false;

  constructor(
    private mostrarNavbarService: MostrarNavbarService,
    private authService: AuthService
  ) {
    this.mostrarNavbarService.setMostrarNavBar(true);
  }
  ngOnInit(): void {
    this.emailUsuario = this.authService.getEmailUsuario()!;
    this.authService
    .getAdministradores()
    .subscribe((email) => {
      this.emailAdmin = email;
      this.compruebaEmail();
      console.log(...this.emailAdmin);
      console.log(this.emailUsuario);
    });
  }

  compruebaEmail() {
    if (
      this.emailUsuario &&
      this.emailAdmin.filter((admin) => admin.email === this.emailUsuario)
        .length > 0
    ) {
      //incluso si no se encuentra ningún objeto que cumpla la condición en el filter, el resultado del filter será un array vacío, y ese array vacío se evaluará como true en el condicional del if.
      this.mostrarBoton = true;
    } else {
      this.mostrarBoton = false;
    }
  }

  cambiarValor() {
    this.mostrarNavbarService.setMostrarNavBar(false);
  }
}
