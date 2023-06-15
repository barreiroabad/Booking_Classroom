import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Aula } from 'src/app/models/aula.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClasesService } from 'src/app/services/clases.service';
import { MostrarNavbarService } from 'src/app/services/mostrar-navbar.service';

@Component({
  selector: 'app-reservar-clase',
  templateUrl: './reservar-clase.component.html',
  styleUrls: ['./reservar-clase.component.css'],
})
export class ReservarClaseComponent implements OnInit {
  form: FormGroup;
  aulas: Aula[] = [];
  horas = Array.from(Array(24).keys());
  mostrarElemento = true;
  fechas: number[] = [];
  aulasFiltradas: Aula[] = [];
  isUpdating: boolean = false;

  constructor(
    private mostrarNavbarService: MostrarNavbarService,
    private fb: FormBuilder,
    private clasesServices: ClasesService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.mostrarNavbarService.setMostrarNavBar(true);

    this.clasesServices.getAulas().subscribe((aulas) => (this.aulas = aulas));

    this.form = this.fb.group({
      aforo: [null],
      hora_inicial: [null, Validators.required],
      hora_final: [null, [Validators.required, this.validateHoraFinal]],
      fecha: [0, Validators.required],
      ordenadores: ['No'],
      // cantidadOrdenadores: [{ value: '', disabled: true }, Validators.required],
      proyector: ['No'],
    });

    // Suscribirse a los cambios de los campos hora_inicial y hora_final
    this.form.get('hora_inicial')?.valueChanges.subscribe(() => {
      if (!this.isUpdating) {
        this.isUpdating = true;
        this.form.controls['hora_final'].updateValueAndValidity();
        this.isUpdating = false;
      }
    });

    this.form.get('hora_final')?.valueChanges.subscribe(() => {
      if (!this.isUpdating) {
        this.isUpdating = true;
        this.form.controls['hora_inicial'].updateValueAndValidity();
        this.isUpdating = false;
      }
    });
  }

  validateHoraFinal(control: FormControl) {
    if (control.parent) {
      const horaInicialControl = +control.parent.get('hora_inicial')?.value;
      if (horaInicialControl) {
        const horaInicial = horaInicialControl;
        const horaFinal = +control.value;

        if (horaFinal <= horaInicial) {
          return { horaFinalMenor: true };
        }
      }
    }
    return null;
  }

  ngOnInit() {}

  getErrorMessage() {
    return 'Campo obligatorio';
  }

  obtenerFechaLegible(fechaMilisegundos: any): string {
    const fecha = new Date(parseInt(fechaMilisegundos) * 1000);
    return fecha.toLocaleDateString();
  }

  verAulas() {
    this.mostrarElemento = false;
    console.log(this.aulasFiltradas);
    console.log(this.aulas);

    // Obtener los valores del formulario
    const filtro = this.form.value;

    // Realizar el filtrado de las aulas
    const aulasFiltradas = this.aulas.filter((aula) => {
      //retorna true si el aula cumple con las condiciones, false en caso contrario

      if (
        filtro.fecha &&
        aula.fecha.seconds !== filtro.fecha.getTime() / 1000
      ) {
        return false;
      }

      if (filtro.hora_inicial && aula.hora_inicial < filtro.hora_inicial) {
        return false;
      }

      if (filtro.hora_final && aula.hora_final > filtro.hora_final) {
        return false;
      }

      if (filtro.aforo && aula.aforo < filtro.aforo) {
        return false;
      }

      if (
        filtro.ordenadores &&
        filtro.ordenadores === 'Si' &&
        aula.ordenadores !== filtro.ordenadores
      ) {
        return false;
      }

      if (aula.reserva && aula.reserva.reservada === true) {
        return false;
      }

      if (
        filtro.proyector &&
        filtro.proyector === 'Si' &&
        aula.proyector !== filtro.proyector
      ) {
        return false;
      }

      // Si el aula pasa todas las comprobaciones, se incluye en las aulas filtradas
      return true;
    });
    if (aulasFiltradas.length === 0) {
      this.mostrarElemento = true;
      this.snackBar.open(
        'No hay ningún aula disponible para la fecha indicada',
        '',
        {
          duration: 3000,
        }
      );
    }

    // Hacer algo con las aulas filtradas (por ejemplo, asignarlas a una propiedad del componente)
    this.aulasFiltradas = aulasFiltradas;
    console.log(filtro);
  }

  reservar(aula: Aula) {
    const email = this.authService.getEmailUsuario();
    console.log(email);
    this.clasesServices
      .addReserva(aula)
      .then((response) => {
        this.snackBar.open('Aula reservada con éxito', '', {
          duration: 3000,
        });
        this.router.navigate(['inicio/principal']);
      })
      .catch((error) => console.log(error));
  }
}
