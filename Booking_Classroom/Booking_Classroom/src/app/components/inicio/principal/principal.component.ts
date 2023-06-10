import { Component } from '@angular/core';
import { MostrarNavbarService } from 'src/app/services/mostrar-navbar.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  constructor(private mostrarNavbarService: MostrarNavbarService) {
      this.mostrarNavbarService.setMostrarNavBar(true);

  }

  cambiarValor() {
    this.mostrarNavbarService.setMostrarNavBar(false);
  }

}
