import { Component } from '@angular/core';
import { MostrarNavbarService } from 'src/app/services/mostrar-navbar.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent {
  constructor(private mostrarNavbarService: MostrarNavbarService) {
    this.mostrarNavbarService.setMostrarNavBar(true);
  }

}
