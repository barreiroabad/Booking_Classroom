import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MostrarNavbarService } from 'src/app/services/mostrar-navbar.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
})
export class ConfiguracionComponent {
  form: FormGroup;
  hide = true;

  constructor(
    private mostrarNavbarService: MostrarNavbarService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.mostrarNavbarService.setMostrarNavBar(true);

    this.form = this.fb.group({
      actual: [null, Validators.required],
      nueva: [null, Validators.required],
      repetir: [null, Validators.required],
    });
  }

  getErrorMessage() {
    return 'Campo obligatorio';
  }

  aceptar() {
    console.log(this.form);
    this.router.navigate(['inicio']);
    // this.mostrarNavbarService.setMostrarNavBar(true);
  }

  cancelar() {
    this.router.navigate(['inicio']);
  }
}
