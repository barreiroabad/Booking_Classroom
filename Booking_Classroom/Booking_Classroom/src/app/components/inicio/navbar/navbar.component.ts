import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MostrarNavbarService } from 'src/app/services/mostrar-navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  mostrarNavBar: boolean = false;

  constructor(
    private mostrarNavbarService: MostrarNavbarService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.mostrarNavbarService
      .getMostrarNavBar()
      .subscribe((estado: boolean) => {
        this.mostrarNavBar = estado;
      });
  }

  salir() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/login']))
      .catch((error) => console.log(error));
  }
}
