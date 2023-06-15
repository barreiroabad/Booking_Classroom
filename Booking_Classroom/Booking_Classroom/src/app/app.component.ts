import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Booking_Classroom';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getEstadoConexion().subscribe((user) => {
      if (!user) {
        // El usuario no está autenticado, redirigir a la página de inicio de sesión
        this.router.navigate(['/login']);
      }
    });
}



}
