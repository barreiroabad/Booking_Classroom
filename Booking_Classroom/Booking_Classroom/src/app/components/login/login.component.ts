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
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mostrarNavbarService: MostrarNavbarService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit() {}

  getErrorMessage() {
    return 'Campo obligatorio';
  }

  onEntrar() {
    this.authService.login(this.form.value)
    .then(response => {
      console.log(response);
      this.mostrarNavbarService.setMostrarNavBar(true);
      this.router.navigate(['inicio']);
    })
    .catch((error) => {console.log(error);
      const snackBarRef = this.snackBar.open(
        'El usuario o la contraseña son incorrectos.'
      );
      setTimeout(() => {
        snackBarRef.dismiss();
      }, 4000);});


  }

  cambiarValor() {
    this.mostrarNavbarService.setMostrarNavBar(false);
  }


}
