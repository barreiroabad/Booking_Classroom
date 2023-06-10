import { Component } from '@angular/core';
import { MostrarNavbarService } from 'src/app/services/mostrar-navbar.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  constructor(private mostrarNavbarService: MostrarNavbarService) {
    this.mostrarNavbarService.setMostrarNavBar(true);
  }

}
