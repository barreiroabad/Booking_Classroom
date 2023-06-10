import { Component } from '@angular/core';
import { MostrarNavbarService } from 'src/app/services/mostrar-navbar.service';

@Component({
  selector: 'app-reservar-clase',
  templateUrl: './reservar-clase.component.html',
  styleUrls: ['./reservar-clase.component.css']
})
export class ReservarClaseComponent {
  constructor(private mostrarNavbarService: MostrarNavbarService) {
    this.mostrarNavbarService.setMostrarNavBar(true);
  }

}
