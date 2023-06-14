import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClasesService } from 'src/app/services/clases.service';
import { MostrarNavbarService } from 'src/app/services/mostrar-navbar.service';

@Component({
  selector: 'app-crear-clase',
  templateUrl: './crear-clase.component.html',
  styleUrls: ['./crear-clase.component.css'],
})
export class CrearClaseComponent {
  form: FormGroup;
  hide = true;
  horas = Array.from(Array(24).keys());

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mostrarNavbarService: MostrarNavbarService,
    private clasesServices: ClasesService
  ) {
    this.mostrarNavbarService.setMostrarNavBar(true);

    this.form = this.fb.group({
      aula: [null, Validators.required],
      aforo: [null, Validators.required],
      hora_inicial: [{ value: null }, Validators.required],
      hora_final: [{ value: null }, Validators.required],
      fecha: [null, Validators.required],
      ordenadores: ['No', Validators.required],
      // cantidadOrdenadores: [{ value: '', disabled: true }, Validators.required],
      proyector: ['No', Validators.required],
    });
  }



  ngOnInit() {
    // this.form.get('ordenadores')?.valueChanges.subscribe((value) => {
    //   if (value === 'Si') {
    //     this.form.get('cantidadOrdenadores')?.enable();
    //   } else {
    //     this.form.get('cantidadOrdenadores')?.disable();
    //   }
    // });
  }

  getErrorMessage() {
    return 'Campo obligatorio';
  }

  async onEntrar() {
    console.log(this.form.value);
    this.router.navigate(['inicio']);
    this.mostrarNavbarService.setMostrarNavBar(true);
    const response = await this.clasesServices.addAula(this.form.value);
    console.log(response);
  }

  onVolver() {
    this.mostrarNavbarService.setMostrarNavBar(true);
  }
}
