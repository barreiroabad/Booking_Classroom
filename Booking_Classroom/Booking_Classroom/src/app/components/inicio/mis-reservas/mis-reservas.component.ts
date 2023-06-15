import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Aula } from 'src/app/models/aula.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClasesService } from 'src/app/services/clases.service';
import { MostrarNavbarService } from 'src/app/services/mostrar-navbar.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css'],
})
export class MisReservasComponent implements OnInit {
  aulas: Aula[] = [];
  horas = Array.from(Array(24).keys());
  mostrarElemento = true;
  fechas: number[] = [];
  aulasFiltradas: Aula[] = [];
  columnas: string[] = ['aula', 'fecha', 'horaInicial', 'horaFinal', 'ordenadores', 'proyector','acciones'];

  constructor(
    private mostrarNavbarService: MostrarNavbarService,
    private clasesServices: ClasesService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.mostrarNavbarService.setMostrarNavBar(true);
  }

  ngOnInit() {
    this.clasesServices.getAulas().subscribe((aulas) => {
      this.aulas = aulas;
      this.verAulas();
    });
  }

  obtenerFechaLegible(fechaMilisegundos: any): string {
    const fecha = new Date(parseInt(fechaMilisegundos) * 1000);
    return fecha.toLocaleDateString();
  }

  verAulas() {
    this.mostrarElemento = true;
    console.log(this.aulasFiltradas);
    console.log(this.aulas);
    const email = this.authService.getEmailUsuario();

    // Realizar el filtrado de las aulas
    const aulasFiltradas = this.aulas.filter((aula) => {
      //retorna true si el aula cumple con las condiciones, false en caso contrario

      if (aula.reserva && aula.reserva.email !== email) {
        return false;
      }
      // Si el aula pasa todas las comprobaciones, se incluye en las aulas filtradas
      return true;
    });
    if (aulasFiltradas.length === 0) {
      this.mostrarElemento = false;
    }

    this.aulasFiltradas = aulasFiltradas;
    console.log(email);
  }

  cancelarReserva(aula: Aula) {
    this.clasesServices
      .deleteReserva(aula)
      .then(() => {
        this.snackBar.open('Reserva cancelada con éxito', '', {
          duration: 3000,
        });
        this.verAulas();
      })
      .catch((error) => console.log(error));
  }
}
