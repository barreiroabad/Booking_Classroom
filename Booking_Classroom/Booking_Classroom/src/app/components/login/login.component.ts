import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MostrarNavbarService } from 'src/app/services/mostrar-navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  form2: FormGroup;
  hide = true;
  loading = false;
  recuperar = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mostrarNavbarService: MostrarNavbarService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [null, Validators.required],
    });

    this.form2 = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
  }

  ngOnInit() {}

  getErrorMessageRequired() {
    return 'Campo obligatorio';
  }
  getErrorMessageEmail() {
    return 'Email no válido';
  }

  onEntrar() {
    this.authService
      .login(this.form.value)
      .then((response) => {
        console.log(response);
        this.loading = true;
        setTimeout(() => {
          this.mostrarNavbarService.setMostrarNavBar(true);
          this.router.navigate(['inicio']);
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
        const snackBarRef = this.snackBar.open(
          'El usuario o la contraseña son incorrectos.'
        );
        setTimeout(() => {
          snackBarRef.dismiss();
        }, 4000);
      });
  }

  cambiarValor() {
    this.mostrarNavbarService.setMostrarNavBar(false);
  }

  activaRecuperar() {
    this.recuperar = true;
  }

  onRecuperar() {
    const email: string = this.form2.controls['email'].value;
    this.authService
      .recuperarContraseña(email)
      .then((response) => {
        console.log(response);
        this.form2.reset;
        this.recuperar = false;
        const snackBarRef = this.snackBar.open(
          'Se ha enviado una nueva contraseña a su correo electrónico.'
        );
        setTimeout(() => {
          snackBarRef.dismiss();
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
        this.recuperar = false;
        const snackBarRef = this.snackBar.open(
          'Ha ocurrido un error. Inténtelo de nuevo más tarde.'
        );
        setTimeout(() => {
          snackBarRef.dismiss();
        }, 4000);
      });
  }

  cancelar() {
    this.recuperar = false;
    this.form2.reset();
  }
}
