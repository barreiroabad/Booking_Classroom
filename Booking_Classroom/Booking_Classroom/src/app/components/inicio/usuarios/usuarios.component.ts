import { Component } from '@angular/core';
import { MostrarNavbarService } from 'src/app/services/mostrar-navbar.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  constructor(private mostrarNavbarService: MostrarNavbarService) {
    this.mostrarNavbarService.setMostrarNavBar(true);
  }

}
