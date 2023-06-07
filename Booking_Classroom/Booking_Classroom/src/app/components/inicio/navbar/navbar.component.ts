import { Component, OnInit } from '@angular/core';
import { MostrarNavbarService } from 'src/app/services/mostrar-navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  mostrarNavBar : boolean =true;

  constructor(private mostrarNavbarService: MostrarNavbarService) {}

  ngOnInit() {
    this.mostrarNavbarService.getMostrarNavBar().subscribe((valor) => {
      this.mostrarNavBar = valor;
    });
  }
}
