import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MostrarNavbarService } from 'src/app/services/mostrar-navbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent {
  form: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mostrarNavbarService: MostrarNavbarService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre: [null, Validators.required],
      apellidos: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit() {}

  getErrorMessage() {
    return 'Campo obligatorio';
  }

  onEntrar() {
    this.authService
      .registro(this.form.value)
      .then((response) => {
        console.log(response);
        this.router.navigate(['login']);
        this.mostrarNavbarService.setMostrarNavBar(true);
        const snackBarRef = this.snackBar.open('Usuario registrado con éxito.');
        setTimeout(() => {
          snackBarRef.dismiss();
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
        const snackBarRef = this.snackBar.open(
          'Ha habido un error en el registro.'
        );
        setTimeout(() => {
          snackBarRef.dismiss();
        }, 4000);
      });
  }

  onVolver() {
    this.mostrarNavbarService.setMostrarNavBar(true);
  }
}
