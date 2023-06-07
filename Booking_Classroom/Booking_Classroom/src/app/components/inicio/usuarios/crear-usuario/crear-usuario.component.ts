import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {
  form: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private router: Router) {
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
    console.log(this.form);
    this.router.navigate(['inicio']);
  }
}
