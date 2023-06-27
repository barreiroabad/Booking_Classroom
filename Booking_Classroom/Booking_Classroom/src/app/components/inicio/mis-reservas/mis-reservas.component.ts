import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reservas } from 'src/app/models/reservas.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClasesService } from 'src/app/services/clases.service';
import { MostrarNavbarService } from 'src/app/services/mostrar-navbar.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css'],
})
export class MisReservasComponent implements OnInit {
  reservas: Reservas[] = [];
  horas = Array.from(Array(24).keys());
  mostrarElemento = true;
  fechas: number[] = [];
  reservasFiltradas: Reservas[] = [];
  columnas: string[] = [
    'aula',
    'fecha',
    'horaInicial',
    'horaFinal',
    'ordenadores',
    'proyector',
    'acciones',
  ];

  constructor(
    private mostrarNavbarService: MostrarNavbarService,
    private clasesServices: ClasesService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    this.mostrarNavbarService.setMostrarNavBar(true);

  }

  ngOnInit() {
    this.clasesServices.getReservas().subscribe((reservas) => {
      this.reservas = reservas;
      this.limpiarReservas();
      this.verAulas();
      //console.log(this.reservas);
    });
  }

  obtenerFechaLegible(fechaSegundos: any): string {
    const fecha = new Date(parseInt(fechaSegundos));
    return fecha.toLocaleDateString();
  }

  verAulas() {
    this.mostrarElemento = true;

    // Realizar el filtrado de las aulas retorna true si el aula cumple con las condiciones, false en caso contrario
    const reservasFiltradas = this.reservas.filter((reserva) => {
      const emailUsuario = this.authService.getEmailUsuario();
      if (
        reserva.email !== emailUsuario
        //|| fechaDeReserva < fechaActualSinHora
      ) {
        return false;
      }
      return true;
    });
    if (reservasFiltradas.length === 0) {
      this.mostrarElemento = false;
    }

    this.reservasFiltradas = reservasFiltradas;
  }

  cancelarReserva(reserva: Reservas) {
    if (confirm('¿Estás seguro de que deseas reservar esta aula?')) {
      this.clasesServices
        .deleteReserva(reserva)
        .then(() => {
          this.snackBar.open('Reserva cancelada con éxito', '', {
            duration: 3000,
          });
          this.verAulas();
        })
        .catch((error) => console.log(error));
    } else {
      return;
    }
  }

  limpiarReservas() {
    const fechaActual = new Date();
    // Obtener valores individuales de día, mes y año
    const diaActual = fechaActual.getDate();
    const mesActual = fechaActual.getMonth();
    const anioActual = fechaActual.getFullYear();
    const fechaActualSinHora = new Date(anioActual, mesActual, diaActual);
    for (let i = 0; i < this.reservas.length; i++) {
      const reserva = this.reservas[i];
      const fechaDeReserva = new Date(reserva.fecha);

      if (fechaDeReserva < fechaActualSinHora) {
        this.clasesServices.deleteReserva(reserva);
      }
    }
  }
}
