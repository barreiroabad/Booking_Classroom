import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Aula } from 'src/app/models/aula.model';
import { ClasesService } from 'src/app/services/clases.service';
import { MostrarNavbarService } from 'src/app/services/mostrar-navbar.service';

@Component({
  selector: 'app-crear-clase',
  templateUrl: './crear-clase.component.html',
  styleUrls: ['./crear-clase.component.css'],
})
export class CrearClaseComponent {
  aulas: Aula[] = [];
  isUpdating: boolean = false;
  form: FormGroup;
  hide = true;
  horas = Array.from(Array(24).keys());
  dias: any[] = [
    { en: 1, es: 'Lunes' },
    { en: 2, es: 'Martes' },
    { en: 3, es: 'Miércoles' },
    { en: 4, es: 'Jueves' },
    { en: 5, es: 'Viernes' },
    { en: 6, es: 'Sábado' },
    { en: 0, es: 'Domingo' },
  ];
  columnas: string[] = [
    'aula',
    'dia',
    'aforo',
    'horaInicial',
    'horaFinal',
    'ordenadores',
    'proyector',
    'acciones',
  ];
  @ViewChild('paginator', { static: true })
  paginator!: MatPaginator;
  dataSource: any;
  formValue: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mostrarNavbarService: MostrarNavbarService,
    private clasesServices: ClasesService,
    private snackBar: MatSnackBar
  ) {
    this.mostrarNavbarService.setMostrarNavBar(true);

    this.form = this.fb.group({
      aula: [null, [Validators.required, Validators.pattern('[A-Z][0-9]{2}')]],
      aforo: [null, Validators.required],
      hora_inicial: [null, Validators.required],
      hora_final: [null, [Validators.required, this.validateHoraFinal]],
      dia: [null, Validators.required],
      ordenadores: [null, Validators.required],
      proyector: [null, Validators.required],
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

  ngOnInit() {
    this.cargarClases();
  }

  ngAfterViewInit() {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  cargarClases() {
    this.clasesServices.getAulas().subscribe((aulas) => {
      this.aulas = aulas;
      this.aulas.sort((a, b) => {
        const nombreA = a.aula.toUpperCase();
        const nombreB = b.aula.toUpperCase();
        const numeroA = parseInt(a.aula.substring(1));
        const numeroB = parseInt(b.aula.substring(1));

        if (nombreA < nombreB) {
          return -1;
        } else if (nombreA > nombreB) {
          return 1;
        } else {
          return numeroA - numeroB;
        }
      });
      this.dataSource = new MatTableDataSource<Aula>(this.aulas);
      if (this.dataSource && this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  getErrorMessage() {
    return 'Campo obligatorio';
  }

  onCrear() {
    this.mostrarNavbarService.setMostrarNavBar(true);
    //const response = await this.clasesServices.addAula(this.form.value);

    // Crear objeto aula con los valores del formulario
  const aula: Aula = {
    id: '', // Asignar un valor adecuado si es necesario
    aula: this.form.get('aula')?.value,
    aforo: parseInt(this.form.get('aforo')?.value),
    hora_inicial: parseInt(this.form.get('hora_inicial')?.value),
    hora_final: parseInt(this.form.get('hora_final')?.value),
    dia: parseInt(this.form.get('dia')?.value),
    ordenadores: this.form.get('ordenadores')?.value,
    proyector: this.form.get('proyector')?.value,
    reserva: {
      reservada: false, // Valor predeterminado o según tus necesidades
      email: '', // Valor predeterminado o según tus necesidades
      fecha: { seconds: 0, miliseconds: 0 } // Valor predeterminado o según tus necesidades
    }
  };

    // Guardar el valor del formulario antes de restablecerlo
    this.formValue = this.form.value;
    this.form.reset();


    this.clasesServices
      .addAula(aula)
      .then(() => {
        this.snackBar.open('Clase creada', '', {
          duration: 3000,
        });
        this.cargarClases();
      })
      .catch((error) => {
        console.log(error);
        this.snackBar.open('No fue posible crear la clase', '', {
          duration: 3000,
        });
      });


  }

  onVolver() {
    this.mostrarNavbarService.setMostrarNavBar(true);
  }

  borrarClase(aula: Aula) {
    if (confirm('¿Estás seguro de que deseas reservar esta clase?')) {
      this.clasesServices
        .deleteAula(aula)
        .then(() => {
          this.snackBar.open('Clase borrada', '', {
            duration: 3000,
          });
          this.cargarClases();
        })
        .catch((error) => console.log(error));
    } else {
      return;
    }
  }

  obtenerNombreDia(numeroDia: number): string {
    const nombresDias = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    return nombresDias[numeroDia];
  }
}
