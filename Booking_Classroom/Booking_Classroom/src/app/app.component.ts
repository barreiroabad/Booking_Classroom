import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Booking_Classroom';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Verificar el estado de autenticación inicialmente
    this.checkAuthState();

    // Escuchar los cambios en el estado de autenticación en tiempo real
    this.authService.getEstadoConexion().subscribe(user => {
      if (!user) {
        // El usuario no está autenticado, redirigir a la página de inicio de sesión
        //this.router.navigate(['/login']);
      }
    });
  }

  private checkAuthState() {
    // Verificar el estado de autenticación inicialmente
    const user = this.authService.getUsuario();
    if (!user) {
      // El usuario no está autenticado, redirigir a la página de inicio de sesión
     // this.router.navigate(['/login']);
    }
  }
}

