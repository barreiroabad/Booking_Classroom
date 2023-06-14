import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.mostrarNavbarService.setMostrarNavBar(true);

    this.form = this.fb.group({
      nueva: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          this.matchValidator('repetir', true),
        ],
      ],
      repetir: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          this.matchValidator('nueva'),
        ],
      ],
    });
  }

  matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent &&
        !!control.parent.value &&
        control.value === (control.parent?.controls as any)[matchTo].value
        ? null
        : { matching: true };
    };
  }

  getErrorMessage() {
    return 'Campo obligatorio';
  }

  aceptar() {
    const user = this.authService.getUsuario();
    if (user !== null) {
      this.authService
        .cambiarContraseña(user, this.form.controls['nueva'].value)
        .then((response) => {
          console.log(response);
          const snackBarRef = this.snackBar.open(
            'Contraseña cambiada con éxito.'
          );
          setTimeout(() => {
            snackBarRef.dismiss();
          }, 4000);
          this.router.navigate(['inicio']);
          // this.mostrarNavbarService.setMostrarNavBar(true);
        })
        .catch((error) => {
          console.log(error);
          const snackBarRef = this.snackBar.open(
            'No ha sido posible cambiar la contraseña.'
          );
          setTimeout(() => {
            snackBarRef.dismiss();
          }, 4000);
        });
    }
  }

  cancelar() {
    this.router.navigate(['inicio']);
  }
}
